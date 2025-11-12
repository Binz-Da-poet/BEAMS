import { Injectable, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async login(username: string, password: string) {
    // Find user by username
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Update last login time
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = this.createJwtPayload(user.id, user.role, user.storeId ?? undefined);
    const { accessToken, refreshToken, expiresIn } = this.issueTokens(payload);

    // Return user data (exclude password)
    const { password: _, ...userWithoutPassword } = user;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      user: userWithoutPassword,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: number }>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? 'dev_jwt_secret',
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          store: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      if (!user || !user.isActive) {
        return null;
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch {
      return null;
    }
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: number; role: string; storeId?: number }>(refreshToken, {
        secret: this.getRefreshTokenSecret(),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          store: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.isActive) {
        throw new ForbiddenException('User account is inactive');
      }

      const userPayload = this.createJwtPayload(user.id, user.role, user.storeId ?? undefined);
      const { accessToken, refreshToken: newRefreshToken, expiresIn } = this.issueTokens(userPayload);

      const { password: _, ...userWithoutPassword } = user;

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private createJwtPayload(userId: number, role: string, storeId?: number) {
    return {
      sub: userId,
      role,
      storeId,
    };
  }

  private issueTokens(payload: { sub: number; role: string; storeId?: number }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? 'dev_jwt_secret',
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION') ?? '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.getRefreshTokenSecret(),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION') ?? '7d',
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.parseExpiryToSeconds(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION') ?? '15m'),
    };
  }

  private getRefreshTokenSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') ?? 'dev_refresh_secret';
  }

  private parseExpiryToSeconds(expiry: string): number {
    const numeric = Number(expiry);
    if (!Number.isNaN(numeric)) {
      return numeric;
    }

    const match = /^(\d+)([smhd])$/i.exec(expiry.trim());
    if (!match) {
      // Default to 15 minutes if format is unknown
      return 15 * 60;
    }

    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 60 * 60 * 24;
      default:
        return 15 * 60;
    }
  }
}

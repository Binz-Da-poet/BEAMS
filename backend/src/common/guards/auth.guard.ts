import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../resources/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('認証トークンが必要です');
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      throw new UnauthorizedException('トークンが無効です');
    }

    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new UnauthorizedException('認証に失敗しました');
    }

    request.user = user;
    return true;
  }
}

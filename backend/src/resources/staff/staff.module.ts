import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}


import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}


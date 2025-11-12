import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MCodeService } from './m-code.service';
import { MCodeController } from './m-code.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MCodeController],
  providers: [MCodeService],
  exports: [MCodeService],
})
export class MCodeModule {}


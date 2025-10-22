import { Module } from '@nestjs/common';
import { BodyLiningMasterService } from './body-lining-master.service';
import { BodyLiningMasterController } from './body-lining-master.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BodyLiningMasterController],
  providers: [BodyLiningMasterService],
  exports: [BodyLiningMasterService],
})
export class BodyLiningMasterModule {}

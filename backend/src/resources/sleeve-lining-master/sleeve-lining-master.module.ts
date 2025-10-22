import { Module } from '@nestjs/common';
import { SleeveLiningMasterService } from './sleeve-lining-master.service';
import { SleeveLiningMasterController } from './sleeve-lining-master.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SleeveLiningMasterController],
  providers: [SleeveLiningMasterService],
  exports: [SleeveLiningMasterService],
})
export class SleeveLiningMasterModule {}

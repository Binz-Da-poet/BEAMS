import { Module } from '@nestjs/common';
import { OptionMasterService } from './option-master.service';
import { OptionMasterController } from './option-master.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OptionMasterController],
  providers: [OptionMasterService],
  exports: [OptionMasterService],
})
export class OptionMasterModule {}

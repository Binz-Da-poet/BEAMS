import { Module } from '@nestjs/common';
import { HeavyFabricButtonMasterService } from './heavy-fabric-button-master.service';
import { HeavyFabricButtonMasterController } from './heavy-fabric-button-master.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HeavyFabricButtonMasterController],
  providers: [HeavyFabricButtonMasterService],
  exports: [HeavyFabricButtonMasterService],
})
export class HeavyFabricButtonMasterModule {}

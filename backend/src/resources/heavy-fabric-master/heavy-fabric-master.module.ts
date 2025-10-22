import { Module } from '@nestjs/common';
import { HeavyFabricMasterService } from './heavy-fabric-master.service';
import { HeavyFabricMasterController } from './heavy-fabric-master.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HeavyFabricMasterController],
  providers: [HeavyFabricMasterService],
  exports: [HeavyFabricMasterService],
})
export class HeavyFabricMasterModule {}

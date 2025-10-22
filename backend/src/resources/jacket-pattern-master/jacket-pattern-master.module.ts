import { Module } from '@nestjs/common';
import { JacketPatternMasterService } from './jacket-pattern-master.service';
import { JacketPatternMasterController } from './jacket-pattern-master.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JacketPatternMasterController],
  providers: [JacketPatternMasterService],
  exports: [JacketPatternMasterService],
})
export class JacketPatternMasterModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JacketPatternMasterModule } from '../jacket-pattern-master/jacket-pattern-master.module';

@Module({
  imports: [PrismaModule, JacketPatternMasterModule],
  exports: [JacketPatternMasterModule],
})
export class PatternMastersModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PatternMastersService } from './pattern-masters.service';
import { PatternMastersController } from './pattern-masters.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PatternMastersController],
  providers: [PatternMastersService],
  exports: [PatternMastersService],
})
export class PatternMastersModule {}

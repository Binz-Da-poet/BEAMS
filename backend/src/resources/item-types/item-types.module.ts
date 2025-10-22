import { Module } from '@nestjs/common';
import { ItemTypesController } from './item-types.controller';
import { ItemTypesService } from './item-types.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItemTypesController],
  providers: [ItemTypesService],
  exports: [ItemTypesService],
})
export class ItemTypesModule {}

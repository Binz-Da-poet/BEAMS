import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemTypesService } from './item-types.service';
import { ItemType } from '@prisma/client';

@ApiTags('Item Types')
@Controller('item-types')
export class ItemTypesController {
  constructor(private readonly itemTypesService: ItemTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all item types' })
  @ApiResponse({ status: 200, description: 'List of all item types' })
  async findAll(): Promise<ItemType[]> {
    return this.itemTypesService.findAll();
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma, Store } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { StoresService } from './stores.service';

@ApiTags('Stores')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiOperation({ summary: 'Create store' })
  @ApiResponse({ status: 201, description: 'Store created successfully.' })
  create(@Body() createStoreDto: Prisma.StoreCreateInput): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get stores' })
  @ApiResponse({ status: 200, description: 'List of stores.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.storesService.search(search);
    }

    const params: { skip?: number; take?: number } = {};
    if (skip) params.skip = parseInt(skip, 10);
    if (take) params.take = parseInt(take, 10);
    return this.storesService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store by ID' })
  @ApiResponse({ status: 200, description: 'Store found.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update store' })
  @ApiResponse({ status: 200, description: 'Store updated successfully.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStoreDto: Prisma.StoreUpdateInput) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete store' })
  @ApiResponse({ status: 200, description: 'Store deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.remove(id);
  }
}


import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SleeveLiningMasterService } from './sleeve-lining-master.service';
import { SleeveLiningMaster, Prisma } from '@prisma/client';

@ApiTags('Sleeve Lining Master')
@Controller('sleeve-lining-master')
export class SleeveLiningMasterController {
  constructor(private readonly sleeveLiningMasterService: SleeveLiningMasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create sleeve lining master' })
  @ApiResponse({ status: 201, description: 'Sleeve lining master created successfully.' })
  create(@Body() createSleeveLiningMasterDto: Prisma.SleeveLiningMasterCreateInput) {
    return this.sleeveLiningMasterService.create(createSleeveLiningMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sleeve lining masters' })
  @ApiResponse({ status: 200, description: 'List of sleeve lining masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string, @Query('stockFlag') stockFlag?: string) {
    if (search) {
      return this.sleeveLiningMasterService.search(search);
    }

    if (stockFlag !== undefined) {
      return this.sleeveLiningMasterService.findByStockFlag(stockFlag === 'true');
    }

    const params: any = {};
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);

    return this.sleeveLiningMasterService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search sleeve lining masters' })
  @ApiResponse({ status: 200, description: 'Search results for sleeve lining masters.' })
  search(@Query('q') query: string) {
    return this.sleeveLiningMasterService.search(query);
  }

  @Get('stock/:stockFlag')
  @ApiOperation({ summary: 'Get sleeve lining masters by stock flag' })
  @ApiResponse({ status: 200, description: 'Sleeve lining masters found.' })
  findByStockFlag(@Param('stockFlag', ParseBoolPipe) stockFlag: boolean) {
    return this.sleeveLiningMasterService.findByStockFlag(stockFlag);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sleeve lining master by ID' })
  @ApiResponse({ status: 200, description: 'Sleeve lining master found.' })
  @ApiResponse({ status: 404, description: 'Sleeve lining master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sleeveLiningMasterService.findOne(id);
  }

  @Get('product-no/:productNo')
  @ApiOperation({ summary: 'Get sleeve lining master by product number' })
  @ApiResponse({ status: 200, description: 'Sleeve lining master found.' })
  @ApiResponse({ status: 404, description: 'Sleeve lining master not found.' })
  findByProductNo(@Param('productNo') productNo: string) {
    return this.sleeveLiningMasterService.findByProductNo(productNo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sleeve lining master' })
  @ApiResponse({ status: 200, description: 'Sleeve lining master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Sleeve lining master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSleeveLiningMasterDto: Prisma.SleeveLiningMasterUpdateInput) {
    return this.sleeveLiningMasterService.update(id, updateSleeveLiningMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sleeve lining master' })
  @ApiResponse({ status: 200, description: 'Sleeve lining master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Sleeve lining master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sleeveLiningMasterService.remove(id);
  }
}

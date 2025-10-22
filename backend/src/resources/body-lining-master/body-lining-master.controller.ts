import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BodyLiningMasterService } from './body-lining-master.service';
import { BodyLiningMaster, Prisma } from '@prisma/client';

@ApiTags('Body Lining Master')
@Controller('body-lining-master')
export class BodyLiningMasterController {
  constructor(private readonly bodyLiningMasterService: BodyLiningMasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create body lining master' })
  @ApiResponse({ status: 201, description: 'Body lining master created successfully.' })
  create(@Body() createBodyLiningMasterDto: Prisma.BodyLiningMasterCreateInput) {
    return this.bodyLiningMasterService.create(createBodyLiningMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all body lining masters' })
  @ApiResponse({ status: 200, description: 'List of body lining masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string, @Query('stockFlag') stockFlag?: string) {
    if (search) {
      return this.bodyLiningMasterService.search(search);
    }

    if (stockFlag !== undefined) {
      return this.bodyLiningMasterService.findByStockFlag(stockFlag === 'true');
    }

    const params: any = {};
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);

    return this.bodyLiningMasterService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search body lining masters' })
  @ApiResponse({ status: 200, description: 'Search results for body lining masters.' })
  search(@Query('q') query: string) {
    return this.bodyLiningMasterService.search(query);
  }

  @Get('stock/:stockFlag')
  @ApiOperation({ summary: 'Get body lining masters by stock flag' })
  @ApiResponse({ status: 200, description: 'Body lining masters found.' })
  findByStockFlag(@Param('stockFlag', ParseBoolPipe) stockFlag: boolean) {
    return this.bodyLiningMasterService.findByStockFlag(stockFlag);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get body lining master by ID' })
  @ApiResponse({ status: 200, description: 'Body lining master found.' })
  @ApiResponse({ status: 404, description: 'Body lining master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bodyLiningMasterService.findOne(id);
  }

  @Get('product-no/:productNo')
  @ApiOperation({ summary: 'Get body lining master by product number' })
  @ApiResponse({ status: 200, description: 'Body lining master found.' })
  @ApiResponse({ status: 404, description: 'Body lining master not found.' })
  findByProductNo(@Param('productNo') productNo: string) {
    return this.bodyLiningMasterService.findByProductNo(productNo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update body lining master' })
  @ApiResponse({ status: 200, description: 'Body lining master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Body lining master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBodyLiningMasterDto: Prisma.BodyLiningMasterUpdateInput) {
    return this.bodyLiningMasterService.update(id, updateBodyLiningMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete body lining master' })
  @ApiResponse({ status: 200, description: 'Body lining master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Body lining master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bodyLiningMasterService.remove(id);
  }
}

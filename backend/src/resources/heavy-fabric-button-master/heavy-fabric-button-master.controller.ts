import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeavyFabricButtonMasterService } from './heavy-fabric-button-master.service';
import { HeavyFabricButtonMaster, Prisma } from '@prisma/client';

@ApiTags('Heavy Fabric Button Master')
@Controller('heavy-fabric-button-master')
export class HeavyFabricButtonMasterController {
  constructor(private readonly heavyFabricButtonMasterService: HeavyFabricButtonMasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create heavy fabric button master' })
  @ApiResponse({ status: 201, description: 'Heavy fabric button master created successfully.' })
  create(@Body() createHeavyFabricButtonMasterDto: Prisma.HeavyFabricButtonMasterCreateInput) {
    return this.heavyFabricButtonMasterService.create(createHeavyFabricButtonMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all heavy fabric button masters' })
  @ApiResponse({ status: 200, description: 'List of heavy fabric button masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.heavyFabricButtonMasterService.search(search);
    }

    const params: any = {};
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);

    return this.heavyFabricButtonMasterService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search heavy fabric button masters' })
  @ApiResponse({ status: 200, description: 'Search results for heavy fabric button masters.' })
  search(@Query('q') query: string) {
    return this.heavyFabricButtonMasterService.search(query);
  }

  @Get('product-no/:productNo')
  @ApiOperation({ summary: 'Get heavy fabric button masters by product number' })
  @ApiResponse({ status: 200, description: 'Heavy fabric button masters found.' })
  findByProductNo(@Param('productNo') productNo: string) {
    return this.heavyFabricButtonMasterService.findByProductNo(productNo);
  }

  @Get('product-no/:productNo/color/:colorNo')
  @ApiOperation({ summary: 'Get heavy fabric button master by product number and color' })
  @ApiResponse({ status: 200, description: 'Heavy fabric button master found.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric button master not found.' })
  findByProductNoAndColor(@Param('productNo') productNo: string, @Param('colorNo') colorNo: string) {
    return this.heavyFabricButtonMasterService.findByProductNoAndColor(productNo, colorNo);
  }

  @Get('cost-range')
  @ApiOperation({ summary: 'Get heavy fabric button masters by cost range' })
  @ApiResponse({ status: 200, description: 'Heavy fabric button masters found.' })
  findByCostRange(@Query('minCost') minCost: string, @Query('maxCost') maxCost: string) {
    return this.heavyFabricButtonMasterService.findByCostRange(parseFloat(minCost), parseFloat(maxCost));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get heavy fabric button master by ID' })
  @ApiResponse({ status: 200, description: 'Heavy fabric button master found.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric button master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.heavyFabricButtonMasterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update heavy fabric button master' })
  @ApiResponse({ status: 200, description: 'Heavy fabric button master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric button master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateHeavyFabricButtonMasterDto: Prisma.HeavyFabricButtonMasterUpdateInput) {
    return this.heavyFabricButtonMasterService.update(id, updateHeavyFabricButtonMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete heavy fabric button master' })
  @ApiResponse({ status: 200, description: 'Heavy fabric button master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric button master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.heavyFabricButtonMasterService.remove(id);
  }
}

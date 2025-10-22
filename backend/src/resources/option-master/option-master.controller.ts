import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OptionMasterService } from './option-master.service';
import { OptionMaster, Prisma } from '@prisma/client';

@ApiTags('Option Master')
@Controller('option-master')
export class OptionMasterController {
  constructor(private readonly optionMasterService: OptionMasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create option master' })
  @ApiResponse({ status: 201, description: 'Option master created successfully.' })
  create(@Body() createOptionMasterDto: Prisma.OptionMasterCreateInput) {
    return this.optionMasterService.create(createOptionMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all option masters' })
  @ApiResponse({ status: 200, description: 'List of option masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.optionMasterService.search(search);
    }

    const params: any = {};
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);

    return this.optionMasterService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search option masters' })
  @ApiResponse({ status: 200, description: 'Search results for option masters.' })
  search(@Query('q') query: string) {
    return this.optionMasterService.search(query);
  }

  @Get('option-name/:optionName')
  @ApiOperation({ summary: 'Get option master by option name' })
  @ApiResponse({ status: 200, description: 'Option master found.' })
  @ApiResponse({ status: 404, description: 'Option master not found.' })
  findByOptionName(@Param('optionName') optionName: string) {
    return this.optionMasterService.findByOptionName(optionName);
  }

  @Get('cost-range')
  @ApiOperation({ summary: 'Get option masters by cost range' })
  @ApiResponse({ status: 200, description: 'Option masters found.' })
  findByCostRange(@Query('minCost') minCost: string, @Query('maxCost') maxCost: string) {
    return this.optionMasterService.findByCostRange(parseFloat(minCost), parseFloat(maxCost));
  }

  @Get('retail-price-range')
  @ApiOperation({ summary: 'Get option masters by retail price range' })
  @ApiResponse({ status: 200, description: 'Option masters found.' })
  findByRetailPriceRange(@Query('minPrice') minPrice: string, @Query('maxPrice') maxPrice: string) {
    return this.optionMasterService.findByRetailPriceRange(parseFloat(minPrice), parseFloat(maxPrice));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get option master by ID' })
  @ApiResponse({ status: 200, description: 'Option master found.' })
  @ApiResponse({ status: 404, description: 'Option master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.optionMasterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update option master' })
  @ApiResponse({ status: 200, description: 'Option master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Option master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOptionMasterDto: Prisma.OptionMasterUpdateInput) {
    return this.optionMasterService.update(id, updateOptionMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete option master' })
  @ApiResponse({ status: 200, description: 'Option master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Option master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.optionMasterService.remove(id);
  }
}

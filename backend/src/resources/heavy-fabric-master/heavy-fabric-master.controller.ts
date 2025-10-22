import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeavyFabricMasterService } from './heavy-fabric-master.service';
import { HeavyFabricMaster, Prisma } from '@prisma/client';

@ApiTags('Heavy Fabric Master')
@Controller('heavy-fabric-master')
export class HeavyFabricMasterController {
  constructor(private readonly heavyFabricMasterService: HeavyFabricMasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create heavy fabric master' })
  @ApiResponse({ status: 201, description: 'Heavy fabric master created successfully.' })
  create(@Body() createHeavyFabricMasterDto: Prisma.HeavyFabricMasterCreateInput) {
    return this.heavyFabricMasterService.create(createHeavyFabricMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all heavy fabric masters' })
  @ApiResponse({ status: 200, description: 'List of heavy fabric masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.heavyFabricMasterService.search(search);
    }

    const params: any = {};
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);

    return this.heavyFabricMasterService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search heavy fabric masters' })
  @ApiResponse({ status: 200, description: 'Search results for heavy fabric masters.' })
  search(@Query('q') query: string) {
    return this.heavyFabricMasterService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get heavy fabric master by ID' })
  @ApiResponse({ status: 200, description: 'Heavy fabric master found.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.heavyFabricMasterService.findOne(id);
  }

  @Get('fabric-no/:fabricNo')
  @ApiOperation({ summary: 'Get heavy fabric master by fabric number' })
  @ApiResponse({ status: 200, description: 'Heavy fabric master found.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric master not found.' })
  findByFabricNo(@Param('fabricNo') fabricNo: string) {
    return this.heavyFabricMasterService.findByFabricNo(fabricNo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update heavy fabric master' })
  @ApiResponse({ status: 200, description: 'Heavy fabric master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateHeavyFabricMasterDto: Prisma.HeavyFabricMasterUpdateInput) {
    return this.heavyFabricMasterService.update(id, updateHeavyFabricMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete heavy fabric master' })
  @ApiResponse({ status: 200, description: 'Heavy fabric master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Heavy fabric master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.heavyFabricMasterService.remove(id);
  }
}

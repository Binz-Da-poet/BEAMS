import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JacketPatternMasterService } from './jacket-pattern-master.service';
import { JacketPatternMaster, Prisma } from '@prisma/client';

@ApiTags('Jacket Pattern Master')
@Controller('jacket-pattern-master')
export class JacketPatternMasterController {
  constructor(private readonly jacketPatternMasterService: JacketPatternMasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create jacket pattern master' })
  @ApiResponse({ status: 201, description: 'Jacket pattern master created successfully.' })
  create(@Body() createJacketPatternMasterDto: Prisma.JacketPatternMasterCreateInput) {
    return this.jacketPatternMasterService.create(createJacketPatternMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jacket pattern masters' })
  @ApiResponse({ status: 200, description: 'List of jacket pattern masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.jacketPatternMasterService.search(search);
    }

    const params: any = {};
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);

    return this.jacketPatternMasterService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search jacket pattern masters' })
  @ApiResponse({ status: 200, description: 'Search results for jacket pattern masters.' })
  search(@Query('q') query: string) {
    return this.jacketPatternMasterService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get jacket pattern master by ID' })
  @ApiResponse({ status: 200, description: 'Jacket pattern master found.' })
  @ApiResponse({ status: 404, description: 'Jacket pattern master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jacketPatternMasterService.findOne(id);
  }

  @Get('pattern-no/:patternNo')
  @ApiOperation({ summary: 'Get jacket pattern master by pattern number' })
  @ApiResponse({ status: 200, description: 'Jacket pattern master found.' })
  @ApiResponse({ status: 404, description: 'Jacket pattern master not found.' })
  findByPatternNo(@Param('patternNo') patternNo: string) {
    return this.jacketPatternMasterService.findByPatternNo(patternNo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update jacket pattern master' })
  @ApiResponse({ status: 200, description: 'Jacket pattern master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Jacket pattern master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJacketPatternMasterDto: Prisma.JacketPatternMasterUpdateInput) {
    return this.jacketPatternMasterService.update(id, updateJacketPatternMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete jacket pattern master' })
  @ApiResponse({ status: 200, description: 'Jacket pattern master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Jacket pattern master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jacketPatternMasterService.remove(id);
  }
}

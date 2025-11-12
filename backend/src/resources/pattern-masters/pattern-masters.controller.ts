import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatternMastersService } from './pattern-masters.service';
import { PatternMaster, Prisma } from '@prisma/client';

@ApiTags('Pattern Masters')
@Controller('pattern-masters')
export class PatternMastersController {
  constructor(private readonly patternMastersService: PatternMastersService) {}

  @Post()
  @ApiOperation({ summary: 'Create pattern master' })
  @ApiResponse({ status: 201, description: 'Pattern master created successfully.' })
  create(@Body() createPatternMasterDto: Prisma.PatternMasterCreateInput) {
    return this.patternMastersService.create(createPatternMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pattern masters' })
  @ApiResponse({ status: 200, description: 'List of pattern masters.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.patternMastersService.search(search);
    }

    const params: { skip?: number; take?: number } = {};
    if (skip) params.skip = parseInt(skip, 10);
    if (take) params.take = parseInt(take, 10);
    return this.patternMastersService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search pattern masters' })
  @ApiResponse({ status: 200, description: 'Search results for pattern masters.' })
  search(@Query('q') query: string) {
    return this.patternMastersService.search(query);
  }

  @Get('pattern-no/:patternNo')
  @ApiOperation({ summary: 'Get pattern master by pattern number' })
  @ApiResponse({ status: 200, description: 'Pattern master found.' })
  @ApiResponse({ status: 404, description: 'Pattern master not found.' })
  findByPatternNo(@Param('patternNo') patternNo: string) {
    return this.patternMastersService.findByPatternNo(patternNo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pattern master by ID' })
  @ApiResponse({ status: 200, description: 'Pattern master found.' })
  @ApiResponse({ status: 404, description: 'Pattern master not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patternMastersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pattern master' })
  @ApiResponse({ status: 200, description: 'Pattern master updated successfully.' })
  @ApiResponse({ status: 404, description: 'Pattern master not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePatternMasterDto: Prisma.PatternMasterUpdateInput) {
    return this.patternMastersService.update(id, updatePatternMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pattern master' })
  @ApiResponse({ status: 200, description: 'Pattern master deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Pattern master not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patternMastersService.remove(id);
  }
}


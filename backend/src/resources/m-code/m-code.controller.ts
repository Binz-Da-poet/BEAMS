import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MCodeService } from './m-code.service';
import { MCode, Prisma } from '@prisma/client';

@ApiTags('M Codes')
@Controller('m-codes')
export class MCodeController {
  constructor(private readonly mCodeService: MCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Create master code' })
  @ApiResponse({ status: 201, description: 'Master code created successfully.' })
  create(@Body() createMCodeDto: Prisma.MCodeCreateInput): Promise<MCode> {
    return this.mCodeService.create(createMCodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get master codes' })
  @ApiResponse({ status: 200, description: 'List of master codes.' })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('isActive') isActive?: string,
  ) {
    if (search) {
      return this.mCodeService.search(search, category);
    }

    const where: Prisma.MCodeWhereInput = {};
    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const params: { skip?: number; take?: number; where?: Prisma.MCodeWhereInput; orderBy?: Prisma.MCodeOrderByWithRelationInput } = {
      where,
      orderBy: { sortOrder: 'asc' },
    };
    if (skip) params.skip = parseInt(skip, 10);
    if (take) params.take = parseInt(take, 10);

    return this.mCodeService.findAll(params);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get master codes by category' })
  @ApiResponse({ status: 200, description: 'List of master codes in the category.' })
  findByCategory(@Param('category') category: string) {
    return this.mCodeService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get master code by ID' })
  @ApiResponse({ status: 200, description: 'Master code found.' })
  @ApiResponse({ status: 404, description: 'Master code not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mCodeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update master code' })
  @ApiResponse({ status: 200, description: 'Master code updated successfully.' })
  @ApiResponse({ status: 404, description: 'Master code not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMCodeDto: Prisma.MCodeUpdateInput) {
    return this.mCodeService.update(id, updateMCodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete master code' })
  @ApiResponse({ status: 200, description: 'Master code deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Master code not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mCodeService.remove(id);
  }
}


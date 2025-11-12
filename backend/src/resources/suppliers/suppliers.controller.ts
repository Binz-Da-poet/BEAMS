import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { Prisma, Supplier } from '@prisma/client';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create supplier' })
  @ApiResponse({ status: 201, description: 'Supplier created successfully.' })
  create(@Body() createSupplierDto: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiResponse({ status: 200, description: 'List of suppliers.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.suppliersService.search(search);
    }

    const params: { skip?: number; take?: number } = {};
    if (skip) params.skip = parseInt(skip, 10);
    if (take) params.take = parseInt(take, 10);
    return this.suppliersService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search suppliers' })
  @ApiResponse({ status: 200, description: 'Search results for suppliers.' })
  search(@Query('q') query: string) {
    return this.suppliersService.search(query);
  }

  @Get('supplier-no/:supplierNo')
  @ApiOperation({ summary: 'Get supplier by supplier number' })
  @ApiResponse({ status: 200, description: 'Supplier found.' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  findBySupplierNo(@Param('supplierNo') supplierNo: string) {
    return this.suppliersService.findBySupplierNo(supplierNo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get supplier by ID' })
  @ApiResponse({ status: 200, description: 'Supplier found.' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update supplier' })
  @ApiResponse({ status: 200, description: 'Supplier updated successfully.' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: Prisma.SupplierUpdateInput) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete supplier' })
  @ApiResponse({ status: 200, description: 'Supplier deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.remove(id);
  }
}


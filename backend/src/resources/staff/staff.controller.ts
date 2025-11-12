import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma, StaffOfStore } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { StaffService } from './staff.service';

@ApiTags('Staff')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Create staff member' })
  @ApiResponse({ status: 201, description: 'Staff member created successfully.' })
  create(@Body() createStaffDto: Prisma.StaffOfStoreUncheckedCreateInput): Promise<StaffOfStore> {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get staff members' })
  @ApiResponse({ status: 200, description: 'List of staff members.' })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('search') search?: string) {
    if (search) {
      return this.staffService.search(search);
    }

    const params: { skip?: number; take?: number } = {};
    if (skip) params.skip = parseInt(skip, 10);
    if (take) params.take = parseInt(take, 10);
    return this.staffService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get staff member by ID' })
  @ApiResponse({ status: 200, description: 'Staff member found.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update staff member' })
  @ApiResponse({ status: 200, description: 'Staff member updated successfully.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStaffDto: Prisma.StaffOfStoreUncheckedUpdateInput) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete staff member' })
  @ApiResponse({ status: 200, description: 'Staff member deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffService.remove(id);
  }
}


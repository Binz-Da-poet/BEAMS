import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { Plan } from '@prisma/client';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: 'Get all plans' })
  @ApiResponse({ status: 200, description: 'List of all plans' })
  async findAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Plan } from '@prisma/client';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Plan[]> {
    return this.prisma.plan.findMany({
      orderBy: { id: 'asc' },
    });
  }
}

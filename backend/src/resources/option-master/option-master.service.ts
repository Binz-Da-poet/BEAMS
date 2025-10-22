import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OptionMaster, Prisma } from '@prisma/client';

@Injectable()
export class OptionMasterService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.OptionMasterWhereInput; orderBy?: Prisma.OptionMasterOrderByWithRelationInput }): Promise<OptionMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.optionMaster.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<OptionMaster | null> {
    return this.prisma.optionMaster.findUnique({
      where: { id },
    });
  }

  async findByOptionName(optionName: string): Promise<OptionMaster | null> {
    return this.prisma.optionMaster.findFirst({
      where: { optionName },
    });
  }

  async create(data: Prisma.OptionMasterCreateInput): Promise<OptionMaster> {
    return this.prisma.optionMaster.create({
      data,
    });
  }

  async update(id: number, data: Prisma.OptionMasterUpdateInput): Promise<OptionMaster> {
    return this.prisma.optionMaster.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<OptionMaster> {
    return this.prisma.optionMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<OptionMaster[]> {
    return this.prisma.optionMaster.findMany({
      where: {
        OR: [{ optionName: { contains: query } }, { textContent: { contains: query } }],
      },
    });
  }

  async findByCostRange(minCost: number, maxCost: number): Promise<OptionMaster[]> {
    return this.prisma.optionMaster.findMany({
      where: {
        cost: { gte: minCost, lte: maxCost },
      },
    });
  }

  async findByRetailPriceRange(minPrice: number, maxPrice: number): Promise<OptionMaster[]> {
    return this.prisma.optionMaster.findMany({
      where: {
        retailPrice: { gte: minPrice, lte: maxPrice },
      },
    });
  }
}

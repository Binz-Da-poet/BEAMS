import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HeavyFabricButtonMaster, Prisma } from '@prisma/client';

@Injectable()
export class HeavyFabricButtonMasterService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.HeavyFabricButtonMasterWhereInput; orderBy?: Prisma.HeavyFabricButtonMasterOrderByWithRelationInput }): Promise<HeavyFabricButtonMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.heavyFabricButtonMaster.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<HeavyFabricButtonMaster | null> {
    return this.prisma.heavyFabricButtonMaster.findUnique({
      where: { id },
    });
  }

  async findByProductNo(productNo: string): Promise<HeavyFabricButtonMaster[]> {
    return this.prisma.heavyFabricButtonMaster.findMany({
      where: { productNo },
    });
  }

  async findByProductNoAndColor(productNo: string, colorNo: string): Promise<HeavyFabricButtonMaster | null> {
    return this.prisma.heavyFabricButtonMaster.findFirst({
      where: {
        productNo,
        colorNo,
      },
    });
  }

  async create(data: Prisma.HeavyFabricButtonMasterCreateInput): Promise<HeavyFabricButtonMaster> {
    return this.prisma.heavyFabricButtonMaster.create({
      data,
    });
  }

  async update(id: number, data: Prisma.HeavyFabricButtonMasterUpdateInput): Promise<HeavyFabricButtonMaster> {
    return this.prisma.heavyFabricButtonMaster.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<HeavyFabricButtonMaster> {
    return this.prisma.heavyFabricButtonMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<HeavyFabricButtonMaster[]> {
    return this.prisma.heavyFabricButtonMaster.findMany({
      where: {
        OR: [{ productNo: { contains: query } }, { colorNo: { contains: query } }, { pantsProductNo: { contains: query } }, { pantsColorNo: { contains: query } }],
      },
    });
  }

  async findByCostRange(minCost: number, maxCost: number): Promise<HeavyFabricButtonMaster[]> {
    return this.prisma.heavyFabricButtonMaster.findMany({
      where: {
        OR: [
          { cost1: { gte: minCost, lte: maxCost } },
          { cost2: { gte: minCost, lte: maxCost } },
          { cost3: { gte: minCost, lte: maxCost } },
          { cost4: { gte: minCost, lte: maxCost } },
          { cost5: { gte: minCost, lte: maxCost } },
          { cost6: { gte: minCost, lte: maxCost } },
          { cost7: { gte: minCost, lte: maxCost } },
          { cost8: { gte: minCost, lte: maxCost } },
        ],
      },
    });
  }
}

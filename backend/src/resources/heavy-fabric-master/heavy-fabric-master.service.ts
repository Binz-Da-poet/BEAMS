import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HeavyFabricMaster, Prisma } from '@prisma/client';

@Injectable()
export class HeavyFabricMasterService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.HeavyFabricMasterWhereInput; orderBy?: Prisma.HeavyFabricMasterOrderByWithRelationInput }): Promise<HeavyFabricMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.heavyFabricMaster.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        supplier: true,
      },
    });
  }

  async findOne(id: number): Promise<HeavyFabricMaster | null> {
    return this.prisma.heavyFabricMaster.findUnique({
      where: { id },
      include: {
        supplier: true,
      },
    });
  }

  async findByFabricNo(fabricNo: string): Promise<HeavyFabricMaster | null> {
    return this.prisma.heavyFabricMaster.findUnique({
      where: { fabric_no: fabricNo },
      include: {
        supplier: true,
      },
    });
  }

  async create(data: Prisma.HeavyFabricMasterCreateInput): Promise<HeavyFabricMaster> {
    return this.prisma.heavyFabricMaster.create({
      data,
      include: {
        supplier: true,
      },
    });
  }

  async update(id: number, data: Prisma.HeavyFabricMasterUpdateInput): Promise<HeavyFabricMaster> {
    return this.prisma.heavyFabricMaster.update({
      where: { id },
      data,
      include: {
        supplier: true,
      },
    });
  }

  async remove(id: number): Promise<HeavyFabricMaster> {
    return this.prisma.heavyFabricMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<HeavyFabricMaster[]> {
    return this.prisma.heavyFabricMaster.findMany({
      where: {
        OR: [{ fabric_no: { contains: query } }, { fabric_manufacturer: { contains: query } }, { color: { contains: query } }, { fabric_pattern: { contains: query } }, { composition: { contains: query } }],
      },
      include: {
        supplier: true,
      },
    });
  }
}

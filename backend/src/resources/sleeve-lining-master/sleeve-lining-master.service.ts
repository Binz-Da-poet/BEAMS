import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SleeveLiningMaster, Prisma } from '@prisma/client';

@Injectable()
export class SleeveLiningMasterService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.SleeveLiningMasterWhereInput; orderBy?: Prisma.SleeveLiningMasterOrderByWithRelationInput }): Promise<SleeveLiningMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.sleeveLiningMaster.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<SleeveLiningMaster | null> {
    return this.prisma.sleeveLiningMaster.findUnique({
      where: { id },
    });
  }

  async findByProductNo(productNo: string): Promise<SleeveLiningMaster | null> {
    return this.prisma.sleeveLiningMaster.findUnique({
      where: { productNo },
    });
  }

  async create(data: Prisma.SleeveLiningMasterCreateInput): Promise<SleeveLiningMaster> {
    return this.prisma.sleeveLiningMaster.create({
      data,
    });
  }

  async update(id: number, data: Prisma.SleeveLiningMasterUpdateInput): Promise<SleeveLiningMaster> {
    return this.prisma.sleeveLiningMaster.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<SleeveLiningMaster> {
    return this.prisma.sleeveLiningMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<SleeveLiningMaster[]> {
    return this.prisma.sleeveLiningMaster.findMany({
      where: {
        OR: [{ productNo: { contains: query } }, { colorNo: { contains: query } }, { orientation: { contains: query } }],
      },
    });
  }

  async findByStockFlag(stockFlag: boolean): Promise<SleeveLiningMaster[]> {
    return this.prisma.sleeveLiningMaster.findMany({
      where: { stockFlag },
    });
  }
}

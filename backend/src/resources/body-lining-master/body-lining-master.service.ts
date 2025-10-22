import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BodyLiningMaster, Prisma } from '@prisma/client';

@Injectable()
export class BodyLiningMasterService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.BodyLiningMasterWhereInput; orderBy?: Prisma.BodyLiningMasterOrderByWithRelationInput }): Promise<BodyLiningMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.bodyLiningMaster.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<BodyLiningMaster | null> {
    return this.prisma.bodyLiningMaster.findUnique({
      where: { id },
    });
  }

  async findByProductNo(productNo: string): Promise<BodyLiningMaster | null> {
    return this.prisma.bodyLiningMaster.findUnique({
      where: { productNo },
    });
  }

  async create(data: Prisma.BodyLiningMasterCreateInput): Promise<BodyLiningMaster> {
    return this.prisma.bodyLiningMaster.create({
      data,
    });
  }

  async update(id: number, data: Prisma.BodyLiningMasterUpdateInput): Promise<BodyLiningMaster> {
    return this.prisma.bodyLiningMaster.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<BodyLiningMaster> {
    return this.prisma.bodyLiningMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<BodyLiningMaster[]> {
    return this.prisma.bodyLiningMaster.findMany({
      where: {
        OR: [{ productNo: { contains: query } }, { colorNo: { contains: query } }, { orientation: { contains: query } }],
      },
    });
  }

  async findByStockFlag(stockFlag: boolean): Promise<BodyLiningMaster[]> {
    return this.prisma.bodyLiningMaster.findMany({
      where: { stockFlag },
    });
  }
}

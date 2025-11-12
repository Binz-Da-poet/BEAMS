
import { Injectable } from '@nestjs/common';
import { PatternMaster, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PatternMastersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.PatternMasterWhereInput;
    orderBy?: Prisma.PatternMasterOrderByWithRelationInput;
  }): Promise<PatternMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.patternMaster.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        itemTypeCode: true,
      },
    });
  }

  async findOne(id: number): Promise<PatternMaster | null> {
    return this.prisma.patternMaster.findUnique({
      where: { id },
      include: {
        itemTypeCode: true,
      },
    });
  }

  async findByPatternNo(patternNo: string): Promise<PatternMaster | null> {
    return this.prisma.patternMaster.findUnique({
      where: { patternNo },
      include: {
        itemTypeCode: true,
      },
    });
  }

  async create(data: Prisma.PatternMasterCreateInput): Promise<PatternMaster> {
    return this.prisma.patternMaster.create({
      data,
      include: {
        itemTypeCode: true,
      },
    });
  }

  async update(id: number, data: Prisma.PatternMasterUpdateInput): Promise<PatternMaster> {
    return this.prisma.patternMaster.update({
      where: { id },
      data,
      include: {
        itemTypeCode: true,
      },
    });
  }

  async remove(id: number): Promise<PatternMaster> {
    return this.prisma.patternMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<PatternMaster[]> {
    if (!query) {
      return this.findAll({ orderBy: { patternNo: 'asc' } });
    }

    return this.prisma.patternMaster.findMany({
      where: {
        OR: [
          { patternNo: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { size: { contains: query, mode: Prisma.QueryMode.insensitive } },
          {
            itemTypeCode: {
              OR: [
                { code: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ],
            },
          },
        ],
      },
      include: {
        itemTypeCode: true,
      },
      orderBy: { patternNo: 'asc' },
    });
  }
}


import { Injectable } from '@nestjs/common';
import { MCode, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.MCodeWhereInput; orderBy?: Prisma.MCodeOrderByWithRelationInput }): Promise<MCode[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.mCode.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<MCode | null> {
    return this.prisma.mCode.findUnique({
      where: { id },
    });
  }

  async findByCategory(category: string): Promise<MCode[]> {
    return this.prisma.mCode.findMany({
      where: { category },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(data: Prisma.MCodeCreateInput): Promise<MCode> {
    return this.prisma.mCode.create({
      data,
    });
  }

  async update(id: number, data: Prisma.MCodeUpdateInput): Promise<MCode> {
    return this.prisma.mCode.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<MCode> {
    return this.prisma.mCode.delete({
      where: { id },
    });
  }

  async search(query: string, category?: string): Promise<MCode[]> {
    const where: Prisma.MCodeWhereInput = {
      AND: [],
      OR: [{ code: { contains: query, mode: Prisma.QueryMode.insensitive } }, { name: { contains: query, mode: Prisma.QueryMode.insensitive } }, { description: { contains: query, mode: Prisma.QueryMode.insensitive } }],
    };

    if (category) {
      (where.AND as Prisma.MCodeWhereInput[]).push({ category });
    }

    return this.prisma.mCode.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }
}

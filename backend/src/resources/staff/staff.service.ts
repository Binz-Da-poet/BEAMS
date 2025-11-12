import { Injectable } from '@nestjs/common';
import { Prisma, StaffOfStore } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.StaffOfStoreWhereInput;
    orderBy?: Prisma.StaffOfStoreOrderByWithRelationInput;
  }): Promise<StaffOfStore[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.staffOfStore.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        store: true,
      },
    });
  }

  async search(query: string): Promise<StaffOfStore[]> {
    if (!query) {
      return this.findAll({ orderBy: { name: 'asc' } });
    }
    return this.prisma.staffOfStore.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { phone: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { role: { contains: query, mode: Prisma.QueryMode.insensitive } },
          {
            store: {
              OR: [
                { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { code: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ],
            },
          },
        ],
      },
      include: {
        store: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number): Promise<StaffOfStore | null> {
    return this.prisma.staffOfStore.findUnique({
      where: { id },
      include: {
        store: true,
      },
    });
  }

  async create(data: Prisma.StaffOfStoreUncheckedCreateInput): Promise<StaffOfStore> {
    return this.prisma.staffOfStore.create({
      data,
      include: {
        store: true,
      },
    });
  }

  async update(id: number, data: Prisma.StaffOfStoreUncheckedUpdateInput): Promise<StaffOfStore> {
    return this.prisma.staffOfStore.update({
      where: { id },
      data,
      include: {
        store: true,
      },
    });
  }

  async remove(id: number): Promise<StaffOfStore> {
    return this.prisma.staffOfStore.delete({
      where: { id },
    });
  }
}


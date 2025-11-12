import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.StoreWhereInput;
    orderBy?: Prisma.StoreOrderByWithRelationInput;
  }): Promise<Store[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.store.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async search(query: string): Promise<Store[]> {
    if (!query) {
      return this.findAll({ orderBy: { name: 'asc' } });
    }
    return this.prisma.store.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { code: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { managerName: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { region: { contains: query, mode: Prisma.QueryMode.insensitive } },
        ],
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number): Promise<Store | null> {
    return this.prisma.store.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.StoreCreateInput): Promise<Store> {
    return this.prisma.store.create({
      data,
    });
  }

  async update(id: number, data: Prisma.StoreUpdateInput): Promise<Store> {
    return this.prisma.store.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Store> {
    return this.prisma.store.delete({
      where: { id },
    });
  }
}


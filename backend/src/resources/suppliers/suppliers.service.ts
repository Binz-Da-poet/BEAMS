import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Supplier } from '@prisma/client';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithRelationInput;
  }): Promise<Supplier[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.supplier.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
      where: { id },
    });
  }

  async findBySupplierNo(supplierNo: string): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
      where: { supplierNo },
    });
  }

  async create(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.prisma.supplier.create({
      data,
    });
  }

  async update(id: number, data: Prisma.SupplierUpdateInput): Promise<Supplier> {
    return this.prisma.supplier.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Supplier> {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<Supplier[]> {
    if (!query) {
      return this.findAll({ orderBy: { supplierName: 'asc' } });
    }

    return this.prisma.supplier.findMany({
      where: {
        OR: [
          { supplierName: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { supplierNo: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { manager: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { email1: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { email2: { contains: query, mode: Prisma.QueryMode.insensitive } },
        ],
      },
      orderBy: { supplierName: 'asc' },
    });
  }
}


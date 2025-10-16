import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.customer.findMany({ orderBy: { id: 'desc' } });
  }

  create(data: { name: string; kana?: string | null; phone?: string | null; email?: string | null; note?: string | null }) {
    return this.prisma.customer.create({ data });
  }
}

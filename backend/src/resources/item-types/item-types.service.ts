import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ItemType } from '@prisma/client';

@Injectable()
export class ItemTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ItemType[]> {
    return this.prisma.itemType.findMany({
      orderBy: { id: 'asc' },
    });
  }
}

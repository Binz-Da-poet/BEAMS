import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JacketPatternMaster, Prisma } from '@prisma/client';

@Injectable()
export class JacketPatternMasterService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { skip?: number; take?: number; where?: Prisma.JacketPatternMasterWhereInput; orderBy?: Prisma.JacketPatternMasterOrderByWithRelationInput }): Promise<JacketPatternMaster[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.prisma.jacketPatternMaster.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<JacketPatternMaster | null> {
    return this.prisma.jacketPatternMaster.findUnique({
      where: { id },
    });
  }

  async findByPatternNo(patternNo: string): Promise<JacketPatternMaster | null> {
    return this.prisma.jacketPatternMaster.findUnique({
      where: { patternNo },
    });
  }

  async create(data: Prisma.JacketPatternMasterCreateInput): Promise<JacketPatternMaster> {
    return this.prisma.jacketPatternMaster.create({
      data,
    });
  }

  async update(id: number, data: Prisma.JacketPatternMasterUpdateInput): Promise<JacketPatternMaster> {
    return this.prisma.jacketPatternMaster.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<JacketPatternMaster> {
    return this.prisma.jacketPatternMaster.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<JacketPatternMaster[]> {
    return this.prisma.jacketPatternMaster.findMany({
      where: {
        OR: [{ patternNo: { contains: query } }, { size: { contains: query } }, { stitchSpec: { contains: query } }],
      },
    });
  }
}

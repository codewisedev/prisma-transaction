import { Injectable, Scope } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable({ scope: Scope.DEFAULT })
export class PrismaTransaction extends PrismaService {
  private static instance: PrismaTransaction;
  private prisma: PrismaService;

  private constructor() {
    super();
    this.prisma = new PrismaService();
  }

  public static getInstance(): PrismaTransaction {
    if (!PrismaTransaction.instance) {
      PrismaTransaction.instance = new PrismaTransaction();
    }
    return PrismaTransaction.instance;
  }

  public createTransaction(
    fn: any,
    isolationLevel?: Prisma.TransactionIsolationLevel,
  ) {
    return this.prisma.$transaction(fn, {
      isolationLevel: isolationLevel
        ? isolationLevel
        : Prisma.TransactionIsolationLevel.Serializable,
    });
  }
}

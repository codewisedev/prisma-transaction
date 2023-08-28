import { Injectable, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';
// import { Prisma } from '@prisma/client';
// import * as runtime from '@prisma/client/runtime/library';

// export type TransactionType = Omit<PrismaClient, runtime.ITXClientDenyList>;

@Injectable({ scope: Scope.REQUEST })
export class PrismaTransaction extends PrismaService {
  private static instance: PrismaTransaction;
  private prisma: PrismaService;
  // public TransactionType;
  private functions: (() => Promise<any>)[];

  private constructor() {
    super();
    this.prisma = new PrismaService();
    // this.TransactionType = typeof this.prisma.$transaction;
    this.functions = [];
  }

  public static getInstance(): PrismaTransaction {
    if (!PrismaTransaction.instance) {
      PrismaTransaction.instance = new PrismaTransaction();
    }
    return PrismaTransaction.instance;
  }

  public createPrismaClient() {
    return new PrismaClient();
  }

  // async addFunction(func: (...args: any) => Promise<any>) {
  //   this.functions.push(func);
  // }

  async addFunction(func) {
    this.functions.push(func);
  }

  // public runTransaction(isolationLevel?: Prisma.TransactionIsolationLevel) {
  //   this.prisma.$transaction(
  //     async (transaction) => {
  //       const promises = this.functions.map((func) => func());
  //       Promise.all(promises)
  //         .then(() => transaction.$queryRaw`COMMIT;`)
  //         .catch(() => transaction.$queryRaw`ROLLBACK;`);
  //     },
  //     {
  //       isolationLevel: isolationLevel
  //         ? isolationLevel
  //         : Prisma.TransactionIsolationLevel.Serializable,
  //     },
  //   );
  // }

  // public createTransaction(
  //   fn: any[],
  //   isolationLevel?: Prisma.TransactionIsolationLevel,
  // ): Omit<PrismaClient, runtime.ITXClientDenyList> {
  //   let transactionScope: Omit<PrismaClient, runtime.ITXClientDenyList>;
  //   this.prisma.$transaction(
  //     async (transaction) => {
  //       transaction.$executeRaw`BEGIN;`;
  //       try {
  //         const promises = this.functions.map((func) => func());
  //         Promise.all(promises);
  //         transaction.$executeRaw`COMMIT;`;
  //       } catch (error) {
  //         console.log('Failed');
  //         transaction.$executeRaw`ROLLBACK;`;
  //       }
  //     },
  //     {
  //       isolationLevel: isolationLevel
  //         ? isolationLevel
  //         : Prisma.TransactionIsolationLevel.Serializable,
  //     },
  //   );
  //   return transactionScope;
  // }

  // public createTransaction() {
  //   return this.prisma.$transaction;
  // }

  // public createTransaction(
  //   isolationLevel?: Prisma.TransactionIsolationLevel,
  // ): Omit<PrismaClient, runtime.ITXClientDenyList> {
  //   let transactionScope: Omit<PrismaClient, runtime.ITXClientDenyList>;
  //   this.prisma.$transaction(
  //     async (transaction: Omit<PrismaClient, runtime.ITXClientDenyList>) => {
  //       transactionScope = transaction;
  //     },
  //     {
  //       isolationLevel: isolationLevel
  //         ? isolationLevel
  //         : Prisma.TransactionIsolationLevel.Serializable,
  //     },
  //   );
  //   return transactionScope;
  // }
}

import { PrismaClient } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { RequestContext } from 'nestjs-request-context';

export type PrismaTransactionClient = Omit<PrismaClient, ITXClientDenyList>;

export class AppRequestContext extends RequestContext {
  public prismaTransactionClient: PrismaTransactionClient;
}

export class RequestContextService {
  public static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    return ctx;
  }

  public static setPrismaTransaction(
    prismaTransactionClient: PrismaTransactionClient,
  ): void {
    const ctx = this.getContext();
    ctx.prismaTransactionClient = prismaTransactionClient;
  }

  public static getPrismaTransaction(): PrismaTransactionClient {
    const ctx = this.getContext();
    return ctx.prismaTransactionClient;
  }

  public static cleanPrismaTransaction(): void {
    const ctx = this.getContext();
    ctx.prismaTransactionClient = undefined;
  }
}

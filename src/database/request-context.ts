import { PrismaClient } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { RequestContext } from 'nestjs-request-context';

export type PrismaTransactionClient = Omit<PrismaClient, ITXClientDenyList>;

/* The `TransactionRequestContext` class extends the `RequestContext` class and adds a property
`prismaTransactionClient` of type `PrismaTransactionClient`. */
export class TransactionRequestContext extends RequestContext {
  public prismaTransactionClient: PrismaTransactionClient;
}

/* The `RequestContextService` class provides methods to manage the context of an app request,
including setting and retrieving a Prisma transaction client. */
export class RequestContextService {
  /**
   * The function returns the current context of the app request.
   * @returns the current TransactionRequestContext object.
   */
  public static getContext(): TransactionRequestContext {
    const ctx: TransactionRequestContext = RequestContext.currentContext.req;
    return ctx;
  }

  /**
   * The function sets the Prisma transaction client in the context.
   * @param {PrismaTransactionClient} prismaTransactionClient - The `prismaTransactionClient` parameter
   * is an instance of the `PrismaTransactionClient` class. It is used to interact with the Prisma
   * database and perform transactions.
   */
  public static setPrismaTransaction(
    prismaTransactionClient: PrismaTransactionClient,
  ): void {
    const ctx = this.getContext();
    ctx.prismaTransactionClient = prismaTransactionClient;
  }

  /**
   * The function returns the PrismaTransactionClient object from the context.
   * @returns The `PrismaTransactionClient` object is being returned.
   */
  public static getPrismaTransaction(): PrismaTransactionClient {
    const ctx = this.getContext();
    return ctx.prismaTransactionClient;
  }

  /**
   * The function "cleanPrismaTransaction" sets the "prismaTransactionClient" property of the "ctx"
   * object to undefined.
   */
  public static cleanPrismaTransaction(): void {
    const ctx = this.getContext();
    ctx.prismaTransactionClient = undefined;
  }
}

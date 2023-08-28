import { Prisma, PrismaClient } from '@prisma/client';
import { RequestContextService } from './request-context';

/**
 * The `transactionPrismaClient` function extends the functionality of the Prisma client by adding
 * additional methods for handling shutdown hooks, transactions, and custom query operations.
 * @param {PrismaClient} client - The `client` parameter is an instance of the `PrismaClient` class. It
 * is used to interact with the database and perform CRUD operations.
 * @returns The function `transactionPrismaClient` returns an extended version of the `PrismaClient`
 * object.
 */
const transactionPrismaClient = (client: PrismaClient) =>
  client.$extends({
    client: {
      async $transaction<T>(handler: () => Promise<T>) {
        return Prisma.getExtensionContext(client).$transaction(async (tx) => {
          if (!RequestContextService.getPrismaTransaction())
            RequestContextService.setPrismaTransaction(tx);

          try {
            const result = await handler();
            console.log(`transaction committed.`);
            return result;
          } catch (error) {
            console.log(`transaction rollback!!`);
            throw error;
          } finally {
            RequestContextService.cleanPrismaTransaction();
          }
        });
      },
    },
    query: {
      $allModels: {
        $allOperations({ model, operation, args, query }) {
          const tx = RequestContextService.getPrismaTransaction();
          if (tx) return tx[model][operation](args);
          return query(args);
        },
      },
    },
  });

export type IExtendedPrismaClientService = new (
  options?: Prisma.PrismaClientOptions,
) => ReturnType<typeof transactionPrismaClient>;

/* The code `export const ExtendedPrismaClientService = <IExtendedPrismaClientService>class { ... }` is creating a
new class called `ExtendedPrismaClientService` that extends the `PrismaClientService` class. */
export const PrismaClientService = <IExtendedPrismaClientService>class {
  constructor(options?: Prisma.PrismaClientOptions) {
    const client = new PrismaClient(options);
    return transactionPrismaClient(client);
  }
};

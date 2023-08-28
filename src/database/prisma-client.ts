import { Prisma, PrismaClient } from '@prisma/client';
import { RequestContextService } from './request-context';

/**
 * The `extendedPrismaClient` function extends the functionality of the Prisma client by adding
 * additional methods for handling shutdown hooks, transactions, and custom query operations.
 * @param {PrismaClient} client - The `client` parameter is an instance of the `PrismaClient` class. It
 * is used to interact with the database and perform CRUD operations.
 * @returns The function `extendedPrismaClient` returns an extended version of the `PrismaClient`
 * object.
 */
const extendedPrismaClient = (client: PrismaClient) =>
  client.$extends({
    client: {
      async $transaction<T>(handler: () => Promise<T>) {
        return Prisma.getExtensionContext(client).$transaction(async (tx) => {
          if (!RequestContextService.getPrismaTransaction()) {
            RequestContextService.setPrismaTransaction(tx);
          }

          try {
            const result = await handler();
            console.debug(`[${new Date()}] transaction committed.`);
            return result;
          } catch (error) {
            console.debug(`[${new Date()}] transaction aborted!!`);
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

export type IExtendedPrismaClient = new (
  options?: Prisma.PrismaClientOptions,
) => ReturnType<typeof extendedPrismaClient>;

/* The code `export const ExtendedPrismaClient = <IExtendedPrismaClient>class { ... }` is creating a
new class called `ExtendedPrismaClient` that extends the `PrismaClient` class. */
export const ExtendedPrismaClient = <IExtendedPrismaClient>class {
  constructor(options?: Prisma.PrismaClientOptions) {
    const client = new PrismaClient(options);
    return extendedPrismaClient(client);
  }
};

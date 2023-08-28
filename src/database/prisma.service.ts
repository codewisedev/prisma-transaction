import { Injectable } from '@nestjs/common';
import { ExtendedPrismaClient } from './prisma-client';

@Injectable()
export class PrismaService extends ExtendedPrismaClient {
  constructor() {
    super();
  }
}

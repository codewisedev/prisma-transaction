import { Injectable } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';

@Injectable()
export class PrismaService extends PrismaClientService {
  constructor() {
    super();
  }
}

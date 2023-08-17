import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Post, Prisma } from '@prisma/client';
// import { PrismaClient } from '@prisma/client';
// import { TransactionType } from 'src/database/prisma-transaction';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  // async createPost(
  //   data: Prisma.PostCreateInput,
  //   transaction?: any,
  //   prismaClient?: PrismaClient,
  // ): Promise<Post> {
  //   if (transaction) {
  //     return transaction(async (tx) => {
  //       await tx.post.create({ data });
  //     });
  //     // return transaction.post.create({ data });
  //   } else {
  //     return this.prisma.post.create({
  //       data,
  //     });
  //   }
  // }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}

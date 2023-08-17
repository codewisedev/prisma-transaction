import { Controller, Get } from '@nestjs/common';
import { UserService } from './domain/user/user.repository';
import { PostService } from './domain/post/post.repository';
import { PrismaTransaction } from './database/prisma-transaction';
import { Prisma } from '@prisma/client';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  private transaction = PrismaTransaction.getInstance();
  private prisma = new PrismaService();

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get()
  async get() {
    try {
      const userData: Prisma.UserCreateInput = {
        name: 'mohammad',
        email: 'c@emil.com',
      };
      const postData = {} as Prisma.PostCreateInput;

      // const prismaClient = this.transaction.createPrismaClient();

      // const createdUser = await prismaClient.user.create({ data: userData });
      // const createdPost = await prismaClient.post.create({ data: postData });

      // const createdUser = await this.userService.createUser(
      //   userData,
      //   prismaClient,
      // );
      // const createdPost = await this.postService.createPost(
      //   postData,
      //   prismaClient,
      // );

      // this.transaction.createTransaction([createdUser, createdPost]);

      // const transaction = this.transaction.createTransaction();

      // const createdUser = await this.userService.createUser(
      //   userData,
      //   transaction,
      //   prismaClient,
      // );
      // const createdPost = await this.postService.createPost(
      //   postData,
      //   transaction,
      //   prismaClient,
      // );

      // const createdPost = new Promise(() =>
      //   this.postService.createPost(postData),
      // );

      this.transaction.addFunction(this.userService.createUser(userData));
      this.transaction.addFunction(this.postService.createPost(postData));

      this.transaction.runTransaction();

      // const createdUser = await this.userService.createUser.bind(userData);
      // const createdPost = await this.postService.createPost.bind(postData);

      // this.transaction.createTransaction([createdUser, createdPost]);

      // console.log(createdUser, createdPost);
    } catch (error) {
      console.log(error);
    }
  }
}

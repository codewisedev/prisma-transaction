import { Controller, Get } from '@nestjs/common';
import { UserService } from './domain/user/user.repository';
import { PostService } from './domain/post/post.repository';
import { PrismaTransaction } from './database/prisma-transaction';
import { Prisma } from '@prisma/client';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  private transaction = PrismaTransaction.getInstance();
  private prisma: PrismaService;

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {
    this.prisma = new PrismaService();
  }

  @Get()
  async get() {
    try {
      const userData: Prisma.UserCreateInput = {
        name: 'mohammad',
        email: 'a@emil.com',
      };
      const postData = {} as Prisma.PostCreateInput;

      this.transaction.createTransaction([
        this.userService.createUser.bind(userData),
        this.postService.createPost.bind(postData),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}

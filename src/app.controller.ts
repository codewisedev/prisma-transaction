import { Controller, Get } from '@nestjs/common';
import { UserService } from './domain/user/user.repository';
import { PostService } from './domain/post/post.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async get() {
    try {
      // One ***********************************************
      const userData: Prisma.UserCreateInput = {
        name: 'mohammad',
        email: 'd@emil.com',
      };
      const postData = { title: '' } as Prisma.PostCreateInput;

      await this.prismaService.$transaction(async () => {
        const createdUser = await this.userService.createUser(userData);
        const createdPost = await this.postService.createPost(postData);

        console.log(createdUser, createdPost);
      });

      // Two ***********************************************
      const userDataTwo: Prisma.UserCreateInput = {
        name: 'mohammad',
        email: 'e@emil.com',
      };
      const postDataTwo = {} as Prisma.PostCreateInput;

      await this.prismaService.$transaction(async () => {
        const createdUser = await this.userService.createUser(userDataTwo);
        const createdPost = await this.postService.createPost(postDataTwo);

        console.log(createdUser, createdPost);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

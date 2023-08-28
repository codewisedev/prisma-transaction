import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './domain/user/user.module';
import { PostModule } from './domain/post/post.module';
import { DatabaseModule } from './database/database.module';
import { RequestContextModule } from 'nestjs-request-context';

@Module({
  imports: [RequestContextModule, UserModule, PostModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

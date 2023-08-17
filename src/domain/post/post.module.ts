import { Module } from '@nestjs/common';
import { PostService } from './post.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}

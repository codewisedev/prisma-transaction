import { Module } from '@nestjs/common';
import { UserService } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

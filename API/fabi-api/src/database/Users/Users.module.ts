import { Module } from '@nestjs/common';
import {UsersService} from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from './Users.entity'
 
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  exports: [TypeOrmModule]
})
export class UsersModule {}
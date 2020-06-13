import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './Users/users.service';
import {UsersModule} from '../database/Users/Users.module'
import { Connection } from 'typeorm';
 
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
  ],
  providers: [UsersService],
 
})
export class DatabaseModule {
  constructor(private connection: Connection) {}
}
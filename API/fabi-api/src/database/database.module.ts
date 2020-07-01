import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './Users/users.service';
import {UsersModule} from '../database/Users/Users.module'
import { Connection } from 'typeorm';
import { ReportModule } from './Report/report.module';
import { ReportService } from './Report/report.service';
 
@Module({
  imports: [
    UsersModule,
    ReportModule,
    TypeOrmModule.forRoot(),
  ],
  providers: [UsersService,ReportService],
 
})
export class DatabaseModule {
  constructor(private connection: Connection) {}
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './Users/users.service';
import {UsersModule} from '../database/Users/Users.module'
import { Connection } from 'typeorm';
import { ReportModule } from './Report/report.module';
import { ReportService } from './Report/report.service';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
 
@Module({
  imports: [
    UsersModule,
    ReportModule,
    TypeOrmModule.forRoot(),
    AdminDashboardModule,
  ],
  providers: [UsersService,ReportService],
 
})
export class DatabaseModule {
  constructor(private connection: Connection) {}
}
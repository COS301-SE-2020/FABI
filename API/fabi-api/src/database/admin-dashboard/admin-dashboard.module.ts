import { Module, HttpModule } from '@nestjs/common';
import { GetAdminDashService } from './get-admin-dash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Reports from '../Report/report.entity';
import Users from '../Users/Users.entity';
import { ReportService } from '../Report/report.service';
import { UsersService } from '../Users/users.service';



@Module({
  imports: [TypeOrmModule.forFeature([Reports,Users]),HttpModule],
  providers: [GetAdminDashService,ReportService,UsersService],
  exports:[TypeOrmModule]
})
export class AdminDashboardModule {}

import { Module, HttpModule } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard/admin-dashboard.service';
import { UsersService } from '../database/Users/users.service';
import { UsersModule } from '../database/Users/Users.module';
import { GetAdminDashService } from '../database/admin-dashboard/get-admin-dash.service';
import { ReportService } from '../database/Report/report.service';
import { AdminDashboardModule } from '../database/admin-dashboard/admin-dashboard.module';
import { AdminDashboardResolver } from './admin-dashboard/admin-dashboard.resolver';

@Module({
  providers: [AdminDashboardService,UsersService,GetAdminDashService,ReportService,AdminDashboardResolver],
  imports: [UsersModule,AdminDashboardModule,HttpModule]
})
export class DashboardModule {}

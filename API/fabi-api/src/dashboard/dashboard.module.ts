import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard/admin-dashboard.service';
import { UsersService } from '../database/Users/users.service';
import { UsersModule } from '../database/Users/Users.module';
import { GetAdminDashService } from '../database/admin-dashboard/get-admin-dash.service';

@Module({
  providers: [AdminDashboardService,UsersService,GetAdminDashService],
  imports: [UsersModule]
})
export class DashboardModule {}

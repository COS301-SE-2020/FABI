import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard/admin-dashboard.service';

@Module({
  providers: [AdminDashboardService]
})
export class DashboardModule {}

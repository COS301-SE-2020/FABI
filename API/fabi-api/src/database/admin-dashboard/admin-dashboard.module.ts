import { Module } from '@nestjs/common';
import { GetAdminDashService } from './get-admin-dash.service';



@Module({
  providers: [GetAdminDashService]
})
export class AdminDashboardModule {}

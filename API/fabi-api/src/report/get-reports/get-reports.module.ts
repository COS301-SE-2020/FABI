import { Module } from '@nestjs/common';
import { GetReportsService } from './get-reports.service';
import { GetReportsResolver } from './get-reports.resolver';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';
import { UsersModule } from 'src/database/Users/Users.module';
import { ReportModule } from 'src/database/Report/report.module';

@Module({
  providers: [GetReportsService, GetReportsResolver,UsersService,ReportService],
  imports: [UsersModule,ReportModule, GetReportsModule]
})
export class GetReportsModule {}

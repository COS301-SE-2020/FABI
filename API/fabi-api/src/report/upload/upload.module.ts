import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UsersModule } from 'src/database/Users/Users.module';
import { UploadResolver } from './upload.resolver';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';
import { ReportModule } from 'src/database/Report/report.module';
import { GetReportsModule } from '../get-reports/get-reports.module';
 

@Module({
  providers: [UploadService,UploadResolver,UsersService,ReportService],
  imports: [UsersModule,ReportModule, GetReportsModule]
})
export class UploadModule {}

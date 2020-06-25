import { Module } from '@nestjs/common';
import { UploadService } from './upload/upload.service';
import { UsersModule } from 'src/database/Users/Users.module';
import { UploadResolver } from './upload/upload.resolver';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';
 

@Module({
  providers: [UploadService,UploadResolver,UsersService,ReportService],
  imports: [UsersModule,ReportModule]
})
export class ReportModule {}

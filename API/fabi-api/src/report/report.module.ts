import { Module } from '@nestjs/common';
import { UploadService } from './upload-/upload-.service';
import { UploadService } from './upload/upload.service';
import { ReportService } from './report.service';

@Module({
  providers: [UploadService, ReportService]
})
export class ReportModule {}

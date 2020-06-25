import { Module } from '@nestjs/common';
import { UploadService } from './upload/upload.service';
 

@Module({
  providers: [UploadService]
})
export class ReportModule {}

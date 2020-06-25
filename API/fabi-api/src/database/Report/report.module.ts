import { Module } from '@nestjs/common';
import Reports from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ReportService} from './report.service'
@Module({
    imports: [TypeOrmModule.forFeature([Reports])],
    providers: [ReportService],
    exports: [TypeOrmModule]
})
export class ReportModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Reports  from './report.entity';

@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Reports)
        private ReportsRepository: Repository<Reports>
    ){}

    async getReportbyID(id : string): Promise<Reports>{
        const report = await this.ReportsRepository.findOne({reportID:id});
        return report;
    }


}

import { Injectable } from '@nestjs/common';
import { GetReportsResponse, GetReportsRequest} from '../../graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';

@Injectable()
export class GetReportsService {
    res: GetReportsResponse = { email: "", reports: "", status: 0 }

    constructor(
        private userService: UsersService,
        private reportService : ReportService,
    ){}

    async getReports(reqObj:GetReportsRequest):Promise<GetReportsResponse>{
       
        return this.res;
    }
}

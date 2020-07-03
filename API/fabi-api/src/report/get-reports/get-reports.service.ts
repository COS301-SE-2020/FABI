import { Injectable } from '@nestjs/common';
import { GetReportsResponse, GetReportsRequest } from '../../graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';

@Injectable()
export class GetReportsService {
    res: GetReportsResponse = { reports: "", status: 0 }

    constructor(
        private userService: UsersService,
        private reportService: ReportService,
    ) { }

    async getReports(reqObj: GetReportsRequest): Promise<GetReportsResponse> {
        const result = await this.userService.validateToken(reqObj.email, reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            this.res.status = 415;
            
            return this.res;
        } else {
            //this will pass upload object to report service that will interact with db
            let reportString = await this.reportService.getReports(reqObj.latitude, reqObj.longitude);

            //Build response object
            this.res.reports = await reportString.toString();
            this.res.status = 201;

            //return response Object
            return this.res;

        }
    }
}

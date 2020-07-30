import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GetReportsService } from './get-reports.service';
import {GetReportsResponse,GetReportsRequest,GetSingleReportRequest }  from '../../graphql.schema';

@Resolver('GetReports')
export class GetReportsResolver {
    uploadService: any;

    constructor(
        private getReportService:GetReportsService,
    ){}

@Mutation('getReports')
async getReports(@Args('getReportsRequest') reqObj: GetReportsRequest  ): Promise<GetReportsResponse>{

    return this.getReportService.getReports(reqObj);
}

@Mutation('getSingleReport')
async getSingleReport(@Args('getSingleReportRequest') reqObj: GetSingleReportRequest ){

    return this.getReportService.getSingleReports(reqObj);

}
}

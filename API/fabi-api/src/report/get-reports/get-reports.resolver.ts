import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GetReportsService } from './get-reports.service';
import {GetReportsResponse,GetReportsRequest,GetSingleReportRequest, GetSingleReportResponse, GetDiagnosis_ReasonResponse }  from '../../graphql.schema';

@Resolver('GetReports')
export class GetReportsResolver {
    uploadService: any;

    constructor(
        private getReportService:GetReportsService,
    ){}

@Mutation('getReports')
async getReports(@Args('getReportsRequest') reqObj: GetReportsRequest  ): Promise<GetSingleReportResponse[]>{

    return this.getReportService.getReports(reqObj);
}

@Mutation('getSingleReport')
async getSingleReport(@Args('getSingleReportRequest') reqObj: GetSingleReportRequest ){

    return this.getReportService.getSingleReports(reqObj);

}

@Mutation('getDiagnosis_Reason')
async getDiagnosis_Reason(@Args('getSingleReportRequest') reqObj: GetSingleReportRequest ):Promise<GetDiagnosis_ReasonResponse>{

    return this.getReportService.getDiagnosis_ReasonService(reqObj);

}
}

/*
 * File Name: get-reports.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file will recieve input from the aprropriate resolver
 * Output                         : This file will send the response object to the resolver
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : <List any classes contained>
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Sunday, July 19th 2020, 2:33:29 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This service will validate the user token and will take action based on the result
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */


import { Injectable } from '@nestjs/common';
import { GetReportsResponse, GetReportsRequest,GetSingleReportRequest } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';

@Injectable()
export class GetReportsService {
    // create the return variable
    res: GetReportsResponse = { reports: "", status: 0 }

    //define services used within this file
    constructor(
        private userService: UsersService,
        private reportService: ReportService,
    ) { }

    async getReports(reqObj: GetReportsRequest): Promise<GetReportsResponse> {
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
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
    
    async getSingleReports(reqObj: GetSingleReportRequest) : Promise<GetReportsResponse> {

        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            this.res.status = 415;

            return this.res;
        } else {
            //this will pass upload object to report service that will interact with db
            let reportString = await this.reportService.getSingleReport(reqObj.reportID);

            //Build response object
            this.res.reports = await reportString.toString();
            this.res.status = 201;

            //return response Object
            return this.res;

        }
    }

}

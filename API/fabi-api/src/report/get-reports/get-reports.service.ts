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
import { GetReportsResponse, GetReportsRequest,GetSingleReportRequest, GetSingleReportResponse, GetDiagnosis_ReasonResponse } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';

@Injectable()
export class GetReportsService {
    

    //define services used within this file
    constructor(
        private userService: UsersService,
        private reportService: ReportService,
    ) { }

    async getReports(reqObj: GetReportsRequest): Promise<GetSingleReportResponse[]> {

        // create the return variable
        var res: GetSingleReportResponse[] = [{status:201}]

        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            res[0].status = 415;

            return res;
        } else {

            //clear array
            res.pop();

            //this will pass upload object to report service that will interact with db
            let reportJSON = await this.reportService.getReports(reqObj.latitude, reqObj.longitude);

            if(Object.keys(reportJSON).length == 0){
            return res;
            }

            //Build response object
            for(var i = 0 ; i<Object.keys(reportJSON).length ; i++){
                res.push({status:201,
                Accuracy:reportJSON[i].Accuracy,
                Img1:reportJSON[i].IMG1,
                Img2:reportJSON[i].IMG2,
                Img3:reportJSON[i].IMG3,
                ID:reportJSON[i].reportID,
                Infliction:reportJSON[i].Infliction,
                Lat:reportJSON[i].Lat,
                Long:reportJSON[i].Long,
                Pname:reportJSON[i].Pname,
                NeuralNetRating:reportJSON[i].Pscore,
                form:reportJSON[i].form,
                userType:reportJSON[i].userType
                })
            }

            //return response Object
            return res;

        }
    }

    async getDiagnosis_ReasonService(reqObj: GetSingleReportRequest): Promise<GetDiagnosis_ReasonResponse>{
        var response: GetDiagnosis_ReasonResponse = {status:500,diagnosis:"a",reason:"a"};

        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            response.status = 415;

            return response;
        } else {
            
            //this will pass upload object to report service that will interact with db
             var resFromDb = await this.reportService.getDiagnosisAndReason(reqObj);
             if(Object.keys(resFromDb).length == 0){
                 return response;
             }
             response.diagnosis = resFromDb[0].CommName;
             response.reason = resFromDb[0].reason;
             response.status = 201;

            return response;

        }

    }
    
    async getSingleReports(reqObj: GetSingleReportRequest) : Promise<GetSingleReportResponse> {

        var response: GetSingleReportResponse = {status:500};

        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            response.status = 415;

            return response;
        } else {
            
            //this will pass upload object to report service that will interact with db
            let report = await this.reportService.getSingleReport(reqObj.reportID);

            if(Object.keys(report).length==0){
                return response;
            }

            //Build response object
            response.Accuracy = report[0].Accuracy;
            response.Img1 = report[0].IMG1;
            response.Img2 = report[0].IMG2;
            response.Img3 = report[0].IMG3;
            response.Infliction = report[0].Infliction;
            response.Lat = report[0].Lat;
            response.Long = report[0].Long;
            response.Pname = report[0].Pname;
            response.NeuralNetRating = report[0].Pscore;
            response.ID = report[0].reportID;
            response.userType = report[0].userType;
            response.form = report[0].form;
            response.tags = report[0].tags;
            response.verification = report[0].verification;
            response.diagnoser = report[0].diagnoser;
            response.status = 201;
            
            //return response Object
            return response;

        }
    }

}

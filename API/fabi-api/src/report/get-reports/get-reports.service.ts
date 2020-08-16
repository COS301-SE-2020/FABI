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
import { GetReportsResponse, GetReportsRequest,GetSingleReportRequest, GetSingleReportResponse, GetDiagnosis_ReasonResponse, PopTableMobileResponse } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { PopulateTableService } from '../populate-table/populate-table.service';

@Injectable()
export class GetReportsService {
    // create the return variable
    res: GetReportsResponse = { reports: "", status: 0 }

    //define services used within this file
    constructor(
        private userService: UsersService,
        private reportService: ReportService,
        private populateTableService: PopulateTableService
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
             response.comment = resFromDb[0].comment;
             response.status = 201;

            return response;

        }

    }
    
    async getSingleReports(reqObj: GetSingleReportRequest) : Promise<GetSingleReportResponse> {

        var response: GetSingleReportResponse = {status:-1};

        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            this.res.status = 415;

            return this.res;
        } else {
            //this will pass upload object to report service that will interact with db
            let report = await this.reportService.getSingleReport(reqObj.reportID);

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

    async getReportsMobileService(reqObj: GetReportsRequest):Promise<PopTableMobileResponse[]>{
        //response object
       var res: PopTableMobileResponse[] = [{ status: -1, Pname: "/", date: "/", distance: 0.0, ID:-1 }];

       const result = await this.userService.validateToken(reqObj.token).then(function (result) {
        return result;
    })
    if (result == false) {
        //error code
        this.res.status = 415;

        return res;
    } else {
        res.pop();
        //lat 
        let lat:number = reqObj.latitude;
        
        //long
        let long:number = reqObj.longitude;


        //get all similar
        let result = await this.reportService.getReports(lat, long);

        //create JSON obj
        let resultJson = JSON.parse(result.toString());

        //not needed
        let sortedResults = resultJson;

        //Loop through each key in the JSON obj
        for (var i = 0; i < Object.keys(sortedResults).length; i++) {
            //variables created for response object
            let distance: number;
            let date: string;
            let Pname: string;
            let ID:number;

            //report lat/long
            let reportLat: number = sortedResults[i].Lat;
            let reportLong: number = sortedResults[i].Long;

            //calcualate the distance between the reports
            distance = this.populateTableService.calcDistance(lat, long, reportLat, reportLong);
            distance = Math.round(distance * 100) / 100

            //create the date as string
            var temp = resultJson[i].date;
            date = temp.toString().substr(0, 4);
            date = date + "-" + temp.toString().substr(4, 2);
            date = date + "-" + temp.toString().substr(6, 2);

            //create the Pname
            Pname = sortedResults[i].Pname;

            //set the ID
            ID = sortedResults[i].reportID;

            //add object to list
            res.push({ Pname: Pname, date: date, distance: distance, status: 201, ID:ID });
           
        }
        //sort result by distance
        res = res.sort(function(a, b) {
            return (a.distance) - (b.distance);
        });

        

        //response
        return res;
            }
    }

}

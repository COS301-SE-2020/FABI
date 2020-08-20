/*
 * File Name: populate-table.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This service will recieve a request object
 * Output                         : This service will return an array of JSON objects
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : PopulateTableService
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, August 3rd 2020, 8:31:24 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This service will get all reports withnin 50km and will return the reports in a format suitable for a table
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : Database connection
 */

import { Injectable } from '@nestjs/common';
import { UsersService } from '../../database/Users/users.service';
import { PopTableResponse, PopTableRequest } from '../../graphql.schema';
import { ReportService } from '../../database/Report/report.service';


@Injectable()
export class PopulateTableService {

    res: PopTableResponse[] = [{ status: -1, Pname: "test data", date: "", distance: 0.0, ID: -1 }];

    //Define the External services used in this service
    constructor(
        private userService: UsersService,
        private reportService: ReportService,

    ) { }


    //This is the primary function within the service, it will validate the token and call another service
    async populateTableService(reqObj: PopTableRequest): Promise<PopTableResponse[]> {


        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            //error code
            this.res[0].status = 415;
            return this.res;

        } else {
            //clear response object
            this.res = [{ status: -1, Pname: "test data", date: "", distance: 0.0, ID: -1 }];
            this.res.pop();


            //make call to db and get individual report
            let singleReportJSON = await this.reportService.getSingleReport(reqObj.reportID);

            //create variables that store given lat,long
            let long: number = singleReportJSON[0].Long;
            let lat: number = singleReportJSON[0].Lat;

            //get all similar
            let result = await this.reportService.getReports(lat, long);

            //this so retard but the sort function doesn't work if i dont do this.
            let resultString = JSON.stringify(result);
            let resultJson = JSON.parse(resultString.toString());

            //sort results by reportID
            let sortedResults = resultJson.sort(function (a, b) {
                return parseFloat(a.reportID) - parseFloat(b.reportID);
            });

            //Loop through each key in the JSON obj
            for (var i = 0; i < Object.keys(sortedResults).length; i++) {
                //variables created for response object
                let distance: number;
                let date: string;
                let Pname: string;
                let ID: number;

                //report lat/long
                let reportLat: number = sortedResults[i].Lat;
                let reportLong: number = sortedResults[i].Long;

                //calcualate the distance between the reports
                distance = this.calcDistance(lat, long, reportLat, reportLong);
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
                this.res.push({ Pname: Pname, date: date, distance: distance, status: 201, ID: ID });
            }

            //response
            return this.res;

        }

    }


    //calculate distance between two co-ordinates
    calcDistance(lat1: number, long1: number, lat2: number, long2: number): number {

        var R = 6371; // km
        let dLat: number = this.toRad(lat2 - lat1);
        var dLon = this.toRad(long2 - long1);
        var latitude1 = this.toRad(lat1);
        var latitude2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latitude1) * Math.cos(latitude2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d: number = R * c;
        return d;
    }

    //takes value to radians
    toRad(Value: number): number {
        return (Value * Math.PI / 180);
    }

}

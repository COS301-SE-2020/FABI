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

    res: PopTableResponse[] = [{ status: -1, Pname: "test data", date: "", distance: 0.0 }];

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
            this.res.pop;

            //make call to db and get individual report
            let singleReport: String = await this.reportService.getSingleReport(reqObj.reportID);

            //convert string to JSON
            let singleReportJSON = JSON.parse(singleReport.toString());

            //create variables that store given lat,long
            let long: number = singleReportJSON[0].Long;
            let lat: number = singleReportJSON[0].Lat;

            //get all similar
            let result = await this.reportService.getReports(lat, long);

            //create JSON obj
            let resultJson = JSON.parse(result.toString());

            //Loop through each key in the JSON obj
            for (var i = 0; i < Object.keys(resultJson).length; i++) {
                //variables created for response object
                let distance: number;
                let date: string;
                let Pname: string;

                //report lat/long
                let reportLat: number = resultJson[i].Lat;
                let reportLong: number = resultJson[i].Long;

                //calcualate the distance between the reports
                distance = this.calcDistance(lat, long, reportLat, reportLong);
                distance = Math.round(distance * 100) / 100

                //create the date as string
                var temp = resultJson[i].date;
                date = temp.toString().substr(0, 4);
                date = date + "-" + temp.toString().substr(4, 2);
                date = date + "-" + temp.toString().substr(6, 2);

                //create the Pname
                Pname = resultJson[i].Pname;

                //add object to list
                this.res.push({ Pname: Pname, date: date, distance: distance, status: 201 });
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

/*
This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2)
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    }

     Converts numeric degrees to radians
    function toRad(Value)
    {
        return Value * Math.PI / 180;
    }
*/
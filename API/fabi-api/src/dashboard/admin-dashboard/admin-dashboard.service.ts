/*
 * File Name: admin-dashboard.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This service will recieve a token fron the respective resolver
 * Output                         : This service will return a response object to the respective resolver
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : AdminDashboardService
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Tuesday, July 21st 2020, 3:43:41 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This serivce will validate the usertoken and will take appropriate action
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */




import { Injectable } from '@nestjs/common';
import {Admin_Dashboard_request,Admin_Dashboard_response, Admin_Piechart_response}  from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { GetAdminDashService } from '../../database/admin-dashboard/get-admin-dash.service';
import { number } from '@hapi/joi';



@Injectable()
export class AdminDashboardService {

    //Define the External services used in this service
    constructor(
        private userService : UsersService,
        private getAdminDashService : GetAdminDashService,  
    ) {}

    


    async getGraphInfo_Service(reqObj: Admin_Dashboard_request): Promise<Admin_Dashboard_response> {

        //Define our response data-type
    const res: Admin_Dashboard_response = {data:"",status:0};

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            res.status = 415;
            res.data = "null";
            return res;
            
        } else {
            //call other service.
            return this.getAdminDashService.getLineGraphInfo(reqObj);

        }

    }


    async getTableInfo_Service(reqObj:Admin_Dashboard_request): Promise<Admin_Dashboard_response>{

           //Define our response data-type
        const res: Admin_Dashboard_response = {data:"",status:0};

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            res.status = 415;
            res.data = "null";
            return res;
            
        } else {
            //call other service.
            return this.getAdminDashService.getTableInfo(reqObj);

        }

    }

    async getPiechartInfo_Service(reqObj:Admin_Dashboard_request): Promise<Admin_Piechart_response[]>{

        //Define our response data-type
        const res: Admin_Piechart_response[] = [{label:"abc",percentage:45, status:-1}];

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            res[0].status = 415;
            return res;
            
        } else {
            //pop mochdata
            res.pop();

            //total pests
            let num:number = 0;
            //call other service.
            var resultJson = await this.getAdminDashService.getPieChartInfo(reqObj);

            //loop to add all couts
            for(var i = 0 ; Object.keys(resultJson).length > i ; i++ ){
                num = num + parseInt(resultJson[i].count);
            }

            //loop to create res Object
            for(var i = 0 ; Object.keys(resultJson).length > i ; i++ ){
                //variable to hold percenatge
                let percentage:number;
                //calculate percentage
                percentage = Math.round(parseInt(resultJson[i].count) / num * 100) ;

                //create return object
                res.push({label:resultJson[i].CommName,percentage:percentage,status:201});
            
            }

            return res;

        }
    }



}

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
import {Admin_Dashboard_request,Admin_Dashboard_response}  from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';


@Injectable()
export class AdminDashboardService {

    //Define the External services used in this service
    constructor(
        private userService: UsersService,
    ) {}

    //Define our response data-type
    res: Admin_Dashboard_response = {data:""};


    async getGraphInfo_Service(reqObj: Admin_Dashboard_request): Promise<Admin_Dashboard_response> {

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            //return 415
            
        } else {
            //call other service.
            
            return this.res;

        }

    }
}

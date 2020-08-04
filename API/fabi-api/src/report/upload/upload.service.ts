/*
 * File Name: upload.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file will recieve input from the respective resolver
 * Output                         : This file will return the Response to the resolver
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
 * Functional Description         : <This service will validate the user token and will take action based on the result
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Injectable } from '@nestjs/common';
import { UploadResponse, UploadRequest } from 'src/graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';

@Injectable()
export class UploadService {
    //Define the return object
    res: UploadResponse = {status:0}

    //define services used in this service
    constructor(
        private userService: UsersService,
        private reportService : ReportService,
    ){}

    //This function will validate our token and send data to the respective service
    async upload(reqObj:UploadRequest):Promise<UploadResponse>{
        const result = await this.userService.validateToken(reqObj.token).then(function(result){
            return result;
        })
        if(result==false){
            this.res.status = 415;
            return this.res;
        }else{
            //this will pass upload object to report service that will interact with db
            var bool = await this.reportService.InsertReport(reqObj);

            //check if it uploaded correctly
            if(bool != true){
                this.res.status = 500;
                return this.res;
            }

            this.res.status = 201;
            return this.res;

            

        }
        
    }
}

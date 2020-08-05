/*
 * File Name: add-affliction.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This service will recieve an input object
 * Output                         : This service will return a status code to indicate if the upload was successful
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : AddAfflictionService
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Tuesday, August 4th 2020, 9:19:00 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : this file will validate the token and will pass the request object to the service that connects to the DB
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Injectable } from '@nestjs/common';
import { AfflictionService } from '../../database/Afflictions/affliction.service';
import { UsersService } from '../../database/Users/users.service';
import { Add_Affliction_Request, Add_Affliction_Response } from '../../graphql.schema';


@Injectable()
export class AddAfflictionService {

    //Define our response data-type
    res: Add_Affliction_Response = {status:0};

    //Define the External services used in this service
    constructor(
        private userService: UsersService,
        private afflictionDbService: AfflictionService,

    ) { }


    //This is the primary function within the service, it will validate the token and call another service
    async addAfflictions(reqObj: Add_Affliction_Request): Promise<Add_Affliction_Response> {

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the respective object based 
        if (result == false) {
            this.res.status = 415;
            return this.res;
        } else {
            const result = await this.afflictionDbService.addAffliction(reqObj);

            if(result != true){
                this.res.status = 500;
                return this.res;
            }

            this.res.status = 201;
            return this.res;
 
        }

    }
}

/*
 * File Name: update-afflictions.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : recieves object from resolver
 * Output                         : returns response object to resolver
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : <List any classes contained>
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, July 20th 2020, 10:16:08 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : this function will check the token and will interact with the service that calls the db
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Injectable } from '@nestjs/common';
import { Update_afflictions_response, Update_afflictions_request } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { AfflictionService } from '../../database/Afflictions/affliction.service';
import { object } from '@hapi/joi';

@Injectable()
export class UpdateAfflictionsService {

    //Define our response data-type
    res: Update_afflictions_response = { status: 1 };

    // Define the External services used in this service
    constructor(
        private userService: UsersService,
        private afflictionDbService: AfflictionService,

    ) { }

    //This is the primary function within the service, it will validate the token and call another service
    async updateAffliction(reqObj: Update_afflictions_request): Promise<Update_afflictions_response> {

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            //set the response code
            this.res.status = 415;

            //if the token does not exist
            return this.res;

        } else {
            //here we add all the keys from the object into a string array
            let keys: string[] = [];
            for (var i = 0; i < Object.keys(reqObj).length; i++) {
                keys.push(Object.keys(reqObj)[i]);
            }
            //here we call another service
            var statusCode = await this.afflictionDbService.updateAfflictions(reqObj, keys);
            this.res.status = statusCode;
            //return object
            return this.res;
        }

    }
}

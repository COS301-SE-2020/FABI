/*
 * File Name: get-afflictions.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file will recieve a Request-object from a resolver
 * Output                         : This function will create the response object for the respective resolver
 * Related Requirements           : 
 * Classes in this file           : GetAfflictionsService
 * Related Documents              : 
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, July 20th 2020, 10:23:21 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This service will vaidate that the user-token passed from the front-end is correct,
 *                                  this service will contact the respective service to interact with the database if the 
 *                                  the token is correct
 * Constraints                    : Must be connected to database
 * Assumptions                    : 
 */





import { Injectable } from '@nestjs/common';
import { All_afflictions_request, All_afflictions } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { AfflictionService } from '../../database/Afflictions/affliction.service';
import { object } from '@hapi/joi';
import { parse } from 'path';

@Injectable()
export class GetAfflictionsService {

    //Define our response data-type
    res: All_afflictions[] = [];

    //Define the External services used in this service
    constructor(
        private userService: UsersService,
        private afflictionDbService: AfflictionService,

    ) { }

    //This is the primary function within the service, it will validate the token and call another service
    async getAllAflictions(reqObj: All_afflictions_request): Promise<All_afflictions[]> {

        //here we validate our token
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })

        //here we return the return the respective object based 
        if (result == false) {
            this.res = [{ status: 415 }];
            return this.res;
        } else {
            
            const result = await this.afflictionDbService.getAfflictions(reqObj.affliction_type);

            for (var i = 0; i < Object.keys(result).length; i++) {

                this.res.push({ id: result[i].id, name: result[i].CommName, plant: result[i].plant, scientificName: result[i].SciName, type: result[i].type, status: 201 });

            }

            return this.res;

        }

    }
}

/*
 * File Name: delete-afflictions.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This service receives an input object from the resolver
 * Output                         : This service will return a response object to the client side
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : DeleteAfflictionsService
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Wednesday, August 5th 2020, 7:58:06 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This file will validate the user token and will pass the affliction ID to the next service for deletion
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */


import { Injectable } from '@nestjs/common';
import { Delete_Affliction_Response, Delete_Affliction_Request } from 'src/graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { AfflictionService } from 'src/database/Afflictions/affliction.service';

@Injectable()
export class DeleteAfflictionsService {

     //Define our response data-type
     res: Delete_Affliction_Response = {status:0};

     //Define the External services used in this service
     constructor(
         private userService: UsersService,
         private afflictionDbService: AfflictionService,
 
     ) { }
 
 
     //This is the primary function within the service, it will validate the token and call another service
     async deleteAfflictions(reqObj: Delete_Affliction_Request): Promise<Delete_Affliction_Response> {
 
         //here we validate our token
         const result = await this.userService.validateToken(reqObj.token).then(function (result) {
             return result;
         })
 
         //here we return the respective object based 
         if (result == false) {
             this.res.status = 415;
             return this.res;
         } else {
             const result = await this.afflictionDbService.deleteAffliction(reqObj);
 
             if(result != true){
                 this.res.status = 500;
                 return this.res;
             }
 
             this.res.status = 201;
             return this.res;
  
         }
 
     }

}

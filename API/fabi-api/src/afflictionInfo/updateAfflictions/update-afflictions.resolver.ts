/*
 * File Name: update-afflictions.resolver.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file recieves input from the front-end in the form of a request object
 * Output                         : This file will output a response object to the front-end
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : UpdateAfflictionsResolver
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, July 20th 2020, 10:16:41 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This resolver will recieve a request opbject from the front-end 
 *                                  And will pass the object to a service.
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Resolver, Args, Mutation } from '@nestjs/graphql';
import {Update_afflictions_response,Update_afflictions_request} from '../../graphql.schema';
import {UpdateAfflictionsService} from "./update-afflictions.service";


@Resolver('UpdateAfflictions')
export class UpdateAfflictionsResolver {

     //Here we define the service that handels the requested object
     constructor(
        private updateAfflictionService: UpdateAfflictionsService
    ){}

    //This is the mutation that is exposed to the front-end 
    @Mutation('update_afflictions')
    async update_Afflictions(@Args('request') reqObj: Update_afflictions_request ) : Promise<Update_afflictions_response>{
        
        //Pass our request to service which will validate token and build response
        return this.updateAfflictionService.updateAffliction(reqObj);
    }
}

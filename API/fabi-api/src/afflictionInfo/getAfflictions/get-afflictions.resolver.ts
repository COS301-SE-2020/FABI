/*
 * File Name: get-afflictions.resolver.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file receives a object from the front-end
 * Output                         : This file will return a response object to the front-end
 * Related Requirements           : 
 * Classes in this file           : GetAfflictionsResolver
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, July 20th 2020, 10:23:48 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This file will recieve the request from the front-end and will 
 *                                  pass the request object to the appropriate service for processing.
 * Constraints                    : Connection to remote database is required for fucntion
 * Assumptions                    : The request object from the front-end must be defianed
 */

import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GetAfflictionsService } from './get-afflictions.service';
import { All_afflictions_request, All_afflictions,Single_affliction_request,Single_affliction_response }  from '../../graphql.schema';

@Resolver('GetAfflictions')
export class GetAfflictionsResolver {
    //Here we define the service that handels the requested object
    constructor(
        private getAfflictionService: GetAfflictionsService
    ){}

    //This is the mutation that is exposed to the front-end 
    @Mutation('get_afflictions')
    async get_afflictions(@Args('request') reqObj: All_afflictions_request) : Promise<All_afflictions[]>{
        
        //Pass our request to service which will validate token and build response
        return this.getAfflictionService.getAllAflictions(reqObj);
    }


    @Mutation('get_Single_affliction')
    async get_Single_affliction(@Args('request') reqObj: Single_affliction_request): Promise<Single_affliction_response>{

        return this.getAfflictionService.getSingleAffliction(reqObj);
    }




}

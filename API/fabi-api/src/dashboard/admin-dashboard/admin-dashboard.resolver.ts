/*
 * File Name: admin-dashboard.resolver.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file recieves request object from front-end
 * Output                         : This file will return a response object back to the front-end
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : AdminDashboardResolver
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Tuesday, July 21st 2020, 3:44:17 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This file contains the resolver that will handel the call made by the front-end
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */



import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {Admin_Dashboard_request,Admin_Dashboard_response, Admin_Piechart_response}  from '../../graphql.schema';
import { AdminDashboardService } from './admin-dashboard.service';

@Resolver('AdminDashboard')
export class AdminDashboardResolver {
    //Here we define the service that handels the requested object
    constructor(
        private getAdminDashboardService : AdminDashboardService
    ){}

    //This is the mutation that is exposed to the front-end 
    @Mutation('get_GraphInfo')
    async get_GraphInfo(@Args('request') reqObj: Admin_Dashboard_request) : Promise<Admin_Dashboard_response>{
        
        
        //Pass our request to service which will validate token and build response

        return this.getAdminDashboardService.getGraphInfo_Service(reqObj);
    }

    //This is the mutation that is exposed to the front-end 
    @Mutation('get_TableInfo')
    async get_TableInfo(@Args('request') reqObj: Admin_Dashboard_request) : Promise<Admin_Dashboard_response>{
        
        
        //Pass our request to service which will validate token and build response

        return this.getAdminDashboardService.getTableInfo_Service(reqObj);
    }

    //This is the mutation that is exposed to the front-end 
    @Mutation('get_PieChartInfo')
    async get_PieChartInfo(@Args('request') reqObj: Admin_Dashboard_request) : Promise<Admin_Piechart_response[]>{
        
        
        //Pass our request to service which will validate token and build response
        return this.getAdminDashboardService.getPiechartInfo_Service(reqObj);
    }






}

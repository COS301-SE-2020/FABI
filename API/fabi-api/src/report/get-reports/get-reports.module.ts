/*
 * File Name: get-reports.module.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : <Inputs if any, otherwise state None>
 * Output                         : <Outputs if any, otherwise state None>
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : <List any classes contained>
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Sunday, July 19th 2020, 2:21:40 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : <Provide a brief explanation of the file's purpose>
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Module } from '@nestjs/common';
import { GetReportsService } from './get-reports.service';
import { GetReportsResolver } from './get-reports.resolver';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { UsersModule } from '../../database/Users/Users.module';
import { ReportModule } from '../../database/Report/report.module';
import { PopulateTableService } from '../populate-table/populate-table.service';

@Module({
  providers: [GetReportsService, GetReportsResolver,UsersService,ReportService,PopulateTableService],
  imports: [UsersModule,ReportModule, GetReportsModule]
})
export class GetReportsModule {}

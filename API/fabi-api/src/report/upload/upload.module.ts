/*
 * File Name: upload.module.ts
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
 * Functional Description         : This file defines all of the providers and imports for the module
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UsersModule } from '../../database/Users/Users.module';
import { UploadResolver } from './upload.resolver';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { ReportModule } from '../../database/Report/report.module';
import { GetReportsModule } from '../get-reports/get-reports.module';
 

@Module({
  providers: [UploadService,UploadResolver,UsersService,ReportService],
  imports: [UsersModule,ReportModule, GetReportsModule]
})
export class UploadModule {}

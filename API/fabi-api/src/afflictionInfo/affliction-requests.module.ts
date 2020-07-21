/*
 * File Name: affliction-requests.module.ts
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
 *            Creation Date:      :Monday, July 20th 2020, 10:20:35 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This file states all imports and providers that are used by the affliction-requests
 * Constraints                    : none
 * Assumptions                    : All prividers and imports must be defined
 */


import { Module } from '@nestjs/common';
import { GetAfflictionsService } from './getAfflictions/get-afflictions.service';
import { GetAfflictionsResolver } from './getAfflictions/get-afflictions.resolver';
import { UsersService } from '../database/Users/users.service';
import { UsersModule } from '../database/Users/Users.module';
import { AfflictionsModule } from '../database/Afflictions/afflictions.module';
import { AfflictionService } from '../database/Afflictions/affliction.service';
import {UpdateAfflictionsService} from "./updateAfflictions/update-afflictions.service";
import { UpdateAfflictionsResolver } from './updateAfflictions/update-afflictions.resolver';

@Module({
    providers: [
        GetAfflictionsService,
        GetAfflictionsResolver,
        UsersService,
        AfflictionService,
        UpdateAfflictionsService,
        UpdateAfflictionsResolver],
    imports: [UsersModule,AfflictionsModule]
})
export class AfflictionRequestsModule {}


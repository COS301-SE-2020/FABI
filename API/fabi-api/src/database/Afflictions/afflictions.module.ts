/*
 * File Name: afflictions.module.ts
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
 *            Creation Date:      :Monday, July 20th 2020, 10:27:26 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : this file states all services and providers for the Afflictions module
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */




import { Module } from '@nestjs/common';

import { AfflictionService } from './affliction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Afflictions from './affliction.entity';

@Module({
  providers: [AfflictionService],
  imports: [TypeOrmModule.forFeature([Afflictions])],
  exports: [TypeOrmModule]
})
export class AfflictionsModule {}

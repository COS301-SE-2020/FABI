/*
 * File Name: affliction.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : This file will recieve input from a service
 * Output                         : This file will return a JSON obect
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : AfflictionService
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, July 20th 2020, 10:28:11 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This service will query the database for all information that is related to the input from serivce
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */


import { Injectable } from '@nestjs/common';
import Afflictions from './affliction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AfflictionService {
 
  //Here we define the Repository we are going to be querying
    constructor(
        @InjectRepository(Afflictions)
        private AfflictionsRepository: Repository<Afflictions>
      ) {}
  //This is the main funtion where query the database
    async getAfflictions(typeInput:string): Promise<JSON> {
        const Info = await this.AfflictionsRepository.query("SELECT * FROM public."+"\""+"Afflictions" + "\"" + "WHERE type =" + "\'" + typeInput + "\'" + "  ;");
        
        return Info;
        }
}

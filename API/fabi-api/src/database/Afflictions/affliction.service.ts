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
import { Update_afflictions_request,Single_affliction_response, Add_Affliction_Request } from '../../graphql.schema';


@Injectable()
export class AfflictionService {

  //Here we define the Repository we are going to be querying
  constructor(
    @InjectRepository(Afflictions)
    private AfflictionsRepository: Repository<Afflictions>
  ) { }
  //This is the main funtion where query the database
  async getAfflictions(typeInput: string): Promise<JSON> {
    const Info = await this.AfflictionsRepository.query("SELECT * FROM public." + "\"" + "Afflictions" + "\"" + "WHERE type =" + "\'" + typeInput + "\'" + " order by id ;");

    return Info;
  }

  //this function will update required fields in database
  async updateAfflictions(reqobj: Update_afflictions_request, keys: string[]): Promise<number> {

    var changes = "";
    var idPos = 0;
    for (var i = 0; i < keys.length; i++) {

      //these two if statements change the key names to the matching db fields
      if (keys[i] == "name") {
        keys[i] = "CommName";
      }
      if (keys[i] == "scienceName") {
        keys[i] = "SciName";
      }

      //here be build a string that is used to edit the respective db fields
      if (keys[i] != "id") {

        if (keys[i] != "token") {
          if (i != keys.length - 1) {

            changes = changes + "\"" + keys[i] + "\"" + " = " + "\'" + Object.values(reqobj)[i] + "\'" + ",";
          }
          else {
            changes = changes + "\"" + keys[i] + "\"" + " = " + "\'" + Object.values(reqobj)[i] + "\'";
          }
        }
      }
      else {
        idPos = i;
      }

    }

    //here we add the where statement to the constructed string
    changes = changes + " where " + "\"" + keys[idPos] + "\"" + " = " + Object.values(reqobj)[idPos] + ";";

    //here we upodate the db
    await this.AfflictionsRepository.query("UPDATE public." + "\"" + "Afflictions" + "\"" + " set " + changes);
    //return code 
    return 201;
  }

  //This method will get a single affliction from the DB
  async getSingleAffliction(givenID : number): Promise<Single_affliction_response> {
    
    const result = await this.AfflictionsRepository.query("SELECT * " + "FROM public." + "\"" + "Afflictions" + "\"" + "WHERE id =" + "\'" + givenID + "\'" + "  ;");

   const returnObject : Single_affliction_response = {id:result[0].id , description:result[0].description , distribution:result[0].distribution ,img1:result[0].img1 , img2:result[0].img2 , img3:result[0].img3 , management:result[0].management , name:result[0].CommonName , plant:result[0].plant , scienceName:result[0].SciName , symptoms:result[0].symptoms , status:result[0].status , type:result[0].type , statusCode:201};

    return returnObject;
  }

  //This method will add an affliction to the DB
  async addAffliction(reqObj: Add_Affliction_Request): Promise<boolean>{

  try {
    this.AfflictionsRepository.query("INSERT INTO public.\"Afflictions\" (\"type\",\"SciName\",\"CommName\",\"plant\",\"distribution\",\"status\",\"description\",\"symptoms\",\"management\",\"img1\",\"img2\",\"img3\") VALUES (\'"
    +reqObj.type+"\',\'"+ reqObj.scienceName +"\',\'"+reqObj.commName+"\',\'"+ reqObj.plant +"\',\'"+ reqObj.distribution +"\',\'" +reqObj.status + "\',\'"+reqObj.description+"\',\'"+reqObj.symptoms+"\',\'"+reqObj.management+"\',\'"+ reqObj.img1+"\',\'"+ reqObj.img2 +"\',\'"+reqObj.img3+"\');");

    return true;
  
} catch (error) {
  return false;  
}

    
 
  }



}

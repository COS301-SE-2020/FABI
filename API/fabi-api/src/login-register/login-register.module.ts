/*
 * File Name: login-register.module.ts
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
 *            Creation Date:      :Sunday, July 19th 2020, 2:21:15 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This file defines all of the providers and imports for the module
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Module } from '@nestjs/common';
import { RegisterResolver } from './register/register.resolver';
import { LoginResolver } from './login/login.resolver';
import {RegisterService} from './register/register.service';
import {UsersService} from '../database/Users/users.service';
import {UsersModule} from '../database/Users/Users.module';
import { LoginService } from './login/login.service';

@Module({
  providers: [RegisterResolver, LoginResolver,RegisterService,UsersService,LoginService],
  imports: [UsersModule]
})
export class LoginRegisterModule {}


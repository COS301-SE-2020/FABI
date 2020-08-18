/*
 * File Name: auth-user.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : recieve object from front-end
 * Output                         : return object that conatains UserType
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : <List any classes contained>
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, August 17th 2020, 11:08:21 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This service will Authenticate a token and will return User Type to the front-end
 * Constraints                    : must be a valid token
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import { Injectable } from '@nestjs/common';
import { UsersService } from '../database/Users/users.service';
import { AuthUserRequest, AuthUserResponse, UsersResponse } from '../graphql.schema';

@Injectable()
export class AuthUserService {
    //define services used within this file
    constructor(
        private userService: UsersService
    ) { }

    async AuthUserService(reqObj: AuthUserRequest): Promise<AuthUserResponse> {

        var res: AuthUserResponse = { UserType: "", status: 0 };
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            res.status = 415;
            return res;
        } else {

            var userType = await this.userService.getUserType(reqObj.token);

            if (userType == "") {
                res.status = 500;
                return res;
            }

            res.UserType = userType;
            res.status = 201;
            return res;

        }

    }

    async getSpecialUserService(reqObj:AuthUserRequest): Promise<UsersResponse[]>{
        var res: UsersResponse[] = [{ status: 0, email:"",name:"",surname:"",userType:""}];
        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            res[0].status = 415;
            return res;
        } else {
            res.pop();
            var resultJSON = await this.userService.getSpecialUsers();

            if(Object.keys(resultJSON).length == 0){
                 res[0].status = 500;
                 return res;
            }

            for(var i = 0;i<Object.keys(resultJSON).length;i++){
                res.push({
                    status:201,
                    email:resultJSON[i].Email,
                    name:resultJSON[i].Name,
                    surname:resultJSON[i].Surname,
                    userType:resultJSON[i].userType
                })
            }
            return res;
        }
    }

    async getBasicUserService(reqObj:AuthUserRequest): Promise<UsersResponse[]>{
        var res: UsersResponse[] = [{ status: 0, email:"",name:"",surname:"",userType:""}];

        const result = await this.userService.validateToken(reqObj.token).then(function (result) {
            return result;
        })
        if (result == false) {
            //error code
            res[0].status = 415;
            return res;
        } else {
            res.pop();
            var resultJSON = await this.userService.getBasicUsers();

            if(Object.keys(resultJSON).length == 0){
                 res[0].status = 500;
                 return res;
            }

            for(var i = 0;i<Object.keys(resultJSON).length;i++){
                res.push({
                    status:201,
                    email:resultJSON[i].Email,
                    name:resultJSON[i].Name,
                    surname:resultJSON[i].Surname,
                    userType:resultJSON[i].userType
                })
            }
            return res;
        }
    }
}

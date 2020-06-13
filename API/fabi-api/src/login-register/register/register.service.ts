import { Injectable } from '@nestjs/common';
import {  Response,Request }  from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service'
import { empty } from 'rxjs';
import _ from 'lodash';
import { async } from 'rxjs/internal/scheduler/async';


@Injectable()
export class RegisterService {

    res: Response = {status:0, token:""};

    constructor(
        private userService: UsersService
    ){}


  async register(reqObj:Request): Promise<Response>{      
        
        //query DB
     const result = await this.userService.getUsersbyEmail(reqObj.email).then(function(result) {
            return result;
         })

        //check if user with queried Email exists
        if(result){
            this.res.status = 409;
            this.res.token="";
            return this.res;
        }
        else{
            //here we need to add new user to db
            const NewUser = await this.userService.createUser(reqObj).then(function(result) {
                return result;
            })
            //build response object
            this.res.token = NewUser.token;
            this.res.status = 201;
            //response
            return this.res;
        }        
        
    }
}

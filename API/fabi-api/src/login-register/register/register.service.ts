import { Injectable } from '@nestjs/common';
import {  Response,Request }  from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service'

@Injectable()
export class RegisterService {

    res: Response = {id: 1, status:0, token:""};

    constructor(
        private userService: UsersService
    ){}


    register(reqObj:Request): Response{
        
        this.userService.getUsersbyEmail("fuck@gmail.com").then(function(result) {
            console.log(result) // "Some User token"
         })
        //here we need to check if the user is already registered
            

        //if he is not we can build a response obj

        this.res.id = 1234567777;
        this.res.status = 201;
        this.res.token = "ajskdhfilsvcbni516161a6d1sc65aD";

        //return response object the client
        return this.res;
        
    }
}

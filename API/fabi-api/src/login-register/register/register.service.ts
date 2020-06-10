import { Injectable } from '@nestjs/common';
import {  Response,Request }  from '../../graphql.schema';

@Injectable()
export class RegisterService {

    res: Response = {id: 1, status:0, token:""};



    register(reqObj:Request): Response{
        

        //here we need to check if the user is already registered
            

        //if he is not we can build a response obj

        this.res.id = 123456;
        this.res.status = 201;
        this.res.token = "ajskdhfilsvcbni516161a6d1sc65aD";

        //return response object the client
        return this.res;
        
    }
}

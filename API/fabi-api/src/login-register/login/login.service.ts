import { Injectable } from '@nestjs/common';
import {  LoginResponse,LoginRequest }  from '../../graphql.schema';

@Injectable()
export class LoginService {

    res: LoginResponse = {id: 1, token:"",status:1};


    login(reqObj:LoginRequest): LoginResponse{
        this.res.id = 123456;
        this.res.status = 201;
        this.res.token = "ajskdhfilsvcbni516161a6d1sc65aD";
        return this.res;
    }
}

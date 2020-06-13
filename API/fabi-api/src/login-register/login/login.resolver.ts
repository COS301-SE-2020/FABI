import { Resolver, Mutation,Args } from '@nestjs/graphql';
import { LoginService } from './login.service'
import {  LoginResponse,LoginRequest, }  from '../../graphql.schema';

@Resolver()
export class LoginResolver {
    constructor(
        private loginService: LoginService
    ){}

    @Mutation('login')
    async login(@Args('request') reqObj: LoginRequest) : Promise<LoginResponse>{
        return this.loginService.login(reqObj);
    }
}

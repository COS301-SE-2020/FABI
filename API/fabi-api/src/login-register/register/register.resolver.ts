import { Resolver, Mutation,Args } from '@nestjs/graphql';
import { RegisterService } from './register.service'
import {  Response,Request }  from '../../graphql.schema';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

@Resolver()
export class RegisterResolver {

    constructor(
        private registerService: RegisterService
    ){}

@Mutation('registerUser')
async register(@Args('request') reqObj: Request ): Promise<Response>{

    return this.registerService.register(reqObj);
}



}

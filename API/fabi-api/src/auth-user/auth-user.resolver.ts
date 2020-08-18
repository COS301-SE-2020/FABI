import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthUserService } from './auth-user.service';
import { AuthUserRequest, AuthUserResponse } from '../graphql.schema';

@Resolver('AuthUser')
export class AuthUserResolver {

    constructor(
        private authUserService: AuthUserService
    ) { }
    @Mutation('getUserType')
    async login(@Args('request') reqObj: AuthUserRequest): Promise<AuthUserResponse> {

        return this.authUserService.AuthUserService(reqObj);
    }
}

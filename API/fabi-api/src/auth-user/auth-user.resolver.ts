import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthUserService } from './auth-user.service';
import { AuthUserRequest, AuthUserResponse, UsersResponse, UpdateUserRequest, UpdateUserResponse } from '../graphql.schema';

@Resolver('AuthUser')
export class AuthUserResolver {

    constructor(
        private authUserService: AuthUserService
    ) { }
    @Mutation('getUserType')
    async login(@Args('request') reqObj: AuthUserRequest): Promise<AuthUserResponse> {

        return this.authUserService.AuthUserService(reqObj);
    }

    @Mutation('getSpecialUsers')
    async getSpecialUsers(@Args('request') reqobj: AuthUserRequest): Promise<UsersResponse[]>{
        return this.authUserService.getSpecialUserService(reqobj);
    }

    @Mutation('getBasicUsers')
    async getBasicUsers(@Args('request') reqobj: AuthUserRequest): Promise<UsersResponse[]>{
        return this.authUserService.getBasicUserService(reqobj);
    }
    @Mutation('updateUserType')
    async updateUserType(@Args('request') reqobj: UpdateUserRequest): Promise<UpdateUserResponse>{
        return this.authUserService.updateUserService(reqobj);
    }
}

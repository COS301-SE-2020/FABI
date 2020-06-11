import { Module } from '@nestjs/common';
import { RegisterResolver } from './register/register.resolver';
import { LoginResolver } from './login/login.resolver';
import {RegisterService} from './register/register.service'
import {UsersService} from '../database/Users/users.service'
import {UsersModule} from '../database/Users/Users.module'

@Module({
  providers: [RegisterResolver, LoginResolver,RegisterService,UsersService,],
  imports: [UsersModule]
})
export class LoginRegisterModule {}

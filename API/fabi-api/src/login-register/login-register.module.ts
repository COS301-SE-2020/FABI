import { Module } from '@nestjs/common';
import { RegisterResolver } from './register/register.resolver';
import { LoginResolver } from './login/login.resolver';
import {RegisterService} from './register/register.service'

@Module({
  providers: [RegisterResolver, LoginResolver,RegisterService]

})
export class LoginRegisterModule {}

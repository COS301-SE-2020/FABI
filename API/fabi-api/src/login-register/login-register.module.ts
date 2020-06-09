import { Module } from '@nestjs/common';
import { RegisterResolver } from './register/register.resolver';
import { LoginResolver } from './login/login.resolver';

@Module({
  providers: [RegisterResolver, LoginResolver]
})
export class LoginRegisterModule {}

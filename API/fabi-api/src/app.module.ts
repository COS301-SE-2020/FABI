import { LoginRegisterModule } from './login-register/login-register.module';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'


@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions:{
        requireResolversForResolveType: false,
      }
    }),
        LoginRegisterModule, ],

})
export class AppModule {}

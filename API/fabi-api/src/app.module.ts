import { LoginRegisterModule } from './login-register/login-register.module';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';



@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      })
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions:{
        requireResolversForResolveType: false,
      },
      installSubscriptionHandlers: true,
      
    }),
        LoginRegisterModule,
        DatabaseModule,
       ],

})
export class AppModule {}

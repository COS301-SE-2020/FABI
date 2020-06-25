import { LoginRegisterModule } from './login-register/login-register.module';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from './report/report.module';
import Users from  "./database/Users/Users.entity"



@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions:{
        requireResolversForResolveType: false,
      },
      installSubscriptionHandlers: true,
      
    }),
        LoginRegisterModule,
        DatabaseModule,
        ReportModule,
       ],

})
export class AppModule {}

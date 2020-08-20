import { LoginRegisterModule } from './login-register/login-register.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './report/upload/upload.module';
import Users from "./database/Users/Users.entity"
import { AfflictionRequestsModule } from './afflictionInfo/affliction-requests.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PopulateTableModule } from './report/populate-table/populate-table.module';
import { AuthUserModule } from './auth-user/auth-user.module';



@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      installSubscriptionHandlers: true,

    }),
    LoginRegisterModule,
    DatabaseModule,
    UploadModule,
    AfflictionRequestsModule,
    DashboardModule,
    PopulateTableModule,
    AuthUserModule,
    AuthUserModule
  ],

})
export class AppModule { }

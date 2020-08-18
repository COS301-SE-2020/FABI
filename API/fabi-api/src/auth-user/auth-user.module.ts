import { Module } from '@nestjs/common';
import { AuthUserResolver } from './auth-user.resolver';
import { AuthUserService } from './auth-user.service';
import { UsersModule } from '../database/Users/Users.module';
import { UsersService } from '../database/Users/users.service';

@Module({
  providers: [AuthUserResolver, AuthUserService,UsersService],
  imports: [UsersModule]
})
export class AuthUserModule {}

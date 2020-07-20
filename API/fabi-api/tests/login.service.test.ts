import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../src/database/Users/Users.entity';
import { LoginService } from '../src/login-register/login/login.service';

describe('LoginService', () => {
    let loginService : LoginService;
    let userRepository: Repository<Users>;
    
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LoginService,
          {
            provide: getRepositoryToken(Users),
            useClass: UsersRepositoryFake,
          },
        ],
      }).compile();
  
      loginService = module.get(LoginService);
      userRepository = module.get(getRepositoryToken(Users));
    });

    describe('Login Function Test', ()=>{
      it('')
    });
});
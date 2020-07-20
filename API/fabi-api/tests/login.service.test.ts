import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../src/database/Users/Users.entity';
import { LoginService } from '../src/login-register/login/login.service';
import { LoginRequest, LoginResponse } from '../src/graphql.schema';

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
      it('Error Wrong Email', async () => {

        const testLoginReq = new LoginRequest;
        testLoginReq.email = "";
        testLoginReq.password = "";

        let testLoginRes = new LoginResponse;

        const playlistRepositorySaveSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue();

  
        testLoginRes = await loginService.login(testLoginReq);
        
        expect(testLoginRes.status).toBe(411);
    
      });
    });
});
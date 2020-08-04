import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../src/database/Users/Users.entity';
import { LoginService } from '../src/login-register/login/login.service';
import { LoginRequest, LoginResponse } from '../src/graphql.schema';
import { UsersService } from '../src/database/Users/users.service';



class mockUsersService {
  
  createUser(obj:Request){      

  }

  getUsersbyEmail(email:string){
  
  }

}


describe('LoginService', () => {
    let usersService : UsersService;
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
          {
            provide: UsersService,
            useClass: mockUsersService,
          },
        ],
      }).compile();
  
      loginService = module.get(LoginService);
      userRepository = module.get(getRepositoryToken(Users));
      usersService = module.get(UsersService);
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(loginService).toBeDefined();
    });
  

    describe('Login Function Test', ()=>{
      it(' Wrong Login', async () => {

        const testEmail = "test@test.com";

        const testObject = Object({
          Email: testEmail,
        }
        )
         
        const testLoginReq = new LoginRequest;
        testLoginReq.email = testEmail;
        testLoginReq.password = "";

        let testLoginRes = new LoginResponse;
  

        const UserServiceGetByEmailSpy = jest
        .spyOn(usersService, 'getUsersbyEmail')
        .mockResolvedValue(testObject);

  
        testLoginRes = await loginService.login(testLoginReq);
        
        expect(testLoginRes.status).toBe(403);
    
      });

      /*it(' Right Login', async () => {

        const testEmail = "test@test.com";

        const testObject = Object({
          Email: testEmail,
          Password:  "1234",
          userType: "testUser",
        }
        )
         
        const testLoginReq = new LoginRequest;
        testLoginReq.email = testEmail;
        testLoginReq.password = "1234";

        let testLoginRes = new LoginResponse;
  

        const UserServiceGetByEmailSpy = jest
        .spyOn(usersService, 'getUsersbyEmail')
        .mockResolvedValue(testObject);

  
        testLoginRes = await loginService.login(testLoginReq);
        expect(testLoginRes.status).toBe(201);
    
      });*/

      
    });
});
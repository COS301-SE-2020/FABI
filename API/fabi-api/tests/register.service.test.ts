import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from '../src/login-register/register/register.service';
import { UsersService } from '../src/database/Users/users.service';
import {  Response,Request }  from '../src/graphql.schema';
import { Repository } from 'typeorm';
import  Users  from '../src/database/Users/Users.entity';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { assert } from 'console';
import { RequestMethod } from '@nestjs/common';



class mockUsersService {
  
  createUser(obj:Request){      

}

getUsersbyEmail(email:string){

}

 }

describe('RegisterService', () => {
  let registerService: RegisterService;
  let usersService : UsersService;
  let userRepository: Repository<Users>;
  
  beforeAll(async () => {

    const UsersServiceProvider = {
      provide: UsersService,
      useClass: mockUsersService,
    };



    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterService,UsersServiceProvider,{
        provide: getRepositoryToken(Users),
        useValue: Repository,
      },
      {
        provide: UsersService,
        useClass: mockUsersService,
      }
    ],
    }).compile();

    registerService = module.get(RegisterService);
    userRepository = module.get(getRepositoryToken(Users));
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(registerService).toBeDefined();
  });

  describe('Register Function Test', ()=>{
    it('User already exists', async () => {

      const testEmail = "test@test.com";

      const testObject = Object({
        Email: testEmail,
      }
      )
      
      let testRegisterReq = new Request;
      testRegisterReq.email = "test@test.com"

      let testRegisterRes = new Response;


      const UserServiceGetByEmailSpy = jest
      .spyOn(usersService, 'getUsersbyEmail')
      .mockResolvedValue(testObject);



     testRegisterRes= await registerService.register(testRegisterReq);
      
      expect(testRegisterRes.status).toBe(409);
  
    });

    it('New user', async () => {


      const newUser = Users.of({
        Name : "testName",
        Surname: "testSur",
        Email: "testnew@test.com",
        Password: "testpw",
      });
      
      let testRegisterReq = new Request;
      testRegisterReq.email = "testnew@test.com"

      let testRegisterRes = new Response;



      const UserServiceGetByEmailSpy = jest
      .spyOn(usersService, 'getUsersbyEmail')
      .mockResolvedValue(null);


      const UserServiceCreateUserSpy = jest
      .spyOn(usersService, 'createUser')
      .mockResolvedValue(newUser);



     testRegisterRes= await registerService.register(testRegisterReq);
      
      expect(testRegisterRes.status).toBe(201);
 
    });

    
  });

});



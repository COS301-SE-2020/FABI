import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/database/Users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import Users, { UsersRepositoryFake } from '../src/database/Users/Users.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<Users>;




  beforeEach(async () => {




    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: getRepositoryToken(Users),
        useClass: UsersRepositoryFake,
      }],
    }).compile();
    
    userService = module.get(UsersService);
    userRepository = module.get(getRepositoryToken(Users));
  });


  it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
    expect(userService).toBeDefined();
  });


  describe('Finding a User', ()=>{
    it('User not in repo', async () => {

      const testEmail = "test@test.com";
      const userRepositoryFindUserEmailSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      expect.assertions(1);

      try {
        await userService.getUsersbyEmail(testEmail);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('No User with that email found.');
      }
      expect(userRepositoryFindUserEmailSpy).toHaveBeenCalledWith({
        Email: testEmail,
      });
 
    });
    it('User is found', async () => {
      const testEmail = "test@test.com";

      const existingUser = Users.of({
        Name : "testName",
        Surname: "testSur",
        Email: testEmail,
        Password: "testpw",
      });

      const userRepositoryFindUserEmailSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValue(existingUser);




      const result = await userService.getUsersbyEmail(testEmail);
      

      expect(result).toBe(existingUser);
      expect(userRepositoryFindUserEmailSpy).toHaveBeenCalledWith({
        Email: testEmail,
      });


  });

  describe('Create User', () => {
    it('Create User Correctly', async () => {

      const testEmail = "test@test.com";
        
      const insertObject = Object({
        email: testEmail,
        name : "testName",
        userType: "testType",
        surname: "testSur",
        token:   "testToken",
        assword: "testpw",
      });


      const newUser = Users.of({
        Email: testEmail,
        Name : "testName",
        userType: "testType",
        Surname: "testSur",
        token:   "testToken",
        Password: "testpw",
      });

      const userRepositoryCreateUserInsertSpy = jest
      .spyOn(userRepository, 'insert')
      .mockResolvedValue(insertObject);


      const userRepositoryCreateUserFindOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValue(newUser);


      const result = await userService.createUser(insertObject);

      expect(result).toBe(newUser);
      expect(userRepositoryCreateUserFindOneSpy).toHaveBeenCalledWith({
        Email: testEmail,
      });
      
    });
  });
});

});
 
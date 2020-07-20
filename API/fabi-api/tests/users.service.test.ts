import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/database/Users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import Users, { UsersRepositoryFake } from '../src/database/Users/Users.entity';
import { Repository } from 'typeorm';

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

  describe('Finding a User', ()=>{
    it('', async () => {

 
    });
  });

  it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
    expect(userService).toBeDefined();
  });








});
 
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { UsersService } from '../../database/Users/users.service';
import { Repository } from 'typeorm';
import  Users  from './../../database/Users/Users.entity';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { assert } from 'console';



class mockUsersService {
  
  createUser(obj:Request){      
        return {
          status:409,
          token:""
        };
}

getUsersbyEmail(email:string){
  return{
      email:"shaun@naude.com",
      name:"shaun",
      surname:"naude",
      userType:"basic",
      password:"123456",
      token:""

  }
}

 }

describe('RegisterService', () => {
  let service: RegisterService;
  
  beforeAll(async () => {

    const UsersServiceProvider = {
      provide: UsersService,
      useClass: mockUsersService,
    };



    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterService,UsersServiceProvider,{
        provide: getRepositoryToken(Users),
        useValue: Repository,
      }],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});



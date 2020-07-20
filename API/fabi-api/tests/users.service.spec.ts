import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/database/Users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import Users from '../src/database/Users/Users.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {




    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: getRepositoryToken(Users),
        useValue: Repository,
      }],
    }).compile();
    
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
 
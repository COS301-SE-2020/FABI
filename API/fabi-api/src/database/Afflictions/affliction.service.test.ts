import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../Users/Users.entity';
import { UsersService } from '../Users/users.service';
import { create } from 'domain';
import { createHmac } from 'crypto';
import { AfflictionService } from './affliction.service';
import Afflictions, { AfflictionsRepositoryFake } from './affliction.entity';


describe('AfflictionService', () => {
   
    let afflictionService : AfflictionService;
    let afflictionRepository: Repository<Afflictions>;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          AfflictionService,
          {
            provide: getRepositoryToken(Afflictions),
            useClass: AfflictionsRepositoryFake,
          },
        ],
      }).compile();
  
      afflictionService = module.get(AfflictionService);
      afflictionRepository = module.get(getRepositoryToken(Afflictions));
    
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(afflictionService).toBeDefined();
    });
  

});
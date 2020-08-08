import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../Users/Users.entity';
import { UsersService } from '../Users/users.service';
import { create } from 'domain';
import { createHmac } from 'crypto';
import { GetAdminDashService } from './get-admin-dash.service';
import Reports, { ReportRepositoryFake } from '../Report/report.entity';



describe('GetAdminDashService', () => {
   
    let getAdminDashService : GetAdminDashService;
    let reportRepository: Repository<Reports>;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          GetAdminDashService,
          {
            provide: getRepositoryToken(Reports),
            useClass:ReportRepositoryFake,
          },
        ],
      }).compile();
  
      getAdminDashService = module.get(GetAdminDashService);
      reportRepository = module.get(getRepositoryToken(Reports));
    
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(getAdminDashService).toBeDefined();
    });
  

});
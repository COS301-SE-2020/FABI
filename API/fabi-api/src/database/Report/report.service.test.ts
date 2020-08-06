import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../Users/Users.entity';
import { UsersService } from '../Users/users.service';
import { create } from 'domain';
import { createHmac } from 'crypto';
import {ReportService} from './report.service';
import Report, { ReportRepositoryFake } from './report.entity';



class mockUsersService {
  
  createUser(obj:Request){      

  }

  getUsersbyEmail(email:string){
  
  }

}


describe('ReportService', () => {
    let usersService : UsersService;
    let reportService : ReportService;
    let reportRepository: Repository<Report>;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          ReportService,
          {
            provide: getRepositoryToken(Report),
            useClass: ReportRepositoryFake,
          },
          {
            provide: UsersService,
            useClass: mockUsersService,
          },
        ],
      }).compile();
  
      reportService = module.get(ReportService);
      reportRepository = module.get(getRepositoryToken(Report));
      usersService = module.get(UsersService);
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(reportService).toBeDefined();
    });
  

});
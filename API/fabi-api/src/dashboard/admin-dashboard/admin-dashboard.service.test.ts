import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  Users, {UsersRepositoryFake } from '../Users/Users.entity';
import { UsersService } from '../Users/users.service';
import { create } from 'domain';
import { createHmac } from 'crypto';
import { AdminDashboardService } from './admin-dashboard.service';
import { Admin_Dashboard_request } from 'src/graphql.schema';
import { GetAdminDashService } from 'src/database/admin-dashboard/get-admin-dash.service';


class mockGetAdminDashService{
      getLineGraphInfo(reqObj: Admin_Dashboard_request){

      }
    
      async getTableInfo(reqObj: Admin_Dashboard_request){

      }
    
}



class mockUsersService {
  
    createUser(obj:Request){      
  
    }
  
    getUsersbyEmail(email:string){
    
    }
  
  }


describe('AdminDashboardService', () => {
   
    let adminDashboardService : AdminDashboardService;
    let usersService : UsersService;
    let getAdminDashService : GetAdminDashService;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          AdminDashboardService,
          {
            provide: UsersService,
            useClass: mockUsersService,
          },
          {
            provide: GetAdminDashService,
            useClass: mockGetAdminDashService,
          },
        ],
      }).compile();
  
        adminDashboardService = module.get(AdminDashboardService);
        usersService = module.get(UsersService);
        getAdminDashService = module.get(GetAdminDashService);
    
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(adminDashboardService).toBeDefined();
    });
  

});
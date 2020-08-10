import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadRequest } from 'src/graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';
import { GetReportsService } from './get-reports.service';



class mockUsersService {
  
  createUser(obj:Request){      

  }

  getUsersbyEmail(email:string){
  
  }

}

class mockReportService{
    getReports(lat: number, long: number){

   
    }
      
        //Function To get Single report from the DB when given an ID
    getSingleReport(ID:number){
      
    
    }
      
        //function to Insert a new report into the DB
    InsertReport(obj: UploadRequest) {
  
         
    }
      
    
    makeid(): string {
          let text = '';
          const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
          for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
      
          return text;
    }
 
    classify(imageName: string) {
 
    }
}


describe('GetReportsService', () => {
    let getReportsService: GetReportsService
    let usersService : UsersService;
    let reportService : ReportService;

    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          GetReportsService,
          {
            provide: ReportService,
            useClass: mockReportService,
          },
          {
            provide: UsersService,
            useClass: mockUsersService,
          },
        ],
      }).compile();

      getReportsService = module.get(GetReportsService);
      reportService = module.get(ReportService);
      usersService = module.get(UsersService);

    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(getReportsService).toBeDefined();
    });
  

});
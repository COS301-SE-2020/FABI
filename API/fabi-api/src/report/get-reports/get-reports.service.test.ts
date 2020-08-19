import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadRequest, GetReportsRequest, GetReportsResponse, GetSingleReportRequest } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { GetReportsService } from './get-reports.service';



class mockUsersService {
  
  createUser(obj:Request){      

  }

  getUsersbyEmail(email:string){
  
  }

  validateToken(token:string) {
      if(token === "testtokenfalse"){
        return false;
      }
      if(token === "testtokentrue"){
        return true;
      }

  }

  getEmail(token:string){

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

    describe('GetReports Function Test', ()=>{
      it('Unsuccessfull GetReports', async () => {

    
         
        const testGetReportRequest = new GetReportsRequest;
        testGetReportRequest.token = "testtokenfalse";
        testGetReportRequest.longitude= 50.00;
        testGetReportRequest.latitude= 50.00;

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(false);

        let testGetReportResponse = new GetReportsResponse;
        
  
        testGetReportResponse = await getReportsService.getReports(testGetReportRequest);
        
        expect(testGetReportResponse.status).toBe(415);
    
      });

      it('Succesfull GetReports', async () => {

        const testObject = Object({
          testReportObject: "testReportObjecxt"
        }
        )
         
        const testGetReportRequest = new GetReportsRequest;
        testGetReportRequest.token = "testtokentrue";
        testGetReportRequest.longitude= 50.00;
        testGetReportRequest.latitude= 50.00;

        let testGetReportResponse = new GetReportsResponse;

        const spyReportService = jest
        .spyOn(reportService, 'getReports')
        .mockResolvedValue(testObject);

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(true);
        
  
        testGetReportResponse = await getReportsService.getReports(testGetReportRequest);
        
        expect(testGetReportResponse.status).toBe(201);
    
      });

      
    });

    describe('GetSingleReports Function Test', ()=>{
      it('Unsuccessfull GetSingleReports', async () => {

        const testObject = Object({
          testReportObject: "testReportObjecxt"
        }
        )
         
        const testGetSingleReportRequest = new GetSingleReportRequest;
        testGetSingleReportRequest.token = "testtokenfalse";
        testGetSingleReportRequest.reportID = 1111;
    

        let testGetReportResponse = new GetReportsResponse;

        const spyReportService = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(false);
        
  
        testGetReportResponse = await getReportsService.getSingleReports(testGetSingleReportRequest);
        
        expect(testGetReportResponse.status).toBe(415);
    
    
      });

      it('Succesfull GetSingleReports', async () => {

        const testObject = Object({
          testReportObject: "testReportObjecxt"
        }
        )
         
        const testGetSingleReportRequest = new GetSingleReportRequest;
        testGetSingleReportRequest.token = "testtokentrue";
        testGetSingleReportRequest.reportID = 1111;
    

        let testGetReportResponse = new GetReportsResponse;

        const spyReportService = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(true);
        
  
        testGetReportResponse = await getReportsService.getSingleReports(testGetSingleReportRequest);
        
        expect(testGetReportResponse.status).toBe(201);
    
      });

      
    });

  

});
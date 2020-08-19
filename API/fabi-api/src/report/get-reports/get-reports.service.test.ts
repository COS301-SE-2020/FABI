import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadRequest, GetReportsRequest, GetReportsResponse, GetSingleReportRequest, GetSingleReportResponse, PopTableRequest } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { GetReportsService } from './get-reports.service';
import { PopulateTableService } from '../populate-table/populate-table.service';



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

class mockPopulateTableService {
  populateTableService(reqObj: PopTableRequest){
    
  }

  calcDistance(lat1: number, long1: number, lat2: number, long2: number){

  
  }

//takes value to radians
  toRad(Value: number){
   
  }


}


describe('GetReportsService', () => {
    let getReportsService: GetReportsService
    let usersService : UsersService;
    let reportService : ReportService;
    let populateTableService: PopulateTableService;
    
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
          {
            provide: PopulateTableService,
            useClass: mockPopulateTableService,
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

        const testObject = Object({
          reportID: 1234,
          email: "test@test.com",
          form: "testform",
          IMG1: "testimg1",
          IMG2: "testimg2",
          IMG3: "testimg3",
          Long :50.00,
          Lat : 50.00,
          Pname: "testPname",
          Infliction: "testAffliction",
          Accuracy: 1,
          Pscore: 1,
          date: 112233,
          urgency: 1,
          diagnosis: 1,
        }
        )

    
         
        const testGetReportRequest = new GetReportsRequest;
        testGetReportRequest.token = "testtokenfalse";
        testGetReportRequest.longitude= 50.00;
        testGetReportRequest.latitude= 50.00;

        const spyReportService = jest
        .spyOn(reportService, 'getReports')
        .mockResolvedValue(testObject);


        const spyReportService2 = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(false);


        
        let testGetSingleReportResponseArray : GetSingleReportResponse[];         
        let testGetSingleReportResponse = new GetSingleReportResponse;
  
        testGetSingleReportResponseArray = await getReportsService.getReports(testGetReportRequest);
        
        expect(testGetSingleReportResponseArray[0].status).toBe(415);
    
      });

      it('Succesfull GetReports', async () => {

        const testObject = Object({
          reportID: 1234,
          email: "test@test.com",
          form: "testform",
          IMG1: "testimg1",
          IMG2: "testimg2",
          IMG3: "testimg3",
          Long :50.00,
          Lat : 50.00,
          Pname: "testPname",
          Infliction: "testAffliction",
          Accuracy: 1,
          Pscore: 1,
          date: 112233,
          urgency: 1,
          diagnosis: 1,
        }
        )


        const testObject2 = Object([{
          reportID: 1234,
          email: "test@test.com",
          form: "testform",
          IMG1: "testimg1",
          IMG2: "testimg2",
          IMG3: "testimg3",
          Long :50.00,
          Lat : 50.00,
          Pname: "testPname",
          Infliction: "testAffliction",
          Accuracy: 1,
          Pscore: 1,
          date: 112233,
          urgency: 1,
          diagnosis: 1,
        },
        ]
        )

    
         
        const testGetReportRequest = new GetReportsRequest;
        testGetReportRequest.token = "testtokentrue";
        testGetReportRequest.longitude= 50.00;
        testGetReportRequest.latitude= 50.00;

        const spyReportService = jest
        .spyOn(reportService, 'getReports')
        .mockResolvedValue(testObject2);

        const spyReportService2 = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);


        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(true);


        
        let testGetSingleReportResponseArray : GetSingleReportResponse[];         
        let testGetSingleReportResponse = new GetSingleReportResponse;
  
        testGetSingleReportResponseArray = await getReportsService.getReports(testGetReportRequest);
        
        expect(testGetSingleReportResponseArray[0].status).toBe(201);
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
    

        let testGetSingleReportResponse = new GetSingleReportResponse;

        const spyReportService = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(false);
        
  
        testGetSingleReportResponse = await getReportsService.getSingleReports(testGetSingleReportRequest);
        
        expect(testGetSingleReportResponse.status).toBe(415);
    
    
      });

      it('Succesfull GetSingleReports', async () => {

        const testObject = Object({
          reportID: 1234,
          email: "test@test.com",
          form: "testform",
          IMG1: "testimg1",
          IMG2: "testimg2",
          IMG3: "testimg3",
          Long :50.00,
          Lat : 50.00,
          Pname: "testPname",
          Infliction: "testAffliction",
          Accuracy: 1,
          Pscore: 1,
          date: 112233,
          urgency: 1,
          diagnosis: 1,
        }
        )


        const testObject2 = Object([{
          reportID: 1234,
          email: "test@test.com",
          form: "testform",
          IMG1: "testimg1",
          IMG2: "testimg2",
          IMG3: "testimg3",
          Long :50.00,
          Lat : 50.00,
          Pname: "testPname",
          Infliction: "testAffliction",
          Accuracy: 1,
          Pscore: 1,
          date: 112233,
          urgency: 1,
          diagnosis: 1,
        },
        ]
        )

    
         
        const testGetSingleReportRequest = new GetSingleReportRequest;
        testGetSingleReportRequest.token = "testtokentrue";
        testGetSingleReportRequest.reportID = 11;
      

        const spyReportService = jest
        .spyOn(reportService, 'getReports')
        .mockResolvedValue(testObject2);

        const spyReportService2 = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject2);


        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(true);


        
        let testGetSingleReportResponseArray : GetSingleReportResponse[];         
        let testGetSingleReportResponse = new GetSingleReportResponse;
  
        testGetSingleReportResponse = await getReportsService.getSingleReports(testGetSingleReportRequest);
        
        expect(testGetSingleReportResponse.status).toBe(201);
     
    
      });

      
    });

  

});
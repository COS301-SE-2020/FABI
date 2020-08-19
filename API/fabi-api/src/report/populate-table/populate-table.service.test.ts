import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadRequest, PopTableRequest, PopTableResponse } from '../../graphql.schema';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { PopulateTableService } from './populate-table.service';



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


describe('PopulateTableService', () => {
    let populateTableService: PopulateTableService;
    let usersService : UsersService;
    let reportService : ReportService;

    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          PopulateTableService,
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

      populateTableService = module.get(PopulateTableService);
      reportService = module.get(ReportService);
      usersService = module.get(UsersService);

    });


    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(PopulateTableService).toBeDefined();
    });


    describe('PopulateTableService Function Test', ()=>{
      it('Unsuccessfull PopulateTableService', async () => {

        const testObject = Object({
          testReportObject: "testReportObjecxt"
        }
        )
         
        const testPopTableRequest = new PopTableRequest;
        testPopTableRequest.token = "testtokenfalse"
        testPopTableRequest.reportID = 1111;
    

        let testPopTableResponseArray : PopTableResponse[];            ;
        let testPopTableReponse = new PopTableResponse();
        const spyReportService = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);

        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(false);
        
  
        testPopTableResponseArray = await populateTableService.populateTableService(testPopTableRequest);
        expect(testPopTableResponseArray[0].status).toBe(415);
    
    
      });

      it('Succesfull PopulateTableService', async () => {
        
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
         
        const testPopTableRequest = new PopTableRequest;
        testPopTableRequest.token = "testtokentrue"
        testPopTableRequest.reportID = 1111;
    

        let testPopTableResponseArray : PopTableResponse[];            ;
        let testPopTableReponse = new PopTableResponse();
        const spyReportService = jest
        .spyOn(reportService, 'getSingleReport')
        .mockResolvedValue(testObject);

        const spyReportService2 = jest
        .spyOn(reportService, 'getReports')
        .mockResolvedValue(testObject);


        const spyUserService = jest
        .spyOn(usersService, 'validateToken')
        .mockResolvedValue(true);
        
  
        //testPopTableResponseArray = await populateTableService.populateTableService(testPopTableRequest);
      //  expect(testPopTableResponseArray[0].status).toBe(201);
    
    
    
      });

      
    });
  

});
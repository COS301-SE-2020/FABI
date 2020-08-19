import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Update_afflictions_request, Add_Affliction_Request, Delete_Affliction_Request } from 'src/graphql.schema';
import  {UsersService}  from  '../../database/Users/users.service';
import { AfflictionService } from '../../database/Afflictions/affliction.service';
import { GetAfflictionsService } from './get-afflictions.service';


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


class mockAfflictionService {
  
    getAfflictions(typeInput: string) {
      
      }
    
      updateAfflictions(reqobj: Update_afflictions_request, keys: string[]) {



       }
    

    
     
     getSingleAffliction(givenID: number) {
    

      }
    
     addAffliction(reqObj: Add_Affliction_Request){
 
    
    
      }
    
      deleteAffliction(reqObj: Delete_Affliction_Request){
    

        
      }

  
}
  


describe('GetAfflictionService', () => {
    let getAfflictionsService: GetAfflictionsService;
    let usersService : UsersService;
    let afflictionService : AfflictionService;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          GetAfflictionsService,
          {
            provide: UsersService,
            useClass: mockUsersService,
          },
          {
            provide: AfflictionService,
            useClass: mockAfflictionService,
          },
        ],
      }).compile();
      
      getAfflictionsService = module.get(GetAfflictionsService);
      usersService = module.get(UsersService);
      afflictionService = module.get(AfflictionService);
     
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(getAfflictionsService).toBeDefined();
    });

  

});
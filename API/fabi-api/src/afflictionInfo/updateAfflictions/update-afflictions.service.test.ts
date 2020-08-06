import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Update_afflictions_request, Add_Affliction_Request, Delete_Affliction_Request } from 'src/graphql.schema';
import  {UsersService}  from  '../../database/Users/users.service';
import { AfflictionService } from '../../database/Afflictions/affliction.service';
import { UpdateAfflictionsService } from './update-afflictions.service';


class mockUsersService {
  
  createUser(obj:Request){      

  }

  getUsersbyEmail(email:string){
  
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
  


describe('UpdateAfflictionService', () => {
    let updateAfflictionsService: UpdateAfflictionsService;
    let usersService : UsersService;
    let afflictionService : AfflictionService;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          UpdateAfflictionsService,
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
      
      updateAfflictionsService = module.get(UpdateAfflictionsService);
      usersService = module.get(UsersService);
      afflictionService = module.get(AfflictionService);
     
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(updateAfflictionsService).toBeDefined();
    });
  

});
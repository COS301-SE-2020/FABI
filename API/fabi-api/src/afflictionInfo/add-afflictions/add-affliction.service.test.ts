import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Update_afflictions_request, Add_Affliction_Request, Delete_Affliction_Request } from 'src/graphql.schema';
import { AddAfflictionService } from './add-affliction.service';
import  {UsersService}  from '../../database/Users/users.service';
import { AfflictionService } from '../../database/Afflictions/affliction.service';


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
  


describe('AddAfflictionService', () => {
    let addAfflictionService: AddAfflictionService;
    let usersService : UsersService;
    let afflictionService : AfflictionService;
    
    beforeEach(async () => {


      const module: TestingModule = await Test.createTestingModule({
        providers: [


          AddAfflictionService,
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
      
      addAfflictionService = module.get(AddAfflictionService);
      usersService = module.get(UsersService);
      afflictionService = module.get(AfflictionService);
     
    });

    it('should be defined', () => {   //TEST 1 SHALLOW TEST SEE IF IT IS DEFINED
      expect(addAfflictionService).toBeDefined();
    });
  

});
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DeleteAfflictionsService } from './delete-afflictions.service';
import { Delete_Affliction_Request, Delete_Affliction_Response } from '../../graphql.schema';

@Resolver('DeleteAfflictions')
export class DeleteAfflictionsResolver {
     //Here we define the service that handels the requested object
     constructor(
        private deleteAfflictionService: DeleteAfflictionsService
    ){}

    //This is the mutation that is exposed to the front-end 
    @Mutation('deleteAffliction')
    async delete_afflictions(@Args('request') reqObj: Delete_Affliction_Request) : Promise<Delete_Affliction_Response>{
        
        //Pass our request to service which will validate token and build response
        return this.deleteAfflictionService.deleteAfflictions(reqObj);
    }

}

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AddAfflictionService } from './add-affliction.service';
import { Add_Affliction_Request, Add_Affliction_Response } from '../../graphql.schema';

@Resolver('AddAfflictions')
export class AddAfflictionsResolver {

    //Here we define the service that handels the requested object
    constructor(
        private addAfflictionService: AddAfflictionService
    ){}

    //This is the mutation that is exposed to the front-end 
    @Mutation('addAffliction')
    async get_afflictions(@Args('request') reqObj: Add_Affliction_Request) : Promise<Add_Affliction_Response>{
        
        //Pass our request to service which will validate token and build response
        return this.addAfflictionService.addAfflictions(reqObj);
    }
}

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PopulateTableService } from './populate-table.service';
import { PopTableRequest, PopTableResponse } from '../../graphql.schema';


@Resolver('PopulateTable')
export class PopulateTableResolver {
    
    constructor(
        private PopulateTableService:PopulateTableService,
    ){}

@Mutation('popTableBasicUser')
async popTableBasicUser(@Args('request') reqObj: PopTableRequest  ): Promise<PopTableResponse[]>{

    return this.PopulateTableService.populateTableService(reqObj);
}

}

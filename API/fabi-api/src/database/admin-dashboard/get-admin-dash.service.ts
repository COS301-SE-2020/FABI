import { Injectable } from '@nestjs/common';
import {Admin_Dashboard_request,Admin_Dashboard_response}  from '../../graphql.schema';

@Injectable()
export class GetAdminDashService {

    async getLineGraphInfo(typeInput: Admin_Dashboard_request): Promise<Admin_Dashboard_response> {
        
        const res : Admin_Dashboard_response = {data:"Some data"};
    
        return res;
      }


}

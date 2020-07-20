import { Injectable } from '@nestjs/common';
import { UploadResponse, UploadRequest } from 'src/graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';

@Injectable()
export class UploadService {

    res: UploadResponse = {status:0}

    constructor(
        private userService: UsersService,
        private reportService : ReportService,
    ){}

    async upload(reqObj:UploadRequest):Promise<UploadResponse>{
        const result = await this.userService.validateToken(reqObj.token).then(function(result){
            return result;
        })
        if(result==false){
            this.res.status = 415;
            return this.res;
        }else{
            //this will pass upload object to report service that will interact with db
            this.reportService.InsertReport(reqObj);
            this.res.status = 201;
            return this.res;
        }
        
    }
}

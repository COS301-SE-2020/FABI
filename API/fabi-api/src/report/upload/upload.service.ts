import { Injectable } from '@nestjs/common';
import { UploadResponse, UploadRequest } from 'src/graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { ReportService } from 'src/database/Report/report.service';

@Injectable()
export class UploadService {

    res: UploadResponse = {email:"", status:0}

    constructor(
        private userService: UsersService,
        private reportService : ReportService,
    ){}

    async upload(reqObj:UploadRequest):Promise<UploadResponse>{
        console.log(reqObj);
        const result = await this.userService.validateToken(reqObj.email,reqObj.token).then(function(result){
            return result;
        })
        if(result==false){
            this.res.email = reqObj.email;
            this.res.status = 415;
            return this.res;
        }else{
            //this will pass upload object to report service that will interact with db
            this.reportService.InsertReport(reqObj);
            this.res.email = reqObj.email;
            this.res.status = 201;
            return this.res;
        }
        
    }
}

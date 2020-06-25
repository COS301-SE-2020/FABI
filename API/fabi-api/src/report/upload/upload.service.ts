import { Injectable } from '@nestjs/common';
import { UploadResponse, UploadRequest } from 'src/graphql.schema';
import { UsersService } from 'src/database/Users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/database/Users/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {

    res: UploadResponse = {email:"", status:0}

    constructor(
        private userService: UsersService,

        @InjectRepository(Users)
        private UsersRepository:Repository<Users>
        
    ){}

    async upload(reqObj:UploadRequest):Promise<UploadResponse>{
        const result = await this.userService.validateToken(reqObj.email,reqObj.token).then(function(result){
            console.log(result);
            return result;
        })
        if(result==false){
            this.res.email = reqObj.email;
            this.res.status = 415;
            return this.res;
        }else{

            
            return this.res;
        }
        
    }
}

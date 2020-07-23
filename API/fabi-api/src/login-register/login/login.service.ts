import { Injectable } from '@nestjs/common';
import {  LoginResponse,LoginRequest }  from '../../graphql.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../../database/Users/users.service';
import {createHmac} from 'crypto'
import Users from '../../database/Users/Users.entity';
import { Repository } from 'typeorm';




@Injectable()
export class LoginService {

    res: LoginResponse = {email:"", token:"",status: 1, Usertype: ""};

    constructor(
        private userService: UsersService,

        @InjectRepository(Users)
        private UsersRepository: Repository<Users>
        
    ){}

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }



    async  login(reqObj:LoginRequest):Promise<LoginResponse> {
     
        const result = await this.userService.getUsersbyEmail(reqObj.email).then(function(result){
            
            return result;
        })

        if(result){

            if(reqObj.password == result.Password ){
                
                let hashtoken = createHmac("sha256",(result.Email+this.makeid())).digest('base64');
                result.token = hashtoken;
                this.UsersRepository.update(result.Email,result);
                
                this.res.email = result.Email;
                this.res.status = 201;
                this.res.token = hashtoken;
                this.res.Usertype = result.userType;

                return this.res;
            }else{
                this.res.status = 403;
                this.res.token = "";
                this.res.email = result.Email;
    
                return this.res;
            }
        

        }else{
            this.res.status = 411;
            this.res.token = "";
            this.res.email = result.Email;

            return this.res;
        }

    }
}

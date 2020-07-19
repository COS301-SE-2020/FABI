import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import  Users  from './Users.entity';
import { Repository } from 'typeorm';
import {  Request }  from '../../graphql.schema';
import {createHmac} from 'crypto'




@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private UsersRepository: Repository<Users>
      ) {}

      async getUsersbyEmail(email: string): Promise<Users>{

       const User = await this.UsersRepository.findOne({Email:email});
        return User;

      }

      async validateToken(token:string): Promise<boolean>{
        const User = await this.UsersRepository.findOne({token:token});
        if(User){
          return true;
        }else{
          return false;
        }

      }

      async getEmail(token:string): Promise<string>{
        const User = await this.UsersRepository.findOne({token:token});
          return User.Email;
      }

      async createUser(obj:Request): Promise<Users> {
        //create token
        let hashtoken = createHmac("sha256",(obj.email+this.makeid())).digest('base64');
        //Insert user new User
        this.UsersRepository.insert({Email:obj.email,Name:obj.name,userType:obj.userType,Surname:obj.surname,token:hashtoken,Password:obj.password});
        //Return newly inserted user
        return this.UsersRepository.findOne({Email:obj.email});
      } 

      //Helper function to generate random salt for token
       makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }


}
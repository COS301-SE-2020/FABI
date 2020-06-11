import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import  Users  from './Users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(Users)
        private UsersRepository: Repository<Users>
      ) {}

      async getAllUsers() :Promise<Users[]> {
        return await this.UsersRepository.query("SELECT * FROM USERS;");
      }

      async getUsersbyEmail(email: string): Promise<Users>{
         
        //const User = await this.UsersRepository.findOne({Email:email});
       // let usr = "Users";
       // const User =  await this.UsersRepository.query("SELECT * FROM "+'"'+usr+'"'+";");
       const User = await this.UsersRepository.findOne({Email:email});
        console.log(User);
        console.log("awez");
        console.log("awez");
        return User;
        //if (User) {
        //  return User;
       // }
        //throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from './Users.entity';
import { Repository } from 'typeorm';
import { Request } from '../../graphql.schema';
import { createHmac } from 'crypto'




@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private UsersRepository: Repository<Users>
  ) { }

  async getUsersbyEmail(email: string): Promise<Users> {

    const User = await this.UsersRepository.findOne({ Email: email });
    return User;

  }

  async getUserType(token: string): Promise<string> {

    var result = await this.UsersRepository.findOne({ token: token });

    if (Object.keys(result).length == 0) {
      return ""
    }
    return result.userType;
  }

  async validateToken(token: string): Promise<boolean> {
    const User = await this.UsersRepository.findOne({ token: token });
    if (User) {
      return true;
    } else {
      return false;
    }

  }

  async getEmail(token: string): Promise<string> {
    const User = await this.UsersRepository.findOne({ token: token });
    return User.Email;
  }

  async getSpecialUsers(): Promise<Users[]>{
    return await this.UsersRepository.find({userType:"special"});
  }

  async getBasicUsers(): Promise<Users[]>{
    return await this.UsersRepository.find({userType:"basic"});
  }

  async updateUser(email:string,userType:string): Promise<boolean>{
    try {
      await this.UsersRepository.query("update users set \"userType\"=\'"+userType+"\' where \"Email\" = \'"+email+"\';");
      return true;
    } catch (error) {
      return false;
    }

  }

  async createUser(obj: Request): Promise<Users> {
    //create token
    let hashtoken = createHmac("sha256", (obj.email + this.makeid())).digest('base64');
    //Hash password
    let hashedPassword = createHmac("sha512", (obj.password)).digest('hex');
    //Insert user new User
    this.UsersRepository.insert({ Email: obj.email, Name: obj.name, userType: obj.userType, Surname: obj.surname, token: hashtoken, Password: hashedPassword, company_id: 1, registered: "no" });
    //Return newly inserted user
    return this.UsersRepository.findOne({ Email: obj.email });
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
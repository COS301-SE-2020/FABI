import { Column, Entity, PrimaryColumn} from 'typeorm';
 
@Entity({database:"Users"})
class Users {
  
  @Column()
  public Name: string;
 
  @Column()
  public Surname: string;

  @PrimaryColumn()
  public Email: string;

  @Column()
  public Password: string;

  @Column()
  public token: string;

  @Column()
  public userType: string;
}
 
export default Users;

export class UsersRepositoryFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async insert(): Promise<void> {}
  public async remove(): Promise<void> {}
  public async findOne(): Promise<void> {}
}
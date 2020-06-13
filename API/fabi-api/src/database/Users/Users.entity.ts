import { Column, Entity, PrimaryColumn } from 'typeorm';
 
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
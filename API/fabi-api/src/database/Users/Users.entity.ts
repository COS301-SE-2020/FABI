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

  @Column()
  public comapny_id: number;

  @Column()
  public company_role: string;

  @Column()
  public registered: string;

}
 
export default Users;
import { Column, Entity, PrimaryColumn } from 'typeorm';
 
@Entity({database:"Users"})
class Users {
  @PrimaryColumn()
  public UserID: number;
 
  @Column()
  public Name: string;
 
  @Column()
  public Surname: string;

  @Column()
  public Email: string;

  @Column()
  public Password: string;
}
 
export default Users;
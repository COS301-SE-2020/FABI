import {Column, Entity, PrimaryColumn, Generated} from 'typeorm';

@Entity({database:"Reports"})
class Reports {
    @PrimaryColumn()
    @Generated("increment")
    public reportID: number;

    @Column()
    public email: string;

    @Column()
    public form: string;

    @Column()
    public IMG1: string;

    @Column()
    public IMG2: string;

    @Column()
    public IMG3: string;

    @Column({type:"double precision"})
    public Long: number;

    @Column({type:"double precision"})
    public Lat: number;

    @Column()
    public Pname: string;

    @Column()
    public Infliction: string;

    @Column()
    public Accuracy: number;

    @Column()
    public Pscore: number;


}

export default Reports;
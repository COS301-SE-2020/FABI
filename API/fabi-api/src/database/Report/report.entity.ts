import {Column, Entity, PrimaryColumn, Generated} from 'typeorm';
import { json } from 'sequelize';

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

    @Column({nullable:true})
    public date: number;

    @Column({nullable:true})
    public urgency: number;

    @Column({nullable:true})
    public diagnosis: number;

    @Column({nullable:true})
    public diagnoser:string

    @Column({nullable:true})
    public verification:string

    @Column({nullable:true})
    public tags:string

    @Column({nullable:true})
    public reason:string

    @Column({nullable:true})
    public comment:string

    @Column({nullable:true})
    public prediagnosis:string

}

export default Reports;
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


}

export default Reports;

export class ReportRepositoryFake {
    public create(): void {}
    public async save(): Promise<void> {}
    public async insert(): Promise<void> {}
    public async remove(): Promise<void> {}
    public async findOne(): Promise<void> {}
    public async update(): Promise<void> {}
    public async query(): Promise<void> {}
  }
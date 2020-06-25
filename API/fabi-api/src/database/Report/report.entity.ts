import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity({database:"Reports"})
class Reports {
    @PrimaryColumn()
    public reportID: string;

    @Column()
    public emails: string;

    @Column()
    public form: string;

    @Column()
    public IMG1: string;

    @Column()
    public IMG2: string;

    @Column()
    public IMG3: string;

}

export default Reports;
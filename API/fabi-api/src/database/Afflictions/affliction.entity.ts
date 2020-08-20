/*
 * File Name: affliction.entity.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : <Inputs if any, otherwise state None>
 * Output                         : <Outputs if any, otherwise state None>
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : <List any classes contained>
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            :0.0.1
 *            Author:             :Shaun Naude - shaunnaude20@gmail.com
 *            Creation Date:      :Monday, July 20th 2020, 10:28:41 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This file depicts/models our tabel within the database
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */





import {Column, Entity, PrimaryColumn, Generated} from 'typeorm';

@Entity({database:"Afflictions"})
class Afflictions {
    @PrimaryColumn()
    @Generated("increment")
    public id: number;

    @Column()
    public type: string;

    @Column()
    public SciName: string;

    @Column()
    public CommonName: string;

    @Column()
    public plant: string;

    @Column()
    public distribution: string;

    @Column()
    public status: string;

    @Column()
    public description: string;

    @Column()
    public symptoms: string;

    @Column()
    public management: string;

    @Column()
    public img1: string;

    @Column()
    public img2: string;

    @Column()
    public img3: string;


}

export default Afflictions;


export class AfflictionsRepositoryFake {
    public create(): void {}
    public async save(): Promise<void> {}
    public async insert(): Promise<void> {}
    public async remove(): Promise<void> {}
    public async findOne(): Promise<void> {}
    public async update(): Promise<void> {}
    public async query(): Promise<void> {}
  }
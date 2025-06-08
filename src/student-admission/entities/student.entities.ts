import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CoreEntity } from './core.entities';
import { AcademicInfo } from './academic-info.entities';
import { BankDetails } from './bank-details.entities';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

@Entity()
export class Student extends CoreEntity {
  
  
  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'date' })
  dob: string;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => AcademicInfo, academic => academic.student, { cascade: true })
  academicInfo: AcademicInfo[];

  @OneToMany(() => BankDetails, bank => bank.student, { cascade: true })
  bankDetails: BankDetails[];
}

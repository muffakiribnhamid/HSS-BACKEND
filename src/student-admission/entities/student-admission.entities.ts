import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'studentAdmission' })
export class StudentAdmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  fullName: string;

  @Column()
  motherName: string;

  @Column()
  fatherName: string;

  @Column()
  address: string;

  @Column({ type: 'date' })
  dob: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  contact: string;

  @Column()
  gradeApplyingFor: string;

  @Column()
  previousSchool: string;

  @Column()
  lastGradeCompleted: string;

  @Column({ type: 'text' })
  shortIntroduction: string;

  @Column()
  accountHolderName: string;

  @Column({ type: 'bigint', unique: true })
  accountNumber: string;

  @Column()
  bankName: string;

  @Column({ unique: true })
  IFSCCode: string;

  @Column()
  photo: string;

  @Column()
  marksheet: string;

  @Column()
  aadhaarCard: string;

  @Column({ default: true })
  activeStatus: boolean;

  @Column({default: false})
  isDelete: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

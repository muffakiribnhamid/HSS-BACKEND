import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'studentAdmission' })
export class StudentAdmission {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  email: string;

  @Column()
  phone: string;

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

  @Column()
  accountNumber: number;

  @Column()
  bankName: string;

  @Column()
  IFSCCode: string;

  @Column()
  photo: string;

  @Column()
  marksheet: string;

  @Column()
  aadhaarCard: string;
}

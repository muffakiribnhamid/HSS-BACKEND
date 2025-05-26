import { Entity, Column, ManyToOne } from 'typeorm';
import { CoreEntity } from './core.entities';
import { Student } from './student.entities';

@Entity()
export class BankDetails extends CoreEntity {
  @Column()
  accountHolderName: string;

  @Column()
  accountNumber: string;

  @Column()
  bankName: string;

  @Column()
  IFSCCode: string;

  @ManyToOne(() => Student, student => student.bankDetails)
  student: Student;
}

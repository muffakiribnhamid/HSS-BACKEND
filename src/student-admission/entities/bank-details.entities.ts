import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column({ type: 'uuid' })
  studentId: string;

  // Relation to Student
  @ManyToOne(() => Student, student => student.bankDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;
}

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CoreEntity } from './core.entities';
import { Student } from './student.entities';

@Entity()
export class AcademicInfo extends CoreEntity {
  @Column()
  gradeApplyingFor: string;

  @Column()
  previousSchool: string;

  @Column()
  shortIntroduction: string;

  @Column({ type: 'uuid' })
  studentId: string;
  
  @ManyToOne(() => Student, student => student.academicInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;
}

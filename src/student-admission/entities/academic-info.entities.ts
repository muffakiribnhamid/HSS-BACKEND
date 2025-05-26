import { Entity, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Student, student => student.academicInfo)
  student: Student;
}

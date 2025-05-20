import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
@Entity({ name: 'StudentsRecord' })
export class StudentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roll: string;

  @Column()
  class: string;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  activeStatus: Boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

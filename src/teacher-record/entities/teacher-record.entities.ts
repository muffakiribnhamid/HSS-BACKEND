import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'TeachersRecord' })
export class TeacherRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contact: string;

  @Column({ default: true })
  activeStatus: Boolean;

  @CreateDateColumn({ default: Timestamp })
  createdAt: Timestamp;

  @UpdateDateColumn({ default: Timestamp })
  updatedAt: Timestamp;
}

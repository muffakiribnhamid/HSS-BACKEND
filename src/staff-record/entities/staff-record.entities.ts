import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  PROFESSOR = 'PROFESSOR',
  TEACHER = 'TEACHER',
  OTHER = 'OTHER',
}

@Entity({ name: 'StaffRecord' })
export class StaffRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column({ unique: true })
  contact: string;

  @Column({
    type: 'enum',
    enum: Role
  })
  role: Role;


  @Column({ default: true })
  activeStatus: boolean;

  @Column({default: false})
  isDelete: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

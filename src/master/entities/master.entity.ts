import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'master' })
export class Master {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}

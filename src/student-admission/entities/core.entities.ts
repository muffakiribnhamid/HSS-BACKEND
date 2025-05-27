import { PrimaryGeneratedColumn, Column, UpdateDateColumn, Timestamp, CreateDateColumn } from 'typeorm';

export abstract class CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ default: false })
  isApprove: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

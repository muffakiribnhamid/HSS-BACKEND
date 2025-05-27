import { Student } from './student-admission/entities/student.entities.js';
import { DataSource } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AcademicInfo } from './student-admission/entities/academic-info.entities.js';
import { BankDetails } from './student-admission/entities/bank-details.entities.js';
import { StaffRecord } from './staff-record/entities/staff-record.entities.js';
import { Master } from './master/entities/master.entity.js';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Auth, Master, Student, AcademicInfo, BankDetails, StaffRecord],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

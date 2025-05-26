import { StudentAdmission } from './student-admission/entities/student-admission.entities';
import { DataSource } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Auth, StudentAdmission],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

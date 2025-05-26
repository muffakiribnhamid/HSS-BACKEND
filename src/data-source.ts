import { Student } from './student-admission/entities/student.entities.js';
import { DataSource } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Auth, Student],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

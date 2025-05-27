import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entities';
import { AcademicInfo } from './entities/academic-info.entities';
import { BankDetails } from './entities/bank-details.entities';
import { StudentAdmissionService } from './student-admission.service';
import { StudentAdmissionController } from './student-admission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, AcademicInfo, BankDetails])
  ],
  providers: [StudentAdmissionService],
  controllers: [StudentAdmissionController],
})
export class StudentAdmissionModule {}

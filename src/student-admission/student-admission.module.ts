import { Module } from '@nestjs/common';
import { StudentAdmissionService } from './student-admission.service';
import { StudentAdmissionController } from './student-admission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentAdmission } from './entities/student-admission.entities';

@Module({
   imports: [TypeOrmModule.forFeature([StudentAdmission])], 
  controllers: [StudentAdmissionController],
  providers: [StudentAdmissionService],
})
export class StudentAdmissionModule {}

import { AdmissionDto } from './dto/student-admission.dto';
import { StudentAdmission } from './entities/student-admission.entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentAdmissionService {
  constructor(
    @InjectRepository(StudentAdmission)
    private readonly repo: Repository<StudentAdmission>,
  ) {}

  async create(admissionDetails: AdmissionDto) {
    const admission = this.repo.create({
      ...admissionDetails,
      createdAt: new Date().toISOString(),
    });
    return await this.repo.save(admission);
  }

  async update(id: string, admissionDetails: AdmissionDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Student admission with ID ${id} not found.`);
    }

    const updated = this.repo.merge(existing, {
      ...admissionDetails,
      updatedAt: new Date().toISOString(),
    });

    return await this.repo.save(updated);
  }

  async findOne(id: string) {
    const student = await this.repo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student admission with ID ${id} not found.`);
    }
    return student;
  }

  async getAll() {
    return await this.repo.find();
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Student admission with ID ${id} not found.`);
    }
    await this.repo.delete(id);
    return { message: `Student admission with ID ${id} deleted.` };
  }

  async removeAll(): Promise<{ message: string }> {
    await this.repo.clear();
    return { message: 'All student admission records deleted successfully.' };
  }
}

// import { AdmissionDto } from './dto/student-admission.dto';
// import { StudentAdmission } from './entities/student-admission.entities';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class StudentAdmissionService {
//   constructor(
//     @InjectRepository(StudentAdmission)
//     private readonly repo: Repository<StudentAdmission>,
//   ) {}

//   async create(admissionDetails: AdmissionDto) {
//     const res = this.repo.create({
//       ...admissionDetails,
//       createdAt: new Date().toISOString(),
//     });
//     return this.repo.save(res);
//   }

//   async update(id: number, admissionDetails: AdmissionDto) {
//     return await this.repo.update(id, {
//       ...admissionDetails,
//       updatedAt: new Date().toISOString(),
//     });
//   }

//   async findOne(id: number) {
//     return await this.repo.findOne({ where: { id } });
//   }

//   async getAll() {
//     return await this.repo.find({});
//   }

//   async remove(id: number) {
//     return await this.repo.delete(id);
//   }

//   async removeAll(): Promise<{ message: string }> {
//     await this.repo.clear();
//     return { message: 'All student records deleted successfully' };
//   }
// }

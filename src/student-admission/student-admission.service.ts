import { AdmissionDto } from './dto/student-admission.dto';
import { StudentAdmission } from './entities/student-admission.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentAdmissionService {
  constructor(
    @InjectRepository(StudentAdmission)
    private readonly repo: Repository<StudentAdmission>,
  ) {}

  async create(admissionDetails: AdmissionDto) {
    const res = this.repo.create(admissionDetails);
    return this.repo.save(res);
  }

  async update(id: number, admissionDetails: AdmissionDto) {
    return await this.repo.update(id, admissionDetails);
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async getAll() {
    return await this.repo.find({});
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }

  async removeAll(): Promise<{ message: string }> {
    await this.repo.clear();
    return { message: 'All student records deleted successfully' };
  }
}

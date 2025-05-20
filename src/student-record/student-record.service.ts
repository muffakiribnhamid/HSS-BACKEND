import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { StudentRecordDto } from './dto/student-record.dto';
import { Repository } from 'typeorm';
import { StudentRecord } from './entities/student-record.entity';

@Injectable()
export class StudentRecordService {
  constructor(
    @InjectRepository(StudentRecord)
    private readonly repo: Repository<StudentRecord>,
  ) {}

  async create(
    studentDetails: StudentRecordDto,
  ): Promise<{ message: string; student: StudentRecordDto }> {
    const newStudent = this.repo.create({
      ...studentDetails,
      createdAt: new Date().toISOString(),
    });

    const savedResponse = await this.repo.save(newStudent);
    return {
      message: 'New students record has been created successfully.',
      student: savedResponse,
    };
  }

  async update(id: number, dto: StudentRecordDto) {
    const students = await this.repo.preload({
      id,
      ...dto,
      updatedAt: new Date().toISOString(),
    });
    if (!students) throw new NotFoundException('students not found');
    const updated = await this.repo.save(students);
    return { message: 'students updated successfully', data: updated };
  }

  async findAll() {
    const students = await this.repo.find();
    return { message: 'students retrieved successfully', data: students };
  }

  async findOne(id: number) {
    const students = await this.repo.findOneBy({ id });
    if (!students) throw new NotFoundException('students not found');
    return { message: 'students retrieved successfully', data: students };
  }

  async remove(id: number) {
    const students = await this.repo.findOneBy({ id });
    if (!students) throw new NotFoundException('students not found');
    await this.repo.remove(students);
    return { message: 'students deleted successfully' };
  }
}

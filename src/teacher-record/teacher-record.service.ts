import { Response } from 'express';
import { TeacherRecordDTO } from './dto/teacher-record.dto';
import { TeacherRecord } from './entities/teacher-record.entities';
import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherRecordService {
  constructor(
    @InjectRepository(TeacherRecord)
    private readonly repo: Repository<TeacherRecord>,
  ) {}

  async create(
    teacherDetails: TeacherRecordDTO,
  ): Promise<{ message: string; teacher: TeacherRecord }> {
    const newTeacher = this.repo.create({
      ...teacherDetails,
      createdAt: new Date().toISOString(),
    });
    const savedTeacher = await this.repo.save(newTeacher);
    return {
      message: 'New teacher record has been created successfully.',
      teacher: savedTeacher,
    };
  }

  async update(id: number, dto: TeacherRecordDTO) {
    const teacher = await this.repo.preload({
      id,
      ...dto,
      updatedAt: new Date().toISOString(),
    });
    if (!teacher) throw new NotFoundException('Teacher not found');
    const updated = await this.repo.save(teacher);
    return { message: 'Teacher updated successfully', data: updated };
  }

  async findAll() {
    const teachers = await this.repo.find();
    return { message: 'Teachers retrieved successfully', data: teachers };
  }

  async findOne(id: number) {
    const teacher = await this.repo.findOneBy({ id });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return { message: 'Teacher retrieved successfully', data: teacher };
  }

  async remove(id: number) {
    const teacher = await this.repo.findOneBy({ id });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.repo.remove(teacher);
    return { message: 'Teacher deleted successfully' };
  }
}

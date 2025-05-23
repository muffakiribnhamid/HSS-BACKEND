import { Response } from 'express';
import { AddTeacherRecordDTO } from './dto/teacher-record.dto';
import { TeacherRecord } from './entities/teacher-record.entities';
import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherRecordService {
  constructor(
    @InjectRepository(TeacherRecord)
    private readonly repository: Repository<TeacherRecord>,
  ) { }

  async create(
    teacherDetails: AddTeacherRecordDTO,
  ){
    const totalCount = await this.repository.count();
    const paddedId = String(totalCount + 1).padStart(3, '0');

    const emailParts = teacherDetails.email.split('@');
    const uniqueEmail = `${emailParts[0]}${paddedId}@${emailParts[1]}`;

    const newTeacher = this.repository.create({
      ...teacherDetails,
      email: uniqueEmail,
    });

    return await this.repository.save(newTeacher);
  }

  async update(id: number, dto: AddTeacherRecordDTO) {
    const teacher = await this.repository.preload({
      id,
      ...dto,
      updatedAt: new Date().toISOString(),
    });
    if (!teacher) throw new NotFoundException('Teacher not found');
    const updated = await this.repository.save(teacher);
    return { message: 'Teacher updated successfully', data: updated };
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'ASC' }, // customize as needed
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };;
  }

  async findOne(id: number) {
    const teacher = await this.repository.findOneBy({ id });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return { message: 'Teacher retrieved successfully', data: teacher };
  }

  async remove(id: number) {
    const teacher = await this.repository.findOneBy({ id });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.repository.remove(teacher);
    return { message: 'Teacher deleted successfully' };
  }
}

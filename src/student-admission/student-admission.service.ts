import {
  AddAdmissionDto,
  UpdateAdmissionDto,
} from './dto/student-admission.dto';
import { StudentAdmission } from './entities/student-admission.entities';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class StudentAdmissionService {
  constructor(
    @InjectRepository(StudentAdmission)
    private readonly repo: Repository<StudentAdmission>,
  ) {}

  async create(studentDetails: AddAdmissionDto) {
    try {
      const newStudent = this.repo.create(studentDetails);
      return await this.repo.save(newStudent);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error);
      }
      throw new InternalServerErrorException('Failed to add staff');
    }
  }

  async update(studentDetails: UpdateAdmissionDto) {
    const { uuid } = studentDetails;
    const staff = await this.repo.findOne({ where: { uuid } });

    if (!staff) {
      throw new NotFoundException();
    }

    Object.assign(staff, studentDetails);

    const updated = await this.repo.save(staff);

    return {
      message: 'student admission details updated successfully',
      data: updated,
    };
  }

  async getStudentList(
    page: number,
    limit: number,
    userStatus: string,
    searchTerm: string,
  ) {
    let userStatusCondition = {};

    if (userStatus === 'active') {
      userStatusCondition = { activeStatus: true };
    } else if (userStatus === 'inactive') {
      userStatusCondition = { activeStatus: false };
    }

    let whereCondition;
    if (searchTerm) {
      whereCondition = [
        { ...userStatusCondition, fullName: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, address: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, contact: ILike(`%${searchTerm}%`) },
      ];
    } else {
      whereCondition = userStatusCondition;
    }

    const [data, total] = await this.repo.findAndCount({
      where: whereCondition,
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
    };
  }

  async removeStudent(uuid: string) {
    const staff = await this.repo.findOne({ where: { uuid } });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    staff.isDelete = true;
    staff.activeStatus = false;

    await this.repo.save(staff);

    return { message: 'student removed successfully' };
  }

}

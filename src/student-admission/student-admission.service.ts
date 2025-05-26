import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AddStudentDto } from './dto/student-admission.dto';
import { Student } from './entities/student.entities';
import { AcademicInfo } from './entities/academic-info.entities';
import { BankDetails } from './entities/bank-details.entities';


@Injectable()
export class StudentAdmissionService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(AcademicInfo)
    private academicRepo: Repository<AcademicInfo>,

    @InjectRepository(BankDetails)
    private bankRepo: Repository<BankDetails>,
  ) { }

  async addStudent(dto: AddStudentDto): Promise<Student> {

    const existing = await this.studentRepo.findOne({
      where: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
      },
    });

    if (existing) {
      throw new ConflictException('Student with this email and phone number already exists');
    }

    const student = this.studentRepo.create({
      fullName: dto.fullName,
      address: dto.address,
      gender: dto.gender,
      dob: dto.dob,
      fatherName: dto.fatherName,
      motherName: dto.motherName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      isApprove: dto.isApprove,
      isDelete: dto.isDelete,
    });


    const savedStudent = await this.studentRepo.save(student);

    const academicInfo = this.academicRepo.create({
      gradeApplyingFor: dto.gradeApplyingFor,
      previousSchool: dto.previousSchool,
      shortIntroduction: dto.shortIntroduction,
      student: savedStudent,
    });

    const bankInfo = this.bankRepo.create({
      accountHolderName: dto.accountHolderName,
      accountNumber: dto.accountNumber,
      bankName: dto.bankName,
      IFSCCode: dto.IFSCCode,
      student: savedStudent,
    });

    await this.academicRepo.save(academicInfo);
    await this.bankRepo.save(bankInfo);

    return savedStudent;
  }

  async getStudentsList(page: number, limit: number, studentStatus: string, searchTerm: string) {
    const whereConditions: any = { isDelete: false }; // You can add isApprove: true if needed

    if (searchTerm) {
      whereConditions.fullName = ILike(`%${searchTerm}%`);
    }

    // Fetch data with relations
    const [students, total] = await this.studentRepo.findAndCount({
      where: whereConditions,
      relations: ['academicInfo', 'bankDetails'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const data = students.map(student => ({
      studentDetails: {
        id: student.id,
        fullName: student.fullName,
        address: student.address,
        gender: student.gender,
        dob: student.dob,
        fatherName: student.fatherName,
        motherName: student.motherName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        isApprove: student.isApprove,
        isDelete: student.isDelete,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
      academicDetails: student.academicInfo?.[0] || {},
      bankDetails: student.bankDetails?.[0] || {},
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
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
    const whereConditions: any = { isDelete: false };

    if (searchTerm) {
      whereConditions.fullName = ILike(`%${searchTerm}%`);
    }

    // Fetch data with relations
    const [students, total] = await this.studentRepo.findAndCount({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const studentIds = students.map(s => s.id);

    if (studentIds.length === 0) {
      // No students found, return empty
      return {
        data: [],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }

    const [academicInfos, bankDetails] = await Promise.all([
      this.academicRepo.find({
        where: { student: In(studentIds), isDelete: false },
      }),
      this.bankRepo.find({
        where: { student: In(studentIds), isDelete: false },
      }),
    ]);

    const academicInfoMap = academicInfos.reduce((acc, item) => {
      acc[item.studentId] = item;
      return acc;
    }, {});

    const bankDetailsMap = bankDetails.reduce((acc, item) => {
      acc[item.studentId] = item;
      return acc;
    }, {});

    const data = students.map(student => {
      const {
        id: _aId,
        studentId: _aStudentId,
        createdAt: _aCreated,
        updatedAt: _aUpdated,
        isApprove: _aIsApprove,
        isDelete: _aIsDelete,
        ...academicDetails
      } = academicInfoMap[student.id] || {};

      const {
        id: _bId,
        studentId: _bStudentId,
        createdAt: _bCreated,
        updatedAt: _bUpdated,
        isApprove: _bIsApprove,
        isDelete: _bIsDelete,
        ...bankDetails
      } = bankDetailsMap[student.id] || {};

      return {
        studentDetails: {
          uuid: student.id,
          fullName: student.fullName,
          address: student.address,
          gender: student.gender,
          dob: student.dob,
          fatherName: student.fatherName,
          motherName: student.motherName,
          email: student.email,
          phoneNumber: student.phoneNumber,
          isApprove: student.isApprove,
        },
        academicDetails,
        bankDetails,
      };
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
    const student = await this.studentRepo.findOne({ where: { id:uuid } });

    if (!student) {
      throw new NotFoundException('Staff not found');
    }

    student.isDelete = true;
    // student.isApprove = false;

    // await this.studentRepo.save(student);

    return { message: 'Staff removed successfully' };
  }

}

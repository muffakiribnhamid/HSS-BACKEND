import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import {
  AddStudentDto,
  UpdateStudentRecordDTO,
} from './dto/student-admission.dto';
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
  ) {}

  async addStudent(dto: AddStudentDto): Promise<{ message: any; status: any }> {
    const existingStudents = await this.studentRepo.find({
      where: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
      },
      relations: ['academicInfo'],
    });

    const match = existingStudents?.find((student) =>
      student.academicInfo?.some(
        (info) => info.gradeApplyingFor === dto.gradeApplyingFor,
      ),
    );

    if (match) {
      throw new ConflictException(
        'Student with this email, phone number and grade already exists',
      );
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
      activeStatus: dto.activeStatus,
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

    return {
      message: 'Student Added Successfully',
      status: 201,
    };
  }

  async updateStudentInfo(dto: UpdateStudentRecordDTO) {
    const { uuid, academicInfoId, bankDetailsId } = dto;
    const student = await this.studentRepo.findOne({
      where: { id: uuid },
      relations: ['academicInfo', 'bankDetails'],
    });

    if (!student) throw new NotFoundException('Student not found');

    // const match = student.academicInfo?.some(
    //   (info) => info.gradeApplyingFor === dto.gradeApplyingFor,
    // );

    // if (match) {
    //   throw new ConflictException('Student with this email, phone number and grade already exists');
    // }

    Object.assign(student, {
      fullName: dto.fullName,
      address: dto.address,
      gender: dto.gender,
      dob: dto.dob,
      fatherName: dto.fatherName,
      motherName: dto.motherName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      isApprove: dto.activeStatus,
      isDelete: dto.isDelete,
    });

    await this.studentRepo.save(student);

    const academicInfo = await this.academicRepo.findOne({
      where: { id: academicInfoId },
    });
    if (academicInfo) {
      Object.assign(academicInfo, {
        gradeApplyingFor: dto.gradeApplyingFor,
        previousSchool: dto.previousSchool,
        shortIntroduction: dto.shortIntroduction,
      });
      await this.academicRepo.save(academicInfo);
    }

    const bankDetail = await this.bankRepo.findOne({
      where: { id: bankDetailsId },
    });
    if (bankDetail) {
      Object.assign(bankDetail, {
        accountHolderName: dto.accountHolderName,
        accountNumber: dto.accountNumber,
        bankName: dto.bankName,
        IFSCCode: dto.IFSCCode,
      });
      await this.bankRepo.save(bankDetail);
    }

    return 'updated successfully';
  }

  async getActiveStudent() {
    return await this.studentRepo.count({ where: { isDelete: false } });
  }

  async getStudentsList(
    page: number,
    limit: number,
    studentStatus: string,
    searchTerm: string,
  ) {
    let userStatusCondition: any = { isDelete: false };

    if (studentStatus === 'active') {
      userStatusCondition.activeStatus = true;
    } else if (studentStatus === 'inactive') {
      userStatusCondition.activeStatus = false;
    }

    let whereCondition;
    if (searchTerm) {
      whereCondition = [
        { ...userStatusCondition, fullName: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, address: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, phoneNumber: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, email: ILike(`%${searchTerm}%`) },
      ];
    } else {
      whereCondition = userStatusCondition;
    }

    const [students, total] = await this.studentRepo.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'ASC' },
    });

    const studentIds = students.map((s) => s.id);

    if (studentIds.length === 0) {
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

    const data = students.map((student) => {
      const {
        studentId: _aStudentId,
        createdAt: _aCreated,
        updatedAt: _aUpdated,
        isApprove: _aIsApprove,
        isDelete: _aIsDelete,
        ...academicDetails
      } = academicInfoMap[student.id] || {};

      const {
        studentId: _bStudentId,
        createdAt: _bCreated,
        updatedAt: _bUpdated,
        activeStatus: _bActiveStatus,
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
          activeStatus: student.activeStatus,
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
    const student = await this.studentRepo.findOne({ where: { id: uuid } });

    if (!student) {
      throw new NotFoundException('student not found');
    }

    student.isDelete = true;
    student.activeStatus = false;

    await this.studentRepo.delete(student);

    return { message: 'student removed successfully' };
  }

  async getStudent(contact: string, gradeApplyingFor: string, email: string) {
    const student = await this.studentRepo.findOne({
      where: {
        phoneNumber: contact,
        email,
        academicInfo: {
          gradeApplyingFor,
        },
      },
      relations: ['academicInfo'],
    });
    if (!student) {
      throw new NotFoundException('Invalid Credentials');
    }
    return student;
  }
}

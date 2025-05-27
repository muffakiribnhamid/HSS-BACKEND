
import { IsString, IsEmail, IsDateString, IsEnum, IsBoolean, IsUUID } from 'class-validator';
import { Gender } from '../entities/student.entities';

class AddStudentDto {
  @IsString()
  fullName: string;

  @IsString()
  address: string;

  @IsEnum(Gender, { message: 'Gender must be Male or Female' })
  gender: Gender;

  @IsDateString()
  dob: string;

  @IsString()
  fatherName: string;

  @IsString()
  motherName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  gradeApplyingFor: string;

  @IsString()
  previousSchool: string;

  @IsString()
  shortIntroduction: string;

  @IsString()
  accountHolderName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  bankName: string;

  @IsString()
  IFSCCode: string;

  @IsBoolean()
  isApprove: boolean;

  @IsBoolean()
  isDelete: boolean;

  @IsBoolean()
  terms?: boolean;
}

class UpdateStudentRecordDTO extends AddStudentDto {
  @IsUUID('4', { message: 'ID must be a valid UUID v4' })
  uuid: string;

  @IsUUID('4')
  academicInfoId: string;

  @IsUUID('4')
  bankDetailsId: string;
}

export { AddStudentDto, UpdateStudentRecordDTO } 
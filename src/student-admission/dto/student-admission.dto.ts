import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';

class AddAdmissionDto {
  // @IsOptional()
  // @IsUUID('4', { message: 'ID must be a valid UUID v4' })
  // id?: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: "Mother's name is required" })
  motherName: string;

  @IsString()
  @IsNotEmpty({ message: "Father's name is required" })
  fatherName: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsDateString({}, { message: 'Date of birth must be a valid date string' })
  dob: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Contact number is required' })
  contact: string;

  @IsString()
  @IsNotEmpty({ message: 'Grade applying for is required' })
  gradeApplyingFor: string;

  @IsString()
  @IsNotEmpty({ message: 'Previous school is required' })
  previousSchool: string;

  @IsString()
  @IsNotEmpty({ message: 'Last grade completed is required' })
  lastGradeCompleted: string;

  @IsString()
  @IsNotEmpty({ message: 'Short introduction is required' })
  shortIntroduction: string;

  @IsString()
  @IsNotEmpty({ message: 'Account holder name is required' })
  accountHolderName: string;

  @IsString()
  @IsNotEmpty({ message: 'Account number is required' })
  accountNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Bank name is required' })
  bankName: string;

  @IsString()
  @IsNotEmpty({ message: 'IFSC Code is required' })
  IFSCCode: string;

  @IsString()
  @IsNotEmpty({ message: 'Photo URL/path is required' })
  photo: string;

  @IsString()
  @IsNotEmpty({ message: 'Marksheet URL/path is required' })
  marksheet: string;

  @IsString()
  @IsNotEmpty({ message: 'Aadhaar card number is required' })
  aadhaarCard: string;

  @IsBoolean({ message: 'Active status must be a boolean value' })
  activeStatus: boolean;
}

 class UpdateAdmissionDto {
  @IsOptional()
  @IsUUID('4', { message: 'ID must be a valid UUID v4' })
  uuid?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  motherName?: string;

  @IsOptional()
  @IsString()
  fatherName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date of birth must be a valid date string' })
  dob?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  gradeApplyingFor?: string;

  @IsOptional()
  @IsString()
  previousSchool?: string;

  @IsOptional()
  @IsString()
  lastGradeCompleted?: string;

  @IsOptional()
  @IsString()
  shortIntroduction?: string;

  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  IFSCCode?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  marksheet?: string;

  @IsOptional()
  @IsString()
  aadhaarCard?: string;

  @IsOptional()
  @IsBoolean()
  activeStatus?: boolean;

  @IsOptional()
  @IsBoolean()
  isDelete?: boolean;
}


export  {UpdateAdmissionDto, AddAdmissionDto} 
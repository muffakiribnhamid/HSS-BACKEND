import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class MasterDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsNotEmpty({ message: "email can't be empty" })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class EmailDto {
  @IsNotEmpty({ message: 'Full name is required' })
  name: string;


  @IsNotEmpty({ message: 'Full name is required' })
  email: string;


  @IsNotEmpty({ message: 'Full name is required' })
  message: string;
}

export class JoinRequestDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  motherName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  gradeApplyingFor: string;

  @IsString()
  @IsOptional()
  previousSchool?: string;

  @IsString()
  @IsOptional()
  shortIntroduction?: string;

  @IsDateString()
  dob: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  IFSCCode: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean()
  terms: boolean;

  @IsOptional()
  photo?: any; // You can define a type or use `Express.Multer.File` if using file upload
}
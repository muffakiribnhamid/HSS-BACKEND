import { IsString, IsEmail } from 'class-validator';

export class AddTeacherRecordDTO {
  @IsString()
  fullName: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;
}

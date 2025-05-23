import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AddTeacherRecordDTO {
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Contact must be a string' })
  @IsNotEmpty({ message: 'Contact is required' })
  contact: string;
}

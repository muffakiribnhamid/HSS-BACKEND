import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class MasterDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsNotEmpty({message: "email can't be empty"})
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 6 characters long' })
  password: string;
}

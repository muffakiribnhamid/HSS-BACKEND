import { IsString, IsEmail, IsNotEmpty, IsEnum, IsUUID, IsBoolean } from 'class-validator';
import { Role } from '../entities/staff-record.entities';

class AddStaffRecordDTO {
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString({ message: 'Contact must be a string' })
  @IsNotEmpty({ message: 'Contact is required' })
  contact: string;

  @IsEnum(Role, {
    message: `Role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}

class UpdateStaffRecordDTO {

  @IsUUID('4', { message: 'ID must be a valid UUID v4' })
  uuid: string;

  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString({ message: 'Contact must be a string' })
  @IsNotEmpty({ message: 'Contact is required' })
  contact: string;

  @IsEnum(Role, {
    message: `Role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role: Role;

  @IsBoolean({ message: 'activeStatus must be a boolean value' })
  activeStatus: boolean;

  @IsBoolean({ message: 'isDelete must be a boolean value' })
  isDelete: boolean;
}


export { AddStaffRecordDTO, UpdateStaffRecordDTO };
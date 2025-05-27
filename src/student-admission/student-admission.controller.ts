import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Delete,
  Param,
  Patch,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { StudentAdmissionService } from './student-admission.service';
import {
  AddAdmissionDto,
  UpdateAdmissionDto,
} from './dto/student-admission.dto';
import { Response } from 'express';

@Controller('student-admission')
export class StudentAdmissionController {
  constructor(private readonly service: StudentAdmissionService) {}

  @Post('add-student')
  async create(@Body() dto: AddAdmissionDto) {
    return await this.service.create(dto);
  }

  @Patch('update-student')
  async update(@Body() dto: UpdateAdmissionDto) {
    return await this.service.update(dto);
  }

  @Get('get-student')
  getStudentList(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('staffStatus') status: string,
    @Query('search') search: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    console.log(status);
    const staffStatus = status?.trim() || '';
    const searchTerm = search?.trim() || '';
    return this.service.getStudentList(
      pageNum,
      limitNum,
      staffStatus,
      searchTerm,
    );
  }

  @Delete('remove-student/:uuid')
  async removeStudent(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ) {
    return this.service.removeStudent(uuid);
  }
  
  @Get("student")
  async getStudentByNameAndDob(
    @Query('contact') contact: string,
    @Query('gradeApplyingFor') gradeApplyingFor: string,
    @Query('email') email: string
  ) {
    if (!contact || !gradeApplyingFor || !email) {
      throw new NotFoundException();
    }
    return await this.service.getStudent(contact, gradeApplyingFor, email);
  }
}

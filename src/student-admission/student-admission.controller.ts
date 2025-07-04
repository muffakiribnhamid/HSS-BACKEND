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
  AddStudentDto,
  UpdateStudentRecordDTO,
} from './dto/student-admission.dto';
import { Response } from 'express';

@Controller('student-admission')
export class StudentAdmissionController {
  constructor(private readonly service: StudentAdmissionService) {}

  @Get('active-student')
  getActiveStaff() {
    return this.service.getActiveStudent();
  }

  @Post('add-student')
  addStudent(@Body() dto: AddStudentDto) {
    return this.service.addStudent(dto);
  }

  @Patch('update-student')
  updateStudentInfo(@Body() staffDetails: UpdateStudentRecordDTO) {
    return this.service.updateStudentInfo(staffDetails);
  }

  @Get('get-students')
  getStudentsList(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('studentStatus') status: string,
    @Query('search') search: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const studentStatus = status?.trim() || '';
    console.log('innn', studentStatus);
    const searchTerm = search?.trim() || '';
    return this.service.getStudentsList(
      pageNum,
      limitNum,
      studentStatus,
      searchTerm,
    );
  }

  @Delete('remove-student/:uuid')
  removeStaff(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ) {
    return this.service.removeStudent(uuid);
  }

  @Get('student')
  async getStudentByNameAndDob(
    @Query('contact') contact: string,
    @Query('gradeApplyingFor') gradeApplyingFor: string,
    @Query('email') email: string,
  ) {
    if (!contact || !gradeApplyingFor || !email) {
      throw new NotFoundException();
    }
    return await this.service.getStudent(contact, gradeApplyingFor, email);
  }
}

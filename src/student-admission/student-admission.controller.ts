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


  

  // @Delete(':id')
  // async remove(@Param('id') id: string, @Res() res: Response) {
  //   const result = await this.service.remove(id);
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     statusCode: HttpStatus.OK,
  //     message: result.message,
  //     timestamp: new Date().toISOString(),
  //   });
  // }

  // @Delete()
  // async removeAll(@Res() res: Response) {
  //   const result = await this.service.removeAll();
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     statusCode: HttpStatus.OK,
  //     message: result.message,
  //     timestamp: new Date().toISOString(),
  //   });
  // }

  // @Get()
  // async getAll(@Res() res: Response) {
  //   const result = await this.service.getAll();
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     statusCode: HttpStatus.OK,
  //     message: 'Fetched all student admission records.',
  //     timestamp: new Date().toISOString(),
  //     data: result,
  //   });
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string, @Res() res: Response) {
  //   const result = await this.service.findOne(id);
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     statusCode: HttpStatus.OK,
  //     message: `Fetched student admission with ID ${id}.`,
  //     timestamp: new Date().toISOString(),
  //     data: result,
  //   });
  // }
}

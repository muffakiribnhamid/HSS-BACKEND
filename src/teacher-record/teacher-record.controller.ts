import { Response } from 'express';
import { AddTeacherRecordDTO } from './dto/teacher-record.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { TeacherRecordService } from './teacher-record.service';

@Controller('teacher-record')
export class TeacherRecordController {
  constructor(private readonly service: TeacherRecordService) {}

  @Post('add-teacher')
  async create(@Body() teacherDetails: AddTeacherRecordDTO) {
    return this.service.create(teacherDetails);
  }

  @Get('get-teachers')
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    return this.service.findAll(pageNum,limitNum);
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
  //   const result = await this.service.findOne(id);
  //   return res.status(HttpStatus.OK).json({
  //     statusCode: HttpStatus.OK,
  //     success: true,
  //     ...result,
  //   });
  // }

  // @Put(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: TeacherRecordDTO,
  //   @Res() res: Response,
  // ) {
  //   const result = await this.service.update(id, dto);
  //   return res.status(HttpStatus.OK).json({
  //     statusCode: HttpStatus.OK,
  //     success: true,
  //     ...result,
  //   });
  // }

  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
  //   const result = await this.service.remove(id);
  //   return res.status(HttpStatus.OK).json({
  //     statusCode: HttpStatus.OK,
  //     success: true,
  //     ...result,
  //   });
  // }
}

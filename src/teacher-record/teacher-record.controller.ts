import { Response } from 'express';
import { TeacherRecordDTO } from './dto/teacher-record.dto';
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
  Res,
} from '@nestjs/common';
import { TeacherRecordService } from './teacher-record.service';

@Controller('teacher-record')
export class TeacherRecordController {
  constructor(private readonly service: TeacherRecordService) {}

  @Post()
  async create(@Body() teacherDetails: TeacherRecordDTO, @Res() res: Response) {
    const result = await this.service.create(teacherDetails);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      success: true,
      message: result.message,
      data: result.teacher,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.service.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      ...result,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.service.findOne(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      ...result,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TeacherRecordDTO,
    @Res() res: Response,
  ) {
    const result = await this.service.update(id, dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      ...result,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.service.remove(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      ...result,
    });
  }
}

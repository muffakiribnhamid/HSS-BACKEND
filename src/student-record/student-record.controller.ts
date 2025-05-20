import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { StudentRecordService } from './student-record.service';
import { StudentRecordDto } from './dto/student-record.dto';

@Controller('student-record')
export class StudentRecordController {
  constructor(private readonly service: StudentRecordService) {}

  @Post()
  async create(@Body() studentDetails: StudentRecordDto, @Res() res: Response) {
    const result = await this.service.create(studentDetails);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      success: true,
      message: result.message,
      data: result.student,
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
    @Body() dto: StudentRecordDto,
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

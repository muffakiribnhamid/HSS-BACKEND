import { AdmissionDto } from './dto/student-admission.dto';
import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { StudentAdmissionService } from './student-admission.service';
import { Response } from 'express';

@Controller('student-admission')
export class StudentAdmissionController {
  constructor(private readonly service: StudentAdmissionService) {}

  

  @Post()
  async create(@Body() admissionDetails: AdmissionDto, @Res() res: Response) {
    const result = await this.service.create(admissionDetails);
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Student admission completed successfully.',
      timestamp: new Date().toISOString(),
      data: result,
    });
  }

  @Patch(':id')
  async update( @Param('id') id: string,  @Body() updatedDetails: AdmissionDto, @Res() res: Response  ) {
    await this.service.update(+id, updatedDetails);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Student admission with ID ${id} updated successfully.`,
      timestamp: new Date().toISOString(),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.service.remove(+id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Student admission with ID ${id} deleted successfully.`,
      timestamp: new Date().toISOString(),
    });
  }

  @Delete()
  async removeAll(@Res() res: Response) {
    const result = await this.service.removeAll();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'All student admissions deleted successfully.',
      timestamp: new Date().toISOString(),
      data: result,
    });
  }

  @Get()
  async getAll(@Res() res: Response) {
    const result = await this.service.getAll();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Fetched all student admissions.',
      timestamp: new Date().toISOString(),
      data: result,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.findOne(+id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Fetched student admission with ID ${id}.`,
      timestamp: new Date().toISOString(),
      data: result,
    });
  }
}

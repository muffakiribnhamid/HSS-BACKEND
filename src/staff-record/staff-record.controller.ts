import { AddStaffRecordDTO, UpdateStaffRecordDTO } from './dto/staff-record.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { StaffRecordService } from './staff-record.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('staff-record')
export class StaffRecordController {
  constructor(private readonly service: StaffRecordService) { }

  @Post('add-staff')
  addStaff(@Body() staffDetails: AddStaffRecordDTO) {
    return this.service.addStaff(staffDetails);
  }

  @Patch('update-staff')
  updateStaffInfo(@Body() staffDetails: UpdateStaffRecordDTO) {
    return this.service.updateStaffInfo(staffDetails);
  }

  @Get('get-staff')
  getStaffList(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    return this.service.getStaffList(pageNum, limitNum);
  }

  @Delete('remove-staff/:uuid')
  async removeStaff(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string) {
    return this.service.removeStaff(uuid);
  }
}

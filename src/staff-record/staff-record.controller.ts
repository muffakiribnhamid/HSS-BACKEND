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

// @UseGuards(JwtAuthGuard)
@Controller('staff-record')
export class StaffRecordController {
  constructor(private readonly service: StaffRecordService) { }

  @Post('add-staff')
  addStaff(@Body() staffDetails: AddStaffRecordDTO) {
    return this.service.addStaff(staffDetails);
  }
  
  @Get('active-staff')
  getActiveStaff() {
    return this.service.getActiveStaff();
  }

  @Patch('update-staff')
  updateStaffInfo(@Body() staffDetails: UpdateStaffRecordDTO) {
    return this.service.updateStaffInfo(staffDetails);
  }

  @Get('get-staff')
  getStaffList(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('staffStatus') status: string,
    @Query('search') search: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const staffStatus = status?.trim() || '';
    const searchTerm = search?.trim() || '';
    return this.service.getStaffList(pageNum, limitNum, staffStatus, searchTerm);
  }

  @Delete('remove-staff/:uuid')
  removeStaff(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string) {
    return this.service.removeStaff(uuid);
  }
}

import { Controller } from '@nestjs/common';
import { TeacherRecordService } from './teacher-record.service';

@Controller('teacher-record')
export class TeacherRecordController {
  constructor(private readonly teacherRecordService: TeacherRecordService) {}
}

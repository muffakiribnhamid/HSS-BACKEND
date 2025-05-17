import { Module } from '@nestjs/common';
import { TeacherRecordService } from './teacher-record.service';
import { TeacherRecordController } from './teacher-record.controller';

@Module({
  controllers: [TeacherRecordController],
  providers: [TeacherRecordService],
})
export class TeacherRecordModule {}

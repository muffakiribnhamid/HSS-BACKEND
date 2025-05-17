import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeacherRecordService } from './teacher-record.service';
import { TeacherRecordController } from './teacher-record.controller';
import { TeacherRecord } from './entities/teacher-record.entities';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRecord])],
  controllers: [TeacherRecordController],
  providers: [TeacherRecordService],
})
export class TeacherRecordModule {}

import { StudentRecord } from './entities/student-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentRecordService } from './student-record.service';
import { StudentRecordController } from './student-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRecord])],
  controllers: [StudentRecordController],
  providers: [StudentRecordService],
})
export class StudentRecordModule {}

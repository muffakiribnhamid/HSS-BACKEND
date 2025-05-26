import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StaffRecordService } from './staff-record.service';
import { StaffRecordController } from './staff-record.controller';
import { StaffRecord } from './entities/staff-record.entities';

@Module({
  imports: [TypeOrmModule.forFeature([StaffRecord])],
  controllers: [StaffRecordController],
  providers: [StaffRecordService],
})
export class StaffRecordModule {}

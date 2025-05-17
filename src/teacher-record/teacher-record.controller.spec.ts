import { Test, TestingModule } from '@nestjs/testing';
import { TeacherRecordController } from './teacher-record.controller';
import { TeacherRecordService } from './teacher-record.service';

describe('TeacherRecordController', () => {
  let controller: TeacherRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherRecordController],
      providers: [TeacherRecordService],
    }).compile();

    controller = module.get<TeacherRecordController>(TeacherRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TeacherRecordService } from './teacher-record.service';

describe('TeacherRecordService', () => {
  let service: TeacherRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherRecordService],
    }).compile();

    service = module.get<TeacherRecordService>(TeacherRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NoticeDto } from './dto/notice.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly repo: Repository<Notice>,
  ) {}

  async create(noticeDetails: NoticeDto) {
    const notice = this.repo.create(noticeDetails);
    return await this.repo.save(notice);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const notice = await this.repo.findOneBy({ id });
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
    return notice;
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
    return { message: `Notice with ID ${id} has been deleted` };
  }
}

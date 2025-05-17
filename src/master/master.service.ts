import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Master } from './entities/master.entity';
import { Repository } from 'typeorm';
import { MasterDto } from './dto/master.dto';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Master)
    private readonly repo: Repository<Master>,
  ) {}

  create(createMasterDto: MasterDto) {
    return 'This action adds a new master';
  }

  async findOne(id: number) {
    const master = await this.repo.findOne({ where: { id } });
    return master;

    return `This action returns a #${id} master`;
  }

  findAll() {
    return `This action returns all master`;
  }

  update(id: number, updateMasterDto: MasterDto) {
    return `This action updates a #${id} master`;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }
}

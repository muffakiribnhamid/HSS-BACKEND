import { AddStaffRecordDTO, UpdateStaffRecordDTO } from './dto/staff-record.dto';
import { StaffRecord } from './entities/staff-record.entities';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StaffRecordService {
  constructor(
    @InjectRepository(StaffRecord)
    private readonly repository: Repository<StaffRecord>,
  ) { }

  async addStaff(staffDetails: AddStaffRecordDTO) {
    try {
      const newStaff = this.repository.create({ ...staffDetails });
      return await this.repository.save(newStaff);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists.');
      }
      throw new InternalServerErrorException('Failed to add staff');
    }
  }
  async updateStaffInfo(updateStaffDto: UpdateStaffRecordDTO) {
    const { uuid } = updateStaffDto;
    const staff = await this.repository.findOne({ where: { uuid } });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    Object.assign(staff, updateStaffDto);

    const updated = await this.repository.save(staff);

    return {
      message: 'Staff updated successfully',
      data: updated,
    };
  }

  async getStaffList(page: number, limit: number) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'ASC' }, // customize as needed
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };;
  }
  
  async removeStaff(uuid: string) {
    const staff = await this.repository.findOne({ where: { uuid } });
  
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    
    staff.isDelete = true;
    staff.activeStatus = false;
   
    await this.repository.save(staff);
  
    return { message: 'Staff removed successfully' };
  }
}

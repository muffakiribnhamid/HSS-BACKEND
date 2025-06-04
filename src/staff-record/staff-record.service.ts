import {
  AddStaffRecordDTO,
  UpdateStaffRecordDTO,
} from './dto/staff-record.dto';
import { StaffRecord } from './entities/staff-record.entities';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class StaffRecordService {
  constructor(
    @InjectRepository(StaffRecord)
    private readonly repository: Repository<StaffRecord>,
  ) {}

  async addStaff(staffDetails: AddStaffRecordDTO) {
    try {
      const newStaff = this.repository.create({ ...staffDetails });
      await this.repository.save(newStaff);
    } catch (error) {
      if (error.code === '23505') {
        console.log(error);
        throw new ConflictException('Contact Number already exists.');
      }
      throw new InternalServerErrorException('Failed to add staff');
    }
    return {
      status: 201,
      message: 'new staff added successfully'
    }
  }

  async getActiveStaff() {
    return await this.repository.count({ where: { isDelete: false } });
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

  async getStaffList(
    page: number,
    limit: number,
    userStatus: string,
    searchTerm: string,
  ) {
    let userStatusCondition: any = { isDelete: false };

    if (userStatus === 'active') {
      userStatusCondition.activeStatus = true;
    } else if (userStatus === 'inactive') {
      userStatusCondition.activeStatus = false;
    }

    let whereCondition;
    if (searchTerm) {
      whereCondition = [
        { ...userStatusCondition, fullName: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, address: ILike(`%${searchTerm}%`) },
        { ...userStatusCondition, contact: ILike(`%${searchTerm}%`) },
      ];
    } else {
      whereCondition = userStatusCondition;
    }

    const [data, total] = await this.repository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'ASC' },
    });
    const filteredData = data.map(
      ({ id, createdAt, updatedAt, ...rest }) => rest,
    );

    return {
      data: filteredData,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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

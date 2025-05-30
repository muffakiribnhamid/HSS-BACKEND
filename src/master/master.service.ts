import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Master } from './entities/master.entity';
import { Repository } from 'typeorm';
import { MasterDto } from './dto/master.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../common/mailer/mailer.service';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Master)
    private readonly repo: Repository<Master>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) { }

  async postFeedback(emailDto) {
    await this.mailerService.sendEmail(
      emailDto.email,
      'User Feedback',
      `Hi this is ${emailDto.name} and this is my email ${emailDto.email}. my feedback is ${emailDto.message}`
    );
  }

  async submitJoiningRequest(emailDto) {
    const {fullName, email, ...rest} = emailDto;
    await this.mailerService.sendEmailForJoin(
      emailDto.email,
      'Joining Request',
      `Hi this is ${fullName} and this is my email ${email}. i want to apply for you school here my details ${JSON.stringify(rest)}`
    );
  }

  async create(masterDto: MasterDto) {
    const { email, password } = masterDto;
    const existing = await this.repo.findOne({
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const master = this.repo.create({
      ...masterDto,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return await this.repo.save(master);
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = this.jwtService.sign({ email: email, sub: user.id });
      return {
        access_token: token,
      };
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async findByEmail(email: string): Promise<Master> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Invalid email or password`);
    }
    return user;
  }

  async findAll(): Promise<Master[]> {
    return await this.repo.find();
  }

  async update(id: number, updateDto: MasterDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`User Not Found`);
    }
    const updatedDetails = { ...updateDto, createdAt: new Date().toISOString() };

    const updated = this.repo.merge(existing, updatedDetails);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User Not Found`);
    }
    return { message: `User removed successfully` };
  }
}

// @Injectable()
// export class MasterService {
//   constructor(
//     @InjectRepository(Master)
//     private readonly repo: Repository<Master>,
//   ) {}

//   async create(masterDto: MasterDto) {
//     const hasedPassword = await bcrypt.hash(masterDto.password, 8);
//     const master = this.repo.create({
//       ...masterDto,
//       password: hasedPassword,
//     });
//     return await this.repo.save(master);
//   }

//   async findByEmail(email: string) {
//     return this.repo.findOne({ where: { email } });
//   }

//   findAll() {
//     return `This action returns all master`;
//   }

//   update(id: number, updateMasterDto: MasterDto) {
//     return `This action updates a #${id} master`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} master`;
//   }
// }

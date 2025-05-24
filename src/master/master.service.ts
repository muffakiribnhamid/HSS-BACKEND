import {
  BadRequestException,
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
import * as nodemailer from 'nodemailer';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Master)
    private readonly repo: Repository<Master>,
    private jwtService: JwtService,
  ) {}

  private otpMap = new Map<string, { otp: string; expiresAt: number }>();

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  async sendOtpForForgotPassword(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    console.log(user);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    this.otpMap.set(email, { otp, expiresAt });

    await this.transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Reset Password OTP',
      text: `Your OTP to reset password is ${otp}. It will expire in 5 minutes.`,
    });

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(email: string, otp: string) {
    const entry = this.otpMap.get(email);
    if (!entry || entry.expiresAt < Date.now()) {
      throw new BadRequestException('OTP expired or not found');
    }

    if (entry.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    return { message: 'OTP verified successfully' };
  }

  // ✅ Reset Password
  async resetPassword(email: string, newPassword: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otpEntry = this.otpMap.get(email);
    if (!otpEntry) {
      throw new BadRequestException('OTP verification required before reset');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await this.repo.save(user);

    this.otpMap.delete(email);

    return { message: 'Password has been reset successfully' };
  }

  //======================================

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
    if (user && (await bcrypt.compare(password, user.password))) {
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
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  async findAll(): Promise<Master[]> {
    return await this.repo.find();
  }

  async update(id: number, updateDto: MasterDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    const updatedDetails = {
      ...updateDto,
      createdAt: new Date().toISOString(),
    };

    const updated = this.repo.merge(existing, updatedDetails);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return { message: `User with id ${id} removed successfully` };
  }
}

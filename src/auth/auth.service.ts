import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MasterService } from 'src/master/master.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }
  
  // async validateUser(email: string, password: string): Promise<any> {
  //   if (email === 'test' && password === 'password') {
  //     return { userId: 1, email: 'test' };
  //   }
  //   return null;
  // }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

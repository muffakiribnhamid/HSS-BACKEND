import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.CLIENT_URL || 'from manual';
  }
}

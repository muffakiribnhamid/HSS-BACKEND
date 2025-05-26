import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { Master } from './entities/master.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from 'src/common/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Master]), 
    forwardRef(() => AuthModule),
    MailerModule
  ],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule { }

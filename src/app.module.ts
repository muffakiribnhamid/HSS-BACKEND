import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentAdmissionModule } from './student-admission/student-admission.module';
import { StaffRecordModule } from './staff-record/staff-record.module';
import { MasterModule } from './master/master.module';
import { StudentRecordModule } from './student-record/student-record.module';
import { MailerModule } from './common/mailer/mailer.module';

@Module({
  providers: [JwtStrategy, AppService],
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    MailerModule,
    AuthModule,
    MasterModule,
    StudentAdmissionModule,
    StaffRecordModule,
    StudentRecordModule,
  ],
})
export class AppModule {}

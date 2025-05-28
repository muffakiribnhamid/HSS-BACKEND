// src/common/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendEmail(from: string, subject: string, text: string) {
    const mailOption = {
      from, 
      to: process.env.EMAIL_USER,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOption);
  }

  async sendEmailForJoin(from: string, subject: string, text: string) {
    const mailOption = {
      from, 
      to: process.env.EMAIL_USER,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOption);
  }
}

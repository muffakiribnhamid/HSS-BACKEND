import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}


// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './Enitity/entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       logging: true,
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'khansahb',
//       database: 'testuser',
//       entities: [User],
//       autoLoadEntities: true,
//       synchronize: false,
//     }),
//     UserModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { Master } from './entities/master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Master])],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule {}

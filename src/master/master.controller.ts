import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterDto } from './dto/master.dto';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  create(@Body() createMasterDto: MasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Get()
  findAll() {
    return this.masterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: MasterDto) {
    return this.masterService.update(+id, updateMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(+id);
  }
}

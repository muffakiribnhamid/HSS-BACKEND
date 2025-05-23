import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterDto } from './dto/master.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) { }

  @Post()
  async create(@Body() createMasterDto: MasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.masterService.login(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }


  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.masterService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.masterService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMasterDto: MasterDto,
  ) {
    return this.masterService.update(id, updateMasterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.masterService.remove(id);
  }
}
// @Controller('master')
// export class MasterController {
//   constructor(private readonly masterService: MasterService) {}

//   @Post()
//   create(@Body() createMasterDto: MasterDto) {
//     return this.masterService.create(createMasterDto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get(':email')
//   findOne(@Param('email') email: string) {
//     return this.masterService.findByEmail(email);
//   }

//   @Get()
//   findAll() {
//     return this.masterService.findAll();
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateMasterDto: MasterDto) {
//     return this.masterService.update(+id, updateMasterDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.masterService.remove(+id);
//   }
// }

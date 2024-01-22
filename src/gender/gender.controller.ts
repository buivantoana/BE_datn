import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { GenderService } from 'src/gender/gender.service';
import { genderDto, idgenderDto } from './dto/gender.dto';

@Controller('gender')
export class GenderController {
  constructor(private GenderService: GenderService) {}
  @Post('')
  async createGender(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: genderDto,
  ) {
    try {
      return await this.GenderService.createGender(category);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateGender(
    @Param('id', new ValidationPipe({ transform: true })) id: idgenderDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: genderDto,
  ) {
    try {
      return await this.GenderService.updateGender(String(id), category);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteGender(
    @Param('id', new ValidationPipe({ transform: true })) id: idgenderDto,
  ) {
    try {
      return await this.GenderService.deleteGender(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async fillAllGender() {
    try {
      return await this.GenderService.fillAllGender();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async fillOneGender(
    @Param('id', new ValidationPipe({ transform: true })) id: idgenderDto,
  ) {
    try {
      return await this.GenderService.fillOneGender(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

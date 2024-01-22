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
import { CinemasDto, idCinemasDto } from './dto/cinemas.dto';
import { CinemasService } from './cinemas.service';

@Controller('cinemas')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}
  @Post('')
  async createCinemas(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    cinemas: CinemasDto,
  ) {
    try {
      return await this.cinemasService.createCinemas(cinemas);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateCinemas(
    @Param('id', new ValidationPipe({ transform: true })) id: idCinemasDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: CinemasDto,
  ) {
    try {
      return await this.cinemasService.updateCinemas(String(id), category);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteCinemas(
    @Param('id', new ValidationPipe({ transform: true })) id: idCinemasDto,
  ) {
    try {
      return await this.cinemasService.deleteCinemas(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async fillAllCinemas() {
    try {
      return await this.cinemasService.fillAllCinemas();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async fillOneCinemas(
    @Param('id', new ValidationPipe({ transform: true })) id: idCinemasDto,
  ) {
    try {
      return await this.cinemasService.fillOneCinemas(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

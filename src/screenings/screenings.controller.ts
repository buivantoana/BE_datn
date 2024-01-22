import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { idscreeningsDto, screeningsDto } from './dto/screenings.dto';
import { ScreeningsService } from './screenings.service';

@Controller('screenings')
export class ScreeningsController {
  constructor(private screeningsService: ScreeningsService) {}
  @Post('')
  async createMovie(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    screenings: screeningsDto,
  ) {
    try {
      return await this.screeningsService.createScreenings(screenings);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllScreenings() {
    try {
      return await this.screeningsService.fillAllScreenings();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Put(':id')
  async updateScreenings(
    @Param('id', new ValidationPipe({ transform: true })) id: idscreeningsDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    screenings: screeningsDto,
  ) {
    try {
      return await this.screeningsService.updateScreenings(
        String(id),
        screenings,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteScreenings(
    @Param('id', new ValidationPipe({ transform: true })) id: idscreeningsDto,
  ) {
    try {
      return await this.screeningsService.deleteScreenings(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Get(':id')
  async fillOneScreenings(
    @Param('id', new ValidationPipe({ transform: true })) id: idscreeningsDto,
  ) {
    try {
      return await this.screeningsService.fillOneScreenings(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('/movie/:id')
  async fillMovieScreenings(
    @Param('id', new ValidationPipe({ transform: true })) id: idscreeningsDto,
  ) {
    try {
      return await this.screeningsService.findMovieScreenings(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

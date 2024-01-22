import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { MovieService } from './movie.service';
import { idmovieDto, movieDto, movieUpdateDto } from './dto/movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private MovieService: MovieService) {}
  @Post('')
  async createMovie(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    movie: movieDto,
  ) {
    try {
      return await this.MovieService.createMovie(movie);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllMovie() {
    try {
      return await this.MovieService.fillAllMovie();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('similar/:id')
  async findSimilarMovie(
    @Param('id', new ValidationPipe({ transform: true })) id: idmovieDto,
  ) {
    try {
      return await this.MovieService.fillSimilarMovie(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Put(':id')
  async updateMovie(
    @Param('id', new ValidationPipe({ transform: true })) id: idmovieDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    movie: movieUpdateDto,
  ) {
    try {
      return await this.MovieService.updateMovie(String(id), movie);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteMovie(
    @Param('id', new ValidationPipe({ transform: true })) id: idmovieDto,
  ) {
    try {
      return await this.MovieService.deleteMovie(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Get(':id')
  async fillOneMovie(
    @Param('id', new ValidationPipe({ transform: true })) id: idmovieDto,
  ) {
    try {
      return await this.MovieService.fillOneMovie(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

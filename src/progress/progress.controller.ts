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
import { idProgressDto, ProgressDto } from './dto/progress.dto';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}
  @Post('')
  async createProgress(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    progress: ProgressDto,
  ) {
    try {
      return await this.progressService.createProgress(progress);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('detail/:id/:courses_id')
  async findOneProgress(
    @Param('id', new ValidationPipe({ transform: true })) id: idProgressDto,
    @Param('courses_id', new ValidationPipe({ transform: true })) courses_id: idProgressDto,
  ) {
    try {
      return await this.progressService.findOneProgress(String(id),String(courses_id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('/user/:id')
  async findUserProgress(
    @Param('id', new ValidationPipe({ transform: true })) id: idProgressDto,
  ) {
    try {
      return await this.progressService.findUserProgress(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateProgress(
    @Param('id', new ValidationPipe({ transform: true })) id: idProgressDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    progress: any,
  ) {
    try {
      console.log(progress);
      return await this.progressService.updateProgress(
        String(id),
        progress,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

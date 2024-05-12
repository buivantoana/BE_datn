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
  @Get(':id')
  async findOneProgress(
    @Param('id', new ValidationPipe({ transform: true })) id: idProgressDto,
  ) {
    try {
      return await this.progressService.findOneProgress(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  //   @Put(':id')
  //   async updateLesson(
  //     @Param('id', new ValidationPipe({ transform: true })) id: idLessonDto,
  //     @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  //     lesson: any,
  //   ) {
  //     try {
  //       return await this.lessonService.updateLesson(String(id), lesson);
  //     } catch (error) {
  //       return {
  //         status: 1,
  //         message: error,
  //       };
  //     }
  //   }
}

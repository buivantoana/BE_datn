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
import { SubLessonService } from './sublesson.service';
import { idSubLessonDto, SubLessonDto } from './dto/sublesson.dto';

@Controller('sublesson')
export class SubLessonController {
  constructor(private subLessonService: SubLessonService) {}
  @Post('')
  async createSubLesson(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: any,
  ) {
    try {
      return await this.subLessonService.createSubLesson(lesson);
      
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateSubLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idSubLessonDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    lesson: SubLessonDto,
  ) {
    try {
      return await this.subLessonService.updateSubLesson(String(id), lesson);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteSubLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idSubLessonDto,
  ) {
    try {
      return await this.subLessonService.deleteSubLesson(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllSubLessonn() {
    try {
      return await this.subLessonService.findAllSubLesson();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneSubLesson(
    @Param('id', new ValidationPipe({ transform: true })) id: idSubLessonDto,
  ) {
    try {
      return await this.subLessonService.findOneSubLesson(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

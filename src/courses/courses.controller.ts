import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CoursesService } from './courses.service';
import { CoursesDto, CoursesDtoUpdate, idCoursesDto } from './dto/courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post('')
  async createCourses(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    courses: CoursesDto,
  ) {
    try {
      return await this.coursesService.createCourses(courses);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Put(':id')
  async updateCourses(
    @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    courses: CoursesDtoUpdate,
  ) {
    try {
      return await this.coursesService.updateCourses(String(id), courses);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteCourses(
    @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
  ) {
    try {
      return await this.coursesService.deleteCourses(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllCourses() {
    try {
      return await this.coursesService.findAllCourses();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneCourses(
    @Param('id', new ValidationPipe({ transform: true })) id: idCoursesDto,
  ) {
    try {
      return await this.coursesService.findOneCourses(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
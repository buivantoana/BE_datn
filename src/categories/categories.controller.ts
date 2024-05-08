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
import { CategoriesService } from './categories.service';
import { CategoriesDto, idCategoriesDto } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post('')
  async createCategories(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: CategoriesDto,
  ) {
    try {
      return await this.categoriesService.createCategories(category);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateCategories(
    @Param('id', new ValidationPipe({ transform: true })) id: idCategoriesDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    category: CategoriesDto,
  ) {
    try {
      return await this.categoriesService.updateCategories(
        String(id),
        category,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteCategories(
    @Param('id', new ValidationPipe({ transform: true })) id: idCategoriesDto,
  ) {
    try {
      return await this.categoriesService.deleteCategories(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllCategories() {
    try {
      return await this.categoriesService.findAllCategories();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneCategories(
    @Param('id', new ValidationPipe({ transform: true })) id: idCategoriesDto,
  ) {
    try {
      return await this.categoriesService.findOneCategories(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

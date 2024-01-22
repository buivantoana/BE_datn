import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Post,
   Put,
   ValidationPipe
} from '@nestjs/common';
import { FoodDto, idFoodDto } from './dto/food.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}
  @Post('')
  async createFood(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    food: FoodDto,
  ) {
    try {
      return await this.foodService.createFood(food);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateFood(
    @Param('id', new ValidationPipe({ transform: true })) id: idFoodDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    food: FoodDto,
  ) {
    try {
      return await this.foodService.updateFood(String(id), food);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteFood(
    @Param('id', new ValidationPipe({ transform: true })) id: idFoodDto,
  ) {
    try {
      return await this.foodService.deleteFood(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async fillAllFood() {
    try {
      return await this.foodService.fillAllFood();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async fillOneFood(
    @Param('id', new ValidationPipe({ transform: true })) id: idFoodDto,
  ) {
    try {
      return await this.foodService.fillOneFood(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

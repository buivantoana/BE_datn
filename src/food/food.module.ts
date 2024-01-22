import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodModel } from './schema/food.schema';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodModel }]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}

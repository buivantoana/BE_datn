import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './schema/food.schema';
import { IFood } from './interface/food.interface';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<Food>,
  ) {}
  async createFood(cinemas: IFood) {
    try {
      let data = await this.foodModel.create(cinemas);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateFood(id: string, cinemas: IFood) {
    try {
      let data = await this.foodModel.findByIdAndUpdate(id, cinemas, {
        new: true,
      });
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFood(id: string) {
    try {
      let data = await this.foodModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async fillAllFood() {
    try {
      let data = await this.foodModel.find();
      //   .aggregate([
      //     { $match: { slug: { $in: ['Food', 'Drink'] } } }, // Lọc theo các loại bạn quan tâm
      //     { $sort: { slug: 1 } }, // Sắp xếp theo loại (food trước, drink sau)
      //     { $group: { _id: '$slug', items: { $push: '$$ROOT' } } }, // Nhóm theo loại
      //   ])
      //   ;

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async fillOneFood(id: string) {
    try {
      let data = await this.foodModel.findById(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

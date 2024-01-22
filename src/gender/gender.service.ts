import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender } from './schema/gender.schema';
import { IGender } from './interface/gender.interface';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender.name) private readonly genderModel: Model<Gender>,
  ) {}
  async createGender(category: IGender) {
    try {
      let data = await this.genderModel.create(category);
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
  async updateGender(id: string, category: IGender) {
    try {
      let data = await this.genderModel.findByIdAndUpdate(id, category, {
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
  async deleteGender(id: string) {
    try {
      let data = await this.genderModel.findByIdAndDelete(id);
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
  async fillAllGender() {
    try {
      let data = await this.genderModel
        .find({})
        .populate('movies')
        .lean()
        .exec();

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
  async fillOneGender(id: string) {
    try {
      let data = await this.genderModel.findById(id);
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

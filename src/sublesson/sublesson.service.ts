import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SubLesson } from './schema/sublesson.schema';
import { ISubLesson } from './interface/sublesson.interface';

@Injectable()
export class SubLessonService {
  constructor(
    @InjectModel(SubLesson.name)
    private readonly sublessonModel: Model<SubLesson>,
  ) {}
  async createSubLesson(sublesson) {
    try {
      let data = await this.sublessonModel.create(sublesson);
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
  async updateSubLesson(id: string, sublesson: ISubLesson) {
    try {
      let data = await this.sublessonModel.findByIdAndUpdate(id, sublesson, {
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
  async deleteSubLesson(id: string) {
    try {
      let data = await this.sublessonModel.findByIdAndDelete(id);
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
  async findAllSubLesson() {
    try {
      let data = await this.sublessonModel.find({});

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
  async findOneSubLesson(id: string) {
    try {
      let data = await this.sublessonModel.findById(id);
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

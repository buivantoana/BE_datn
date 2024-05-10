import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courses } from './schema/courses.schema';
import { ICourses } from './interface/courses.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name)
    private readonly coursesModel: Model<Courses>,
  ) {}
  async createCourses(courses: ICourses) {
    try {
      let data = await this.coursesModel.create(courses);
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
  async updateCourses(id: string, courses: any) {
    try {
      let data = await this.coursesModel.findByIdAndUpdate(id, courses, {
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
  async deleteCourses(id: string) {
    try {
      let data = await this.coursesModel.findByIdAndDelete(id);
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
  async findAllCourses() {
    try {
      let data = await this.coursesModel
        .find({})
        .populate(['category_id',{
          path: 'lesson',
          populate: {
            path: 'sub_lesson',
            model: 'SubLesson',
          },
        }])
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
  async updateArrangeCourses(id: string, lesson: any) {
    try {
      let data = await this.coursesModel.findOneAndUpdate({ _id: id }, { $set: { lesson: lesson } },
      { returnOriginal: false });
      
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
  async findOneCourses(id: string) {
    try {
      let data = await this.coursesModel.findById(id);
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

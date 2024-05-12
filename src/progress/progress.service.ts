import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Courses } from 'src/courses/schema/courses.schema';
import { SubLesson } from 'src/sublesson/schema/sublesson.schema';
import { Progress } from './schema/progress.schema';
import { IProgress } from './interface/progress.interface';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name)
    private readonly progressModel: Model<Progress>,
    @InjectModel(Courses.name)
    private readonly coursesModel: Model<Courses>,
  ) {}
  async createProgress(progress: IProgress) {
    try {
      let data = await this.progressModel.create(progress);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      await this.coursesModel.updateOne(
        { _id: progress.courses_id },
        { $push: { students: data._id } },
      );
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findOneProgress(id: string) {
    try {
      let data = await this.progressModel
        .find({ user_id: id })
        .populate(['courses_id'])
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
  //   async updateLesson(id: string, lesson: any) {
  //     try {
  //       let data = await this.lessonModel.findByIdAndUpdate(id, lesson.lesson, {
  //         new: true,
  //       });
  //       if (lesson.changeCourses) {
  //         await this.coursesModel.updateOne(
  //           { _id: lesson.lesson.courses_id[0] },
  //           { $push: { lesson: id } },
  //         );
  //         await this.coursesModel.updateOne(
  //           { _id: lesson.coursesOld },
  //           { $pull: { lesson: id } },
  //         );
  //       }
  //       if (!data) {
  //         return {
  //           status: 1,
  //           message: 'failed',
  //         };
  //       }
  //       return {
  //         status: 0,
  //         message: 'suceess',
  //         data,
  //       };
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}

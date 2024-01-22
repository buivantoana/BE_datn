import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IScreenings } from './interface/screenings.interface';
import { Screenings } from './schema/screenings.schema';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectModel(Screenings.name)
    private readonly ScreeningsModel: Model<Screenings>,
  ) {}
  async createScreenings(screenings: IScreenings) {
    try {
      let data = await this.ScreeningsModel.create(screenings);
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
  async fillAllScreenings() {
    try {
      let data = await this.ScreeningsModel.find({})
        .populate(['movies', 'cinemas'])
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
  async fillOneScreenings(id: string) {
    try {
      let data = await this.ScreeningsModel.findById(id);
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
  async findMovieScreenings(id: string) {
    try {
      let data = await this.ScreeningsModel.find({ movies: { $in: [id] } })
        .populate(['movies', 'cinemas'])
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
  async updateScreenings(id: string, screenings: any) {
    try {
      let data = await this.ScreeningsModel.findByIdAndUpdate(id, screenings, {
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
  async deleteScreenings(id: string) {
    try {
      let data = await this.ScreeningsModel.findByIdAndDelete(id);
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinemas } from './schema/cinemas.schema';
import { ICinemas } from './interface/cinemas.interface';

@Injectable()
export class CinemasService {
  constructor(
    @InjectModel(Cinemas.name) private readonly cinemasModel: Model<Cinemas>,
  ) {}
  async createCinemas(cinemas: ICinemas) {
    try {
      let data = await this.cinemasModel.create(cinemas);
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
  async updateCinemas(id: string, cinemas: ICinemas) {
    try {
      let data = await this.cinemasModel.findByIdAndUpdate(id, cinemas, {
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
  async deleteCinemas(id: string) {
    try {
      let data = await this.cinemasModel.findByIdAndDelete(id);
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
  async fillAllCinemas() {
    try {
      let data = await this.cinemasModel.find();

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
  async fillOneCinemas(id: string) {
    try {
      let data = await this.cinemasModel.findById(id);
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

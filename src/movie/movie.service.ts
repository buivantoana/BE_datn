import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schema/movie.schema';
import { IMovie } from './interface/movie.interface';
import { format, isAfter, parseISO } from 'date-fns';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly MovieModel: Model<Movie>,
  ) {}
  async createMovie(movie: IMovie) {
    try {
      let data = await this.MovieModel.create(movie);
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
  async fillAllMovie() {
    try {
      let data = await this.MovieModel.find({})
        .populate('genders')
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
  async fillOneMovie(id: string) {
    try {
      let data = await this.MovieModel.findById(id)
        .populate('genders')
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

  async fillSimilarMovie(id: string) {
    try {
      let data = await this.MovieModel.find({ genders: id }).exec();

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
  async updateMovie(id: string, movie: any) {
    try {
      let data = await this.MovieModel.findByIdAndUpdate(id, movie, {
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
  async deleteMovie(id: string) {
    try {
      let data = await this.MovieModel.findByIdAndDelete(id);
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
  async fillScrollMovie(type: string, pagePrams: number, res: any) {
    const cursor = pagePrams || 0;
    const currentDate = new Date();
    const pageSize = 3;

    if (type === 'release_date') {
      const totalPage = await this.MovieModel.countDocuments({
        release_date: { $lt: format(currentDate, 'yyyy-MM-dd') },
      });
      let moviesQuery = await this.MovieModel.find({
        release_date: { $lt: format(currentDate, 'yyyy-MM-dd') },
      })
        .skip(cursor)
        .limit(pageSize)
        .exec();

      const nextId = cursor + pageSize < totalPage ? cursor + pageSize : null;
      const previousId = cursor >= pageSize ? cursor - pageSize : null;

      let datatotal = { data: moviesQuery, nextId, previousId };
      if (cursor === 0) {
        return res.json(datatotal);
      } else {
        setTimeout(() => {
          return res.json(datatotal);
        }, 1000);
      }
    } else {
      const totalPage = await this.MovieModel.countDocuments({
        release_date: { $gt: format(currentDate, 'yyyy-MM-dd') },
      });
      let moviesQuery = await this.MovieModel.find({
        release_date: { $gt: format(currentDate, 'yyyy-MM-dd') },
      })
        .skip(cursor)
        .limit(pageSize)
        .exec();

      const nextId = cursor + pageSize < totalPage ? cursor + pageSize : null;
      const previousId = cursor >= pageSize ? cursor - pageSize : null;

      let datatotal = { data: moviesQuery, nextId, previousId };
      if (cursor === 0) {
        return res.json(datatotal);
      } else {
        setTimeout(() => {
          return res.json(datatotal);
        }, 1000);
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { IPost } from './interface/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}
  async createPost(post: IPost) {
    try {
      let data = await this.postModel.create(post);
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
  async updateActivePost(id: string) {
    try {
      let data = await this.postModel.findOneAndUpdate(
        { _id: id },
        { $set: { active: true } },
        { returnOriginal: false },
      );
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
  async updatePost(id: string, post: IPost) {
    try {
      let data = await this.postModel.findByIdAndUpdate(id, post, {
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
  async deletePost(id: string) {
    try {
      let data = await this.postModel.findByIdAndDelete(id);
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
  async fillAllPost() {
    try {
      let data = await this.postModel.find();

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
  async findAllUserPost(id: string) {
    try {
      let data = await this.postModel
        .find({ author: [id] })
        .populate(['author'])
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
  async fillAllPostActive() {
    try {
      let data = await this.postModel
        .find({ active: true })
        .populate(['author'])
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
  async fillOnePost(id: string) {
    try {
      let data = await this.postModel
        .findById(id)
        .populate(['author'])
        .lean()
        .exec();
      console.log(data);
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
  async findPaginationPostActive(req: any) {
    try {
      const page = Number(req.query?.page);
      const size = Number(req.query?.size) || 2;
      const count = await this.postModel.countDocuments({ active: true });
      console.log(page, size);
      const data = await this.postModel
        .find({ active: true })
        .populate('author')
        .skip(page)
        .limit(size);

      if (!data || !data[0]) {
        return {
          status: 1,
          message: 'getone false',
        };
      }
      return {
        status: 0,
        message: 'getone success',
        data,
        count,
        page,
        size,
      };
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

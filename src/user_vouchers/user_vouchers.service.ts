import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserVouchers } from './schema/user_vouchers.schema';
import { IUserVouchers } from './interface/user_vouchers.interface';




@Injectable()
export class UserVouchersService {
  constructor(
    @InjectModel(UserVouchers.name)
    private readonly UserVouchersModel: Model<UserVouchers>,
  ) {}
  async createUserVouchers(Uservouchers: IUserVouchers) {
    try {
      let data = await this.UserVouchersModel.create(Uservouchers);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async updateUserVouchers(id: string, Uservouchers: IUserVouchers) {
    try {
      let data = await this.UserVouchersModel.findByIdAndUpdate(id, Uservouchers, {
        new: true,
      });
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async deleteUserVouchers(id: string) {
    try {
      let data = await this.UserVouchersModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async findAllUserVouchers() {
    try {
      let data = await this.UserVouchersModel.find({}).find({})
      .populate(['vouchers_id','user_id'])
      .lean()
      .exec();;

      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  
  async findOneUserVouchers(id: string) {
    try {
      let data = await this.UserVouchersModel.findById(id);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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

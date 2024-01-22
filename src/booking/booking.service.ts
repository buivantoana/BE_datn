import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schema/booking.schema';
import { IBooking } from './interface/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async createBooking(booking: IBooking) {
    try {
      let data = await this.bookingModel.create(booking);
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
  async fillOneBooking(id: any) {
    try {
      let data = await this.bookingModel.find({ order_id: id });
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
  async deleteBooking(id: any) {
    try {
      let data = await this.bookingModel.updateOne(
        { order_id: id },
        { $set: { status: 'unpaid' } },
        { new: true },
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
  async fillEmailBooking(email: any) {
    try {
      let data = await this.bookingModel
        .find({ email: email })
        .populate('movies')
        .lean()
        .exec();
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      data.reverse();
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateStatus(id: any) {
    try {
      let data = await this.bookingModel.updateOne(
        { order_id: id },
        { $set: { notify: 'old' } },
        { new: true },
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
}

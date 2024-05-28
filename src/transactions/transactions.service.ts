import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions } from './schema/transaction.schema';
import { ITransactions } from './interface/transactions.interface';



@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name)
    private readonly transactionsModel: Model<Transactions>,
  ) {}
  async createTransactions(transaction: ITransactions) {
    try {
      let data = await this.transactionsModel.create(transaction);
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
  
  async updateTransactions(id: string,status:any) {
    try {
      let data = await this.transactionsModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: status } },
        { returnOriginal: false },
      );
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
  async deleteTransactions(id: string) {
    try {
      let data = await this.transactionsModel.findByIdAndDelete(id);
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
  async findAllTransactions() {
    try {
      let data = await this.transactionsModel.find({});

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
  async findOneTransactions(id: string) {
    try {
      let data = await this.transactionsModel.findById(id);
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
  async findUserTransactions(id: string) {
    try {
      let data = await this.transactionsModel.find({user_id:[id]});
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

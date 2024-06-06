import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions } from './schema/transaction.schema';
import { ITransactions } from './interface/transactions.interface';
import { Notify } from 'src/notify/schema/notify.schema';
import { convertToVND } from 'src/utils';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name)
    private readonly transactionsModel: Model<Transactions>,
    @InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
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

  async updateTransactions(id: string, status: any,type:any) {
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
      if(type=="rechanrge"){
        await this.notifyModel.create({user_id:data.user_id,title:"Ví của bạn.",message:`Bạn vừa nạp thành công ${convertToVND(data.amount)} vào ví của mình.`,url:"/my_wallet",read:false})
      }else if(type=="withdraw"){
        await this.notifyModel.create({user_id:data.user_id,title:"Ví của bạn.",message:`Bạn vừa rút thành công ${convertToVND(data.amount)} từ ví ví của mình .`,url:"/my_wallet",read:false})
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
  async updateTransactionsWithdrawFaild(id: string, transaction: any) {
    try {
      let data = await this.transactionsModel.findOneAndReplace(
        { _id: id },
        transaction,
        { returnOriginal: false, upsert: true },
      );
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      await this.notifyModel.create({user_id:data.user_id,title:"Ví của bạn.",message:`Bạn vừa rút thất bại ${convertToVND(data.amount)} từ ví ví của mình.Ghi chú : ${data.note}`,url:"/my_wallet",read:false})
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
      let data = await this.transactionsModel.find({ type: 'withdraw' });

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
      let data = await this.transactionsModel.find({ user_id: [id] });
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data:data.reverse(),
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findStatisticalTransaction(id: any) {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      let data = await this.transactionsModel.find({ user_id:[id],status:"completed",
        createdAt: { $gte: startOfMonth } });
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data:data.reverse(),
      };
    } catch (error) {
      console.log(error);
    }
  }
}

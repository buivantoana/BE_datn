import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';
import { UserVouchers, UserVouchersModel } from './schema/user_vouchers.schema';
import { UserUserVouchersController } from './user_vouchers.controller';
import { UserVouchersService } from './user_vouchers.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserVouchers.name, schema: UserVouchersModel },
     
    ]),
  ],
  controllers: [UserUserVouchersController],
  providers: [UserVouchersService],
})
export class UserVouchersModule {}

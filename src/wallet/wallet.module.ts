import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletModel } from './schema/wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletModel },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}

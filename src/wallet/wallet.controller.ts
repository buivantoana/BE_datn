import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { WalletService } from './wallet.service';
import { WalletsDto, idWalletsDto } from './dto/wallet.dto';


@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}
  @Post('')
  async createWallet(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    wallet: WalletsDto,
  ) {
    try {
      return await this.walletService.createWallet(wallet);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateWallet(
    @Param('id', new ValidationPipe({ transform: true })) id: idWalletsDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    wallet: WalletsDto,
  ) {
    try {
      return await this.walletService.updateWallet(
        String(id),
        wallet,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteWallet(
    @Param('id', new ValidationPipe({ transform: true })) id: idWalletsDto,
  ) {
    try {
      return await this.walletService.deleteWallet(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllWallet() {
    try {
      return await this.walletService.findAllWallet();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneWallet(
    @Param('id', new ValidationPipe({ transform: true })) id: idWalletsDto,
  ) {
    try {
      return await this.walletService.findUserWallet(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}

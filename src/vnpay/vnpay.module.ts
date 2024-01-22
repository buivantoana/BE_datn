import { Module } from '@nestjs/common';
import { VnPayController } from './vnpay.controller';
import { VnPayService } from './vnpay.service';
import { BookingService } from 'src/booking/booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingModel } from 'src/booking/schema/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingModel }]),
  ],
  controllers: [VnPayController],
  providers: [VnPayService],
})
export class VnpayModule {}

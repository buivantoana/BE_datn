import { Module } from '@nestjs/common';
import { Booking, BookingModel } from './schema/booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingModel }]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

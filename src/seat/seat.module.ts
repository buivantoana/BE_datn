import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingModel } from 'src/booking/schema/booking.schema';
import {
  Screenings,
  ScreeningsModel,
} from 'src/screenings/schema/screenings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Screenings.name, schema: ScreeningsModel },
    ]),
  ],
  providers: [AppGateway],
})
export class SeatModule {}

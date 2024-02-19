import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Screenings,
  ScreeningsModel,
} from 'src/screenings/schema/screenings.schema';
import { User, UserModel } from 'src/user/schema/user.schema';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Screenings.name, schema: ScreeningsModel },
      { name: User.name, schema: UserModel },
    ]),
  ],
  providers: [AppGateway],
})
export class SeatModule {}

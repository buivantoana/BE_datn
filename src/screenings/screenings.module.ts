import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Screenings, ScreeningsModel } from './schema/screenings.schema';
import { ScreeningsController } from './screenings.controller';
import { ScreeningsService } from './screenings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Screenings.name, schema: ScreeningsModel },
    ]),
  ],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
})
export class ScreeningsModule {}

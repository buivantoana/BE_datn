import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinemas, CinemasModel } from './schema/cinemas.schema';
import { CinemasController } from './cinemas.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cinemas.name, schema: CinemasModel }]),
  ],
  controllers: [CinemasController],
  providers: [CinemasService],
})
export class CinemasModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderModel } from './schema/gender.schema';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gender.name, schema: GenderModel }]),
  ],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}

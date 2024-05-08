import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubLesson, SubLessonModel } from './schema/sublesson.schema';
import { SubLessonController } from './sublesson.controller';
import { SubLessonService } from './sublesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubLesson.name, schema: SubLessonModel },
    ]),
  ],
  controllers: [SubLessonController],
  providers: [SubLessonService],
})
export class SublessonModule {}

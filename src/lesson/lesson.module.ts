import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonModel } from './schema/lesson.chema';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonModel }]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}

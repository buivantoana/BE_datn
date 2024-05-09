import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonModel } from './schema/lesson.chema';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { Courses, CoursesModel } from 'src/courses/schema/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonModel }]),
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesModel }]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesModel } from './schema/courses.schema';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesModel }]),
    CloudinaryModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

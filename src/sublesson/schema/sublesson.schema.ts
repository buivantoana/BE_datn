import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SubLesson extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  type: string;
  @Prop()
  video_id?: string;
  @Prop()
  content_quizz?: string;
  @Prop()
  questions?: string;
  @Prop()
  content_blog?: string;
  @Prop()
  content_code?: string;
  @Prop()
  prompt?: string;
  @Prop()
  exercise?: string;
  @Prop()
  solution?: string;
  @Prop()
  type_exercise?: string;
}

export const SubLessonModel = SchemaFactory.createForClass(SubLesson);

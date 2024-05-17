import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Courses } from 'src/courses/schema/courses.schema';
import { User } from 'src/user/schema/user.schema';

@Schema()
export class CommentChildSchema {
  @Prop()
  content: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
}
@Schema({ timestamps: true, versionKey: false })
export class Comments extends Document {
  @Prop({ required: true })
  content: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  user_id: User[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Courses' }] })
  courses_id: Courses[];
  @Prop({ required: true })
  lesson_id: string;
  @Prop({ required: true })
  comments_child:[CommentChildSchema]
}

export const CommentsModel = SchemaFactory.createForClass(Comments);

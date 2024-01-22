import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Gender } from 'src/gender/schema/gender.schema';

@Schema({ timestamps: true, versionKey: false })
export class Movie extends Document {
  @Prop({ required: true })
  movie_id: number;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  poster_path1: string;
  @Prop({ required: true })
  poster_path2: string;
  @Prop({ required: true })
  backdrop_path: string;
  @Prop({ required: true })
  overview: string;
  @Prop({ required: true })
  release_date: string;
  @Prop({ required: true })
  times: string;
  @Prop({ required: true })
  traler: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Gender' }] })
  genders: Gender[];
}

export const MovieModel = SchemaFactory.createForClass(Movie);

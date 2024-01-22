import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Movie } from 'src/movie/schema/movie.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Gender extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];
}

export const GenderModel = SchemaFactory.createForClass(Gender);

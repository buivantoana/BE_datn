import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Cinemas } from 'src/cinemas/schema/cinemas.schema';
import { Movie } from 'src/movie/schema/movie.schema';

@Schema({ timestamps: true, versionKey: false })
export class Screenings extends Document {
  @Prop({ required: true })
  date: string;
  @Prop({ default: [] })
  timeSlots: any[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Cinemas' }] })
  cinemas: Cinemas[];
}

export const ScreeningsModel = SchemaFactory.createForClass(Screenings);

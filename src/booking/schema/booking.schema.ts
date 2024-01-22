import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Movie } from 'src/movie/schema/movie.schema';

@Schema({ timestamps: true, versionKey: false })
export class Booking extends Document {
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  cinemas: string;
  @Prop({ required: true })
  drink: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true })
  movie: string;
  @Prop({ required: true })
  order_id: string;
  @Prop({ required: true })
  ordernote: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  times: string;
  @Prop({ required: true })
  screeningId: string;
  @Prop({ default: 'new' })
  notify: string;
  @Prop({ default: 'paid' })
  status: string;

  @Prop({ required: true })
  total: number;
  @Prop({ required: true })
  seats: [string];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];
}

export const BookingModel = SchemaFactory.createForClass(Booking);

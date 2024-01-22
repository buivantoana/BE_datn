import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Cinemas extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  slug: string;
  @Prop({ required: true })
  pointLat: string;
  @Prop({ required: true })
  pointLng: string;
}

export const CinemasModel = SchemaFactory.createForClass(Cinemas);

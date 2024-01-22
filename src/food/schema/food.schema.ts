import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Food extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  slug: string;
}

export const FoodModel = SchemaFactory.createForClass(Food);

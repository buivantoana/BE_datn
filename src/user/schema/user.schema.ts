import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ default: 'MEMBER', enum: ['MEMBER', 'MANAGE', 'ADMIN'] })
  role: string;
}

export const UserModel = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  identityNumber: string;

  @Prop({ required: true })
  roles: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);

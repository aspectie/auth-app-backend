import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
 
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string

  @Prop({default: Date.now()})
  createdAt: Date

  @Prop()
  loggedInAt?: Date

  @Prop({default: false})
  isBlocked: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
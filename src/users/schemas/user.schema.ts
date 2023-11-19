import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
 
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string

  @Prop({ default: () => new Date() })
  createdAt: Date

  @Prop({ default: () => new Date() })
  loggedInAt: Date

  @Prop({default: false})
  isBlocked: boolean

  @Prop({default: false})
  isAdmin: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
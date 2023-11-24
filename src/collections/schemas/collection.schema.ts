import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { User } from 'src/users/schemas/user.schema';
 
export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image_url: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Type(() => Category)
  theme: Category;

  @Prop()
  integer1_name: string;

  @Prop({default: false})
  integer1_enabled: boolean;

  @Prop()
  integer2_name: string;

  @Prop({default: false})
  integer2_enabled: boolean;

  @Prop()
  integer3_name: string;

  @Prop({default: false})
  integer3_enabled: boolean;

  @Prop()
  string1_name: string;

  @Prop({default: false})
  string1_enabled: boolean;

  @Prop()
  string2_name: string;

  @Prop({default: false})
  string2_enabled: boolean;

  @Prop()
  string3_name: string;

  @Prop({default: false})
  string3_enabled: boolean;

  @Prop()
  text1_name: string;

  @Prop({default: false})
  text1_enabled: boolean;

  @Prop()
  text2_name: string;

  @Prop({default: false})
  text2_enabled: boolean;

  @Prop()
  text3_name: string;

  @Prop({default: false})
  text3_enabled: boolean;

  @Prop()
  boolean1_name: string;

  @Prop({default: false})
  boolean1_enabled: boolean;

  @Prop()
  boolean2_name: string;

  @Prop({default: false})
  boolean2_enabled: boolean;

  @Prop()
  boolean3_name: string;

  @Prop({default: false})
  boolean3_enabled: boolean;

  @Prop()
  date1_name: string;

  @Prop({default: false})
  date1_enabled: boolean;

  @Prop()
  date2_name: string;

  @Prop({default: false})
  date2_enabled: boolean;

  @Prop()
  date3_name: string;

  @Prop({default: false})
  date3_enabled: boolean;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
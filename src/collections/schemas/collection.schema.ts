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

  @Prop()
  integer1_enabled: boolean;

  @Prop()
  integer2_name: string;

  @Prop()
  integer2_enabled: boolean;

  @Prop()
  integer3_name: string;

  @Prop()
  integer3_enabled: boolean;

  @Prop()
  string1_name: string;

  @Prop()
  string1_enabled: boolean;

  @Prop()
  string2_name: string;

  @Prop()
  string2_enabled: boolean;

  @Prop()
  string3_name: string;

  @Prop()
  string3_enabled: boolean;

  @Prop()
  text1_name: string;

  @Prop()
  text1_enabled: boolean;

  @Prop()
  text2_name: string;

  @Prop()
  text2_enabled: boolean;

  @Prop()
  text3_name: string;

  @Prop()
  text3_enabled: boolean;

  @Prop()
  boolean1_name: string;

  @Prop()
  boolean1_enabled: boolean;

  @Prop()
  boolean2_name: string;

  @Prop()
  boolean2_enabled: boolean;

  @Prop()
  boolean3_name: string;

  @Prop()
  boolean3_enabled: boolean;

  @Prop()
  date1_name: string;

  @Prop()
  date1_enabled: boolean;

  @Prop()
  date2_name: string;

  @Prop()
  date2_enabled: boolean;

  @Prop()
  date3_name: string;

  @Prop()
  date3_enabled: boolean;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
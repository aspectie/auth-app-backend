import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { CustomField } from 'src/customFields/schemas/customField.schema';
import { User } from 'src/users/schemas/user.schema';
 
export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Type(() => Category)
  theme: Category;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomField' })
  @Type(() => CustomField)
  customFields: CustomField[]
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
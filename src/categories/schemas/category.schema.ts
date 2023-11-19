import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
 
export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category extends Document {
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
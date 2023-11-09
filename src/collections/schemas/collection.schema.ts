import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
 
export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  theme: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
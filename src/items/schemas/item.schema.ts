import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Collection } from 'src/collections/schemas/collection.schema';
import { CustomField } from 'src/customFields/schemas/customField.schema';
 
export type UserDocument = HydratedDocument<Item>;

@Schema()
export class Item extends Document {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' })
  @Type(() => Collection)
  _collection: Collection;

  @Prop()
  tags: string[];

  @Prop()
  customFields: CustomField[]
}

export const ItemSchema = SchemaFactory.createForClass(Item);
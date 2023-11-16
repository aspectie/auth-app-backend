import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Collection } from 'src/collections/schemas/collection.schema';
 
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
  integer1: number;

  @Prop()
  integer2: number;

  @Prop()
  integer3: number;

  @Prop()
  string1: string;

  @Prop()
  string2: string;

  @Prop()
  string3: string;

  @Prop()
  text1: string;

  @Prop()
  text2: string;

  @Prop()
  text3: string;

  @Prop()
  boolean1: boolean;

  @Prop()
  boolean2: boolean;

  @Prop()
  boolean3: boolean;

  @Prop()
  date1: Date;

  @Prop()
  date2: Date;

  @Prop()
  date3: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
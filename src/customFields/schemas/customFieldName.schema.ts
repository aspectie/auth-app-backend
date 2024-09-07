import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
@Schema({collection: 'customFieldNames'})
export class CustomFieldName extends Document { 
  @Prop()
  name: string;
}

export const CustomFieldNameSchema = SchemaFactory.createForClass(CustomFieldName);
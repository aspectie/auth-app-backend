import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CustomFieldState } from './customFieldState.schema';
import { CustomFieldName } from './customFieldName.schema';
import { CustomFieldValue } from './customFieldValue.schema';
import { Type } from 'class-transformer';
 
@Schema({collection: 'customFields'})
export class CustomField extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomFieldName' })
  @Type(() => CustomFieldName)
  name: CustomFieldName;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomFieldState' })
  @Type(() => CustomFieldState)
  state: CustomFieldState;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomFieldValue' })
  @Type(() => CustomFieldValue)
  value: CustomFieldValue;
}

export const CustomFieldSchema = SchemaFactory.createForClass(CustomField);
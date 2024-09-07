import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { CustomField } from 'src/customFields/schemas/customField.schema';
 
@Schema({collection: 'customFieldValues'})
export class CustomFieldValue extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomField' })
  @Type(() => CustomField)
  customField: CustomField;

  @Prop({ type: String})
  value: string | number | Date | boolean;
}

export const CustomFieldValueSchema = SchemaFactory.createForClass(CustomFieldValue);
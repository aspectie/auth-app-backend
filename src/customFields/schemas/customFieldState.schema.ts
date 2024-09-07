import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { CustomField } from 'src/customFields/schemas/customField.schema';
 
@Schema({collection: 'customFieldStates'})
export class CustomFieldState extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomField' })
  @Type(() => CustomField)
  customField: CustomField;

  @Prop()
  isEnabled: boolean;
}

export const CustomFieldStateSchema = SchemaFactory.createForClass(CustomFieldState);
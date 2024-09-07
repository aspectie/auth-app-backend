import { Inject, Injectable } from '@nestjs/common';
import { CustomField } from './schemas/customField.schema';
import { Model } from 'mongoose';
import { CUSTOM_FIELD_MODEL, CUSTOM_FIELD_NAME_MODEL, CUSTOM_FIELD_STATE_MODEL, CUSTOM_FIELD_VALUE_MODEL } from 'src/constants';

import { CustomFieldName } from './schemas/customFieldName.schema';
import { CustomFieldState } from './schemas/customFieldState.schema';
import { CustomFieldValue } from './schemas/customFieldValue.schema';

import { CreateCustomFieldDto } from './dto/create-customField.dto';
import { CreateCustomFieldNameDto } from './dto/create-customFieldName.dto';
import { CreateCustomFieldStateDto } from './dto/create-customFieldState.dto';
import { CreateCustomFieldValueDto } from './dto/create-customFieldValue.dto';
import { UpdateCustomFieldDto } from './dto/update-customField.dto';

@Injectable()
export class CustomFieldsService {
  constructor(
    @Inject(CUSTOM_FIELD_MODEL) private readonly customFieldModel: Model<CustomField>,
    @Inject(CUSTOM_FIELD_NAME_MODEL) private readonly customFieldNameModel: Model<CustomFieldName>,
    @Inject(CUSTOM_FIELD_STATE_MODEL) private readonly customFieldStateModel: Model<CustomFieldState>,
    @Inject(CUSTOM_FIELD_VALUE_MODEL) private readonly customFieldValueModel: Model<CustomFieldValue>
  ) {}

  async findAll(): Promise<CustomField[]> {
    return this.customFieldModel
      .find()
      .populate('name')
      .populate('state')
      .populate('value')
      .exec();
  }

  async findAllNames(): Promise<CustomFieldName[]> {
    return this.customFieldNameModel
      .find()
      .exec();
  }

  async findAllStates(): Promise<CustomFieldState[]> {
    return this.customFieldStateModel
      .find()
      .populate('customField')
      .exec();
  }

  async findAllValues(): Promise<CustomFieldValue[]> {
    return this.customFieldValueModel
      .find()
      .populate('customField')
      .exec();
  }

  async create(createCustomFieldDto: CreateCustomFieldDto): Promise<CustomField> {
    return await this.customFieldModel.create(createCustomFieldDto);
  }

  async createName(createCustomFieldNameDto: CreateCustomFieldNameDto): Promise<CustomFieldName> {
    return await this.customFieldNameModel.create(createCustomFieldNameDto);
  }

  async createState(createCustomFieldStateDto: CreateCustomFieldStateDto): Promise<CustomFieldState> {
    return await this.customFieldStateModel.create(createCustomFieldStateDto);
  }

  async createValue(createCustomValueDto: CreateCustomFieldValueDto): Promise<CustomFieldValue> {
    return await this.customFieldValueModel.create(createCustomValueDto);
  }

  async update(id: string, updateCustomFieldDto: UpdateCustomFieldDto) {
    const updatedUser = await this.customFieldModel
      .findByIdAndUpdate({ _id: id }, updateCustomFieldDto)
      .exec();

    return updatedUser;
  }
}

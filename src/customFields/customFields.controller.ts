import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CustomField } from './schemas/customField.schema';
import { CustomFieldsService } from './customFields.service';
import { CreateCustomFieldDto } from './dto/create-customField.dto';
import { CreateCustomFieldStateDto } from './dto/create-customFieldState.dto';
import { CreateCustomFieldValueDto } from './dto/create-customFieldValue.dto';
import { CreateCustomFieldNameDto } from './dto/create-customFieldName.dto';
import { CustomFieldValue } from './schemas/customFieldValue.schema';
import { CustomFieldState } from './schemas/customFieldState.schema';
import { CustomFieldName } from './schemas/customFieldName.schema';
import { UpdateCustomFieldDto } from './dto/update-customField.dto';
 
@Controller('customFields')
@ApiTags('customFields')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomFieldsController {
  constructor(private readonly customFieldsService: CustomFieldsService) {}

  @Get()
  async findAll(): Promise<CustomField[]> {
    return this.customFieldsService.findAll();
  }

  @Get('name')
  async findAllNames(): Promise<CustomFieldName[]> {
    return this.customFieldsService.findAllNames();
  }

  @Get('state')
  async findAllStates(): Promise<CustomFieldState[]> {
    return this.customFieldsService.findAllStates();
  }

  @Get('value')
  async findAllValues(): Promise<CustomFieldValue[]> {
    return this.customFieldsService.findAllValues();
  }

  @Post()
  create(@Body() createCustomFieldDto: CreateCustomFieldDto) {
    return this.customFieldsService.create(createCustomFieldDto);
  }

  @Post('name')
  createName(@Body() createCustomFieldNameDto: CreateCustomFieldNameDto) {
    return this.customFieldsService.createName(createCustomFieldNameDto);
  }

  @Post('state')
  async createState(@Body() createCustomFieldStateDto: CreateCustomFieldStateDto) {
    const newState = await this.customFieldsService.createState(createCustomFieldStateDto);

    return await this.customFieldsService.update(createCustomFieldStateDto.customField, {
        state: newState._id
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomFieldDto: UpdateCustomFieldDto) {
    return await this.customFieldsService.update(id, updateCustomFieldDto)
  }
}

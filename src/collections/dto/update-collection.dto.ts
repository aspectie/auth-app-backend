import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionDto } from './create-collection.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
  @ApiProperty({required: false})
  image: string
}

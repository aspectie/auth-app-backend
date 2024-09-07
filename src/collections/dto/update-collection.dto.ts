import { PartialType } from '@nestjs/swagger';
import { CreateCollectionDto } from './create-collection.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
  @ApiProperty({required: false})
  imageUrl: string
}

import { ApiProperty } from "@nestjs/swagger";
import { CustomField } from "src/customFields/schemas/customField.schema";

export class CreateItemDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  _collection: string

  @ApiProperty({required: false})
  tags: string[]

  @ApiProperty({required: false})
  customFields: CustomField[]
}

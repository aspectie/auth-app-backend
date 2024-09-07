import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCustomFieldValueDto {
  @ApiProperty()
  customField: string;
  
  @ApiProperty({required: true})
  @IsNotEmpty()
  value: string | number | Date | boolean
}

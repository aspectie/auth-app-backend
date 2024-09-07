import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCustomFieldNameDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  name: string
}

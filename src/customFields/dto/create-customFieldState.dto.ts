import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomFieldStateDto {
  @ApiProperty()
  customField: string;
  
  @ApiProperty({default: false})
  isEnabled: boolean;
}

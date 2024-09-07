import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomFieldDto {
  @ApiProperty({required: true})
  name: string

  @ApiProperty()
  state: string

  @ApiProperty()
  value: string
}

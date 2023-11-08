import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
  @ApiProperty({required: true})
  readonly title: string

  @ApiProperty({required: false})
  readonly tags: string[]
}

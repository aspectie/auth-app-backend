import { ApiProperty } from "@nestjs/swagger";

export class CreateCollectionDto {
  @ApiProperty({required: true})
  readonly title: string

  @ApiProperty({required: true})
  readonly description: string

  @ApiProperty({required: true})
  readonly theme: string

  @ApiProperty({required: true})
  readonly user_id: string
}

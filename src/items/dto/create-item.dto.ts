import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
  @ApiProperty()
  readonly title: string

  @ApiProperty()
  readonly _collection: string

  @ApiProperty({required: false})
  readonly tags: string[]

  @ApiProperty({required: false})
  readonly integer1: number

  @ApiProperty({required: false})
  readonly integer2: number

  @ApiProperty({required: false})
  readonly integer3: number

  @ApiProperty({required: false})
  readonly string1: string

  @ApiProperty({required: false})
  readonly string2: string

  @ApiProperty({required: false})
  readonly string3: string

  @ApiProperty({required: false})
  readonly text1: string

  @ApiProperty({required: false})
  readonly text2: string

  @ApiProperty({required: false})
  readonly text3: string

  @ApiProperty({required: false})
  readonly boolean1: boolean

  @ApiProperty({required: false})
  readonly boolean2: boolean

  @ApiProperty({required: false})
  readonly boolean3: boolean

  @ApiProperty({required: false})
  readonly date1: Date

  @ApiProperty({required: false})
  readonly date2: Date

  @ApiProperty({required: false})
  readonly date3: Date
}

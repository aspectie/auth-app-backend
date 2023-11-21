import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCollectionDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  readonly title: string

  @ApiProperty({required: true})
  @IsNotEmpty()
  readonly description: string
  
  @ApiProperty({required: true})
  @IsNotEmpty()
  readonly theme: string

  @ApiProperty({required: true})
  @IsNotEmpty()
  readonly user: string
}

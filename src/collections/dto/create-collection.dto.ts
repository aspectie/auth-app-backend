import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CustomField } from "src/customFields/schemas/customField.schema";

export class CreateCollectionDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  description: string
  
  @ApiProperty({required: true, default: '655394f303a6641a03da65fb'})
  @IsNotEmpty()
  theme: string

  @ApiProperty({required: true, default: '6548873d5aaeaf087ed41e3c'})
  @IsNotEmpty()
  user: string

  @ApiProperty({type: 'string', format: 'binary'})
  file: Express.Multer.File

  @ApiProperty({type: 'string', isArray: true})
  customFields: CustomField[]
}

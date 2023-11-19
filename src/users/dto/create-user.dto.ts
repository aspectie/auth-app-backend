import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({required: false, default: 'a'})
  readonly name: string

  @ApiProperty({default: 'a@mail.ru'})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty({default: 'a'})
  @IsNotEmpty()
  readonly password: string

  @ApiProperty({required: false})
  readonly createdAt: Date

  @ApiProperty({required: false})
  readonly loggedInAt: Date

  @ApiProperty({required: false})
  readonly isAdmin?: boolean
}

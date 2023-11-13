import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({required: false})
  readonly name?: string

  @ApiProperty({required: false})
  readonly email?: string

  @ApiProperty({required: false})
  readonly password?: string

  @ApiProperty({required: false})
  readonly isBlocked?: boolean
}

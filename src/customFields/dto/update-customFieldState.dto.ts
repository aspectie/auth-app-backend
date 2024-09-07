import { PartialType } from "@nestjs/swagger";
import { CreateCustomFieldStateDto } from "./create-customFieldState.dto";

export class UpdateCustomFieldStateDto extends PartialType(CreateCustomFieldStateDto) {}
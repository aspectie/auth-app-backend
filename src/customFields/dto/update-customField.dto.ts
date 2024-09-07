import { PartialType } from "@nestjs/swagger";
import { CreateCustomFieldDto } from "./create-customField.dto";

export class UpdateCustomFieldDto extends PartialType(CreateCustomFieldDto) {}
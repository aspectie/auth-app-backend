import { PartialType } from "@nestjs/swagger";
import { CreateCustomFieldValueDto } from "./create-customFieldValue.dto";

export class UpdateCustomFieldValueDto extends PartialType(CreateCustomFieldValueDto) {}
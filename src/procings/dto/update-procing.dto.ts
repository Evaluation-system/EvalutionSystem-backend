import { PartialType } from '@nestjs/mapped-types';
import { CreateProcingDto } from './create-procing.dto';

export class UpdateProcingDto extends PartialType(CreateProcingDto) {}

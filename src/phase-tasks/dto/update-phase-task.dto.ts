import { PartialType } from '@nestjs/mapped-types';
import { CreatePhaseTaskDto } from './create-phase-task.dto';

export class UpdatePhaseTaskDto extends PartialType(CreatePhaseTaskDto) {}

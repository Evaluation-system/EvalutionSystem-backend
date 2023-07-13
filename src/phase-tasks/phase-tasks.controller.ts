import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhaseTasksService } from './phase-tasks.service';
import { CreatePhaseTaskDto } from './dto/create-phase-task.dto';
import { UpdatePhaseTaskDto } from './dto/update-phase-task.dto';

@Controller('phase-tasks')
export class PhaseTasksController {
  constructor(private readonly phaseTasksService: PhaseTasksService) {}

  @Post()
  create(@Body() createPhaseTaskDto: CreatePhaseTaskDto) {
    return this.phaseTasksService.create(createPhaseTaskDto);
  }

  @Get()
  findAll() {
    return this.phaseTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phaseTasksService.findOne(+id);
  }

  @Get('project/:id')
  findprojectid(@Param('id') id: string) {
    return this.phaseTasksService.findphaseid(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhaseTaskDto: UpdatePhaseTaskDto) {
    return this.phaseTasksService.update(+id, updatePhaseTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phaseTasksService.remove(+id);
  }
}

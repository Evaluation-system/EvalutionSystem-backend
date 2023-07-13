import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhaseTasksService } from './phase-tasks.service';
import { CreatePhaseTaskDto } from './dto/create-phase-task.dto';
import { UpdatePhaseTaskDto } from './dto/update-phase-task.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';

@Controller('phase-tasks')
export class PhaseTasksController {
  constructor(private readonly phaseTasksService: PhaseTasksService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createPhaseTaskDto: CreatePhaseTaskDto) {
    return this.phaseTasksService.create(createPhaseTaskDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.phaseTasksService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phaseTasksService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('phase/:id')
  findphaseid(@Param('id') id: string) {
    return this.phaseTasksService.findphaseid(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhaseTaskDto: UpdatePhaseTaskDto) {
    return this.phaseTasksService.update(+id, updatePhaseTaskDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phaseTasksService.remove(+id);
  }
}

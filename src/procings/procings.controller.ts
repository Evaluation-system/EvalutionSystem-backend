import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProcingsService } from './procings.service';
import { CreateProcingDto } from './dto/create-procing.dto';
import { UpdateProcingDto } from './dto/update-procing.dto';
import RoleGuard from 'src/role/role.guard';
import { Role } from '@prisma/client';

@Controller('procings')
export class ProcingsController {
  constructor(private readonly procingsService: ProcingsService) {}

  @Post()
  create(@Body() createProcingDto: CreateProcingDto) {
    return this.procingsService.create(createProcingDto);
  }

  @Get()
  findAll() {
    return this.procingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procingsService.findOne(+id);
  }

  @Get('project/:id')
  findprojectid(@Param('id') id: string) {
    return this.procingsService.findprojectid(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcingDto: UpdateProcingDto) {
    return this.procingsService.update(+id, updateProcingDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procingsService.remove(+id);
  }
}

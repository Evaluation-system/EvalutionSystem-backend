import { Injectable } from '@nestjs/common';
import { CreatePhaseTaskDto } from './dto/create-phase-task.dto';
import { UpdatePhaseTaskDto } from './dto/update-phase-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhaseTasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.phaseTasks.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.phaseTasks.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findphaseid(phaseId: number) {
    return await this.prismaService.phaseTasks.findMany({
      where: { phaseId: phaseId },
    });
  }

  async update(id: number, UpdatePhaseTaskDto: UpdatePhaseTaskDto) {

    return await this.prismaService.phaseTasks.update({
      where: { id: id },
      data: UpdatePhaseTaskDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.phaseTasks.delete({
      where: { id: id }
    });
  }
 
  async create(CreatePhaseTaskDto: CreatePhaseTaskDto) {
    const newPhaseTask = await this.prismaService.phaseTasks.create({
      data: CreatePhaseTaskDto,
    });
    return newPhaseTask;
  }
}

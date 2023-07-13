import { Injectable } from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.phase.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.phase.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findprojectid(ProjectId: number) {
    return await this.prismaService.phase.findMany({
      where: { ProjectId: ProjectId },
    });
  }

  async update(id: number, UpdatePhaseDto: UpdatePhaseDto) {

    return await this.prismaService.phase.update({
      where: { id: id },
      data: UpdatePhaseDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.phase.delete({
      where: { id: id }
    });
  }
 
  async create(CreatePhaseDto: CreatePhaseDto) {
    const newPhase = await this.prismaService.phase.create({
      data: CreatePhaseDto,
    });
    return newPhase;
  }
}

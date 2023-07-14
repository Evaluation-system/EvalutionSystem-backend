import { Injectable } from '@nestjs/common';
import { CreateProcingDto } from './dto/create-procing.dto';
import { UpdateProcingDto } from './dto/update-procing.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProcingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
   
    return await this.prismaService.procing.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.procing.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findprojectid(ProjectId: number) {
    return await this.prismaService.procing.findMany({
      where: { projectId: ProjectId },
    });
  }

  async update(id: number, UpdateProjectDto: UpdateProcingDto) {

    return await this.prismaService.procing.update({
      where: { id: id },
      data: UpdateProjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.procing.delete({
      where: { id: id }
    });;
  }
 
  async create(CreateProcingDto: CreateProcingDto) {
    const newProcing = await this.prismaService.procing.create({
      data: CreateProcingDto,
    });;
    return newProcing;
  }
}

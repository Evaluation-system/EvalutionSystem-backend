import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {

  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
   
    return await this.prismaService.userProject.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.userProject.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, UpdateProjectDto: UpdateProjectDto) {

    return await this.prismaService.userProject.update({
      where: { id: id },
      data: UpdateProjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.userProject.delete({
      where: { id: id }
    });;
  }
 
  async create(CreateProjectDto: CreateProjectDto) {
    const newProject = await this.prismaService.userProject.create({
      data: CreateProjectDto,
    });;
    return newProject;
  }

  async finduserid(userId: number) {
    const masproject = await this.prismaService.userProject.findMany({
      where: { userId: userId },
    });
    return masproject.sort((a, b) => a.id - b.id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
   
    return await this.prismaService.task.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findprojectid(projectId: number) {
    return await this.prismaService.task.findMany({
      where: { projectId: projectId },
    });
  }

  async update(id: number, UpdateProjectDto: UpdateTaskDto) {

    return await this.prismaService.task.update({
      where: { id },
      data: UpdateProjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.task.delete({
      where: { id: id }
    });;
  }
 
  async create(CreateTaskDto: CreateTaskDto) {
    const newTask = await this.prismaService.task.create({
      data: CreateTaskDto,
    });;
    return newTask;
  }
}

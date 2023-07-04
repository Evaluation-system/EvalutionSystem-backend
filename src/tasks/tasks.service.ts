import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
   
    return await this.prismaService.tasks.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.tasks.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, UpdateProjectDto: UpdateTaskDto) {

    return await this.prismaService.tasks.update({
      where: { id: id },
      data: UpdateProjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.tasks.delete({
      where: { id: id }
    });;
  }
 
  async create(CreateTaskDto: CreateTaskDto) {
    const newTask = await this.prismaService.tasks.create({
      data: CreateTaskDto,
    });;
    return newTask;
  }
}

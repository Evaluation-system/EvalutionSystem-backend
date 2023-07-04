import { Injectable } from '@nestjs/common';
import { CreateProcingDto } from './dto/create-procing.dto';
import { UpdateProcingDto } from './dto/update-procing.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProcingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
   
    return await this.prismaService.procings.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.procings.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, UpdateProjectDto: UpdateProcingDto) {

    return await this.prismaService.procings.update({
      where: { id: id },
      data: UpdateProjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.procings.delete({
      where: { id: id }
    });;
  }
 
  async create(CreateProcingDto: CreateProcingDto) {
    const newProcing = await this.prismaService.procings.create({
      data: CreateProcingDto,
    });;
    return newProcing;
  }
}

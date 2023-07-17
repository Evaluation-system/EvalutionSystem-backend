import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhaseTaskDto } from './dto/create-phase-task.dto';
import { UpdatePhaseTaskDto } from './dto/update-phase-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class PhaseTasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.phaseTasks.findMany();
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.phaseTasks.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Task with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async findphaseid(phaseId: number) {
  //   return await this.prismaService.phaseTasks.findMany({
  //     where: { phaseId: phaseId },
  //   });
  // }
  
  async findphaseid(phaseId: number) {
    try {
      const phase =  await this.prismaService.phase.findUnique({
        where: { id: phaseId },
        include: {
          phaseTasks: true
        }
      });
      return phase.phaseTasks
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, UpdatePhaseTaskDto: UpdatePhaseTaskDto) {
    try {
      return await this.prismaService.phaseTasks.update({
        where: { id: id },
        data: UpdatePhaseTaskDto,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Task with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.phaseTasks.delete({
        where: { id: id }
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Task with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 
  async create(CreatePhaseTaskDto: CreatePhaseTaskDto) {
    try {
      const newPhaseTask = await this.prismaService.phaseTasks.create({
        data: CreatePhaseTaskDto,
      });
      return newPhaseTask;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

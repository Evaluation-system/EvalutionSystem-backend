import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class PhaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.phase.findMany();
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.phase.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Phase with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      console.log(error.code)
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findprojectid(ProjectId: number) {
    try {
      const project =  await this.prismaService.userProject.findUnique({
        where: { id: ProjectId },
        include: {
          phase: true
        }
      });
      return project.phase.sort((a, b) => a.id - b.id);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, UpdatePhaseDto: UpdatePhaseDto) {
    try {
      return await this.prismaService.phase.update({
        where: { id: id },
        data: UpdatePhaseDto,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Phase with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      console.log(error.code)
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
        return await this.prismaService.phase.delete({
        where: { id: id }
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Phase with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      console.log(error.code)
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 
  async create(CreatePhaseDto: CreatePhaseDto) {
    try {
        const newPhase = await this.prismaService.phase.create({
        data: CreatePhaseDto,
      });
      return newPhase;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.userProject.findMany();
      /*let projects   = await this.prismaService.userProject.findMany(); 
      return projects.filter( function (el)
          {
            return el.price >= 1 && el.terms >= 1
          }  
        )*/
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
    return await this.prismaService.userProject.findUnique({
      where: {
        id: id,
      },
    });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Phase with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, UpdateProjectDto: UpdateProjectDto) {
    try {
    return await this.prismaService.userProject.update({
      where: { id: id },
      data: UpdateProjectDto,
    });
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Phase with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.userProject.delete({
        where: { id: id }
      });;
    } catch (error) {
      if (error?.code === PostgresErrorCode.RecordsNotFound) {
        throw new HttpException('Phase with that id does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 
  async create(CreateProjectDto: CreateProjectDto) {
    try {
      const newProject = await this.prismaService.userProject.create({
        data: CreateProjectDto,
      });;
      return newProject;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async finduserid(userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        include: {
          projects: {orderBy: {
            id: 'asc',
          }}
        }
      });
      return user
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

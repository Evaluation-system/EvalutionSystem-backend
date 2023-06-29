import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export type User = any;


@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      email: 'dckdc@mail.com',
      password: 'changeme',
    },
  
  ];

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    let user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto?.email,
      }
    })

    if(user) throw new Error('Not unique email')

    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
   
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  /*async findOneEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  */

  async findOneEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    return await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: { id: id }
    });;
  }
}

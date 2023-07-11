import { Injectable } from '@nestjs/common';
import { CreateEmployeePaymentDto } from './dto/create-employee-payment.dto';
import { UpdateEmployeePaymentDto } from './dto/update-employee-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeePaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
   
    return await this.prismaService.employeePayments.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.employeePayments.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findprojectid(ProjectId: number) {
    return await this.prismaService.employeePayments.findMany({
      where: { ProjectId: ProjectId },
    });
  }

  async update(id: number, UpdateEmployeePaymentDto: UpdateEmployeePaymentDto) {

    return await this.prismaService.employeePayments.update({
      where: { id: id },
      data: UpdateEmployeePaymentDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.employeePayments.delete({
      where: { id: id }
    });;
  }
 
  async create(CreateEmployeePaymentDto: CreateEmployeePaymentDto) {
    const newEmployeePayment = await this.prismaService.employeePayments.create({
      data: CreateEmployeePaymentDto,
    });;
    return newEmployeePayment;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeePaymentsService } from './employee-payments.service';
import { CreateEmployeePaymentDto } from './dto/create-employee-payment.dto';
import { UpdateEmployeePaymentDto } from './dto/update-employee-payment.dto';
import RoleGuard from 'src/role/role.guard';
import { Role } from '@prisma/client';


@Controller('employee-payments')
export class EmployeePaymentsController {
  constructor(private readonly employeePaymentsService: EmployeePaymentsService) {}

  @UseGuards(RoleGuard(Role.admin))
  @Post()
  create(@Body() createEmployeePaymentDto: CreateEmployeePaymentDto) {
    return this.employeePaymentsService.create(createEmployeePaymentDto);
  }

  @Get()
  findAll() {
    return this.employeePaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePaymentsService.findOne(+id);
  }

  @Get('project/:id')
  findprojectid(@Param('id') id: string) {
    return this.employeePaymentsService.findprojectid(+id);
  }

  @UseGuards(RoleGuard(Role.admin))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeePaymentDto: UpdateEmployeePaymentDto) {
    return this.employeePaymentsService.update(+id, updateEmployeePaymentDto);
  }

  @UseGuards(RoleGuard(Role.admin))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePaymentsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeePaymentsService } from './employee-payments.service';
import { CreateEmployeePaymentDto } from './dto/create-employee-payment.dto';
import { UpdateEmployeePaymentDto } from './dto/update-employee-payment.dto';

@Controller('employee-payments')
export class EmployeePaymentsController {
  constructor(private readonly employeePaymentsService: EmployeePaymentsService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeePaymentDto: UpdateEmployeePaymentDto) {
    return this.employeePaymentsService.update(+id, updateEmployeePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePaymentsService.remove(+id);
  }
}

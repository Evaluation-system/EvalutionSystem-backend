import { Injectable } from '@nestjs/common';
import { CreateEmployeePaymentDto } from './dto/create-employee-payment.dto';
import { UpdateEmployeePaymentDto } from './dto/update-employee-payment.dto';

@Injectable()
export class EmployeePaymentsService {
  create(createEmployeePaymentDto: CreateEmployeePaymentDto) {
    return 'This action adds a new employeePayment';
  }

  findAll() {
    return `This action returns all employeePayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeePayment`;
  }

  update(id: number, updateEmployeePaymentDto: UpdateEmployeePaymentDto) {
    return `This action updates a #${id} employeePayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeePayment`;
  }
}

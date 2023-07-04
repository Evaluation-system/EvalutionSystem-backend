import { Module } from '@nestjs/common';
import { EmployeePaymentsService } from './employee-payments.service';
import { EmployeePaymentsController } from './employee-payments.controller';

@Module({
  controllers: [EmployeePaymentsController],
  providers: [EmployeePaymentsService]
})
export class EmployeePaymentsModule {}

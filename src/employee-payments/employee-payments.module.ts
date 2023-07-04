import { Module } from '@nestjs/common';
import { EmployeePaymentsService } from './employee-payments.service';
import { EmployeePaymentsController } from './employee-payments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmployeePaymentsController],
  providers: [EmployeePaymentsService, PrismaService]
})
export class EmployeePaymentsModule {}

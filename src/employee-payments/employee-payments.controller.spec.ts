import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePaymentsController } from './employee-payments.controller';
import { EmployeePaymentsService } from './employee-payments.service';

describe('EmployeePaymentsController', () => {
  let controller: EmployeePaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePaymentsController],
      providers: [EmployeePaymentsService],
    }).compile();

    controller = module.get<EmployeePaymentsController>(EmployeePaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

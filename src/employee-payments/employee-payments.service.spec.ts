import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePaymentsService } from './employee-payments.service';

describe('EmployeePaymentsService', () => {
  let service: EmployeePaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePaymentsService],
    }).compile();

    service = module.get<EmployeePaymentsService>(EmployeePaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

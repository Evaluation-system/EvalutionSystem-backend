import { Test, TestingModule } from '@nestjs/testing';
import { PhaseTasksService } from './phase-tasks.service';

describe('PhaseTasksService', () => {
  let service: PhaseTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhaseTasksService],
    }).compile();

    service = module.get<PhaseTasksService>(PhaseTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

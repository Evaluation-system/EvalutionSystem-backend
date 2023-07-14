import { Test, TestingModule } from '@nestjs/testing';
import { PhaseTasksController } from './phase-tasks.controller';
import { PhaseTasksService } from './phase-tasks.service';

describe('PhaseTasksController', () => {
  let controller: PhaseTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhaseTasksController],
      providers: [PhaseTasksService],
    }).compile();

    controller = module.get<PhaseTasksController>(PhaseTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

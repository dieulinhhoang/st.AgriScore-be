import { Test, TestingModule } from '@nestjs/testing';
import { TrainingAssessmentsController } from './training-assessments.controller';

describe('TrainingAssessmentsController', () => {
  let controller: TrainingAssessmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingAssessmentsController],
    }).compile();

    controller = module.get<TrainingAssessmentsController>(TrainingAssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

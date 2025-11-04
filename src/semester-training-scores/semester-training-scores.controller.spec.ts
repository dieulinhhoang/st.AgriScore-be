import { Test, TestingModule } from '@nestjs/testing';
import { SemesterTrainingScoresController } from './semester-training-scores.controller';

describe('SemesterTrainingScoresController', () => {
  let controller: SemesterTrainingScoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterTrainingScoresController],
    }).compile();

    controller = module.get<SemesterTrainingScoresController>(SemesterTrainingScoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

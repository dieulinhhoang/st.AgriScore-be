import { Test, TestingModule } from '@nestjs/testing';
import { SemesterTrainingScoresService } from './semester-training-scores.service';

describe('SemesterTrainingScoresService', () => {
  let service: SemesterTrainingScoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemesterTrainingScoresService],
    }).compile();

    service = module.get<SemesterTrainingScoresService>(SemesterTrainingScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

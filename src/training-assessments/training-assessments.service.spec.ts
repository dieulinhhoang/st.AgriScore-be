import { Test, TestingModule } from '@nestjs/testing';
import { TrainingAssessmentsService } from './training-assessments.service';

describe('TrainingAssessmentsService', () => {
  let service: TrainingAssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingAssessmentsService],
    }).compile();

    service = module.get<TrainingAssessmentsService>(TrainingAssessmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

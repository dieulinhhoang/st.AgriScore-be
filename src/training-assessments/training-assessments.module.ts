import { Module } from '@nestjs/common';
import { TrainingAssessmentsService } from './training-assessments.service';
import { TrainingAssessmentsController } from './training-assessments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingAssessment, TrainingAssessmentSchema } from '../schemas/index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainingAssessment.name, schema: TrainingAssessmentSchema }])
  ],
  providers: [TrainingAssessmentsService],
  controllers: [TrainingAssessmentsController],
  exports: [TrainingAssessmentsService, MongooseModule]

})
export class TrainingAssessmentsModule { }

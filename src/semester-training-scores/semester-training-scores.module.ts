import { Module } from '@nestjs/common';
import { SemesterTrainingScoresService } from './semester-training-scores.service';
import { SemesterTrainingScoresController } from './semester-training-scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {SemesterTrainingScore ,SemesterTrainingScoreSchema} from '../schemas/index';
@Module({
  imports:[
        MongooseModule.forFeature([{name:SemesterTrainingScore.name , schema:SemesterTrainingScoreSchema}])

  ],
  providers: [SemesterTrainingScoresService],
  controllers: [SemesterTrainingScoresController],
  exports:[SemesterTrainingScoresService , MongooseModule]
  
})
export class SemesterTrainingScoresModule {}

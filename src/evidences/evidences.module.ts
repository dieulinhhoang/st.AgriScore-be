import { Module } from '@nestjs/common';
import { EvidencesService } from './evidences.service';
import { EvidencesController } from './evidences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evidence, EvidenceSchema } from '../schemas/index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evidence.name, schema: EvidenceSchema }])

  ],
  providers: [EvidencesService],
  controllers: [EvidencesController],

})
export class EvidencesModule { }

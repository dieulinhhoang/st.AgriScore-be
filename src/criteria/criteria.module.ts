import { Module } from '@nestjs/common';
import { CriteriaService } from './criteria.service';
import { CriteriaController } from './criteria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Criteria, CriteriaSchema } from '../schemas/index';

@Module({
  imports:[
    MongooseModule.forFeature([{name : Criteria.name , schema : CriteriaSchema}])
  ],
  providers: [CriteriaService],
  controllers: [CriteriaController]
  
})
export class CriteriaModule {}

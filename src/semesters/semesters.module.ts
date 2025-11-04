import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersController } from './semesters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Semester, SemesterSchema} from '../schemas/index';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Semester.name , schema:SemesterSchema}])
  ],
  providers: [SemestersService],
  controllers: [SemestersController],
  exports:[MongooseModule,SemestersService]
})
export class SemestersModule {}

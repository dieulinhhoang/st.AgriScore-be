import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Faculty, FacultySchema } from '../schemas/index';
import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller';

@Module({
  imports: [
    //  đăng ký model
    MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
  ],
  controllers: [FacultiesController],
  providers: [FacultiesService],
  
   exports: [MongooseModule, FacultiesService], 
})
export class FacultiesModule {}
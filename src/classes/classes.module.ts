import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class, ClassSchema } from '../schemas/index'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),

  ],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [MongooseModule, ClassesService]
})
export class ClassesModule { }

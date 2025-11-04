import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FacultiesModule } from './faculties/faculties.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { SemestersModule } from './semesters/semesters.module';
import { CriteriaModule } from './criteria/criteria.module';
import { TrainingAssessmentsModule } from './training-assessments/training-assessments.module';
import { EvidencesModule } from './evidences/evidences.module';
import { SemesterTrainingScoresModule } from './semester-training-scores/semester-training-scores.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
      inject: [ConfigService],
    }),

 
    AuthModule,
    UsersModule,  
    FacultiesModule,
    ClassesModule,
    StudentsModule,
    SemestersModule,
    CriteriaModule,
    TrainingAssessmentsModule,
    EvidencesModule,
    SemesterTrainingScoresModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
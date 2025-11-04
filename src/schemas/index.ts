import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ===== USER SCHEMA =====
export enum UserRole {
  STUDENT = 'student',
  CLASS_OFFICER = 'class_officer',
  FACULTY_OFFICER = 'faculty_officer',
  SCHOOL_OFFICER = 'school_officer',
  ADMIN = 'admin',
}

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);

// ===== FACULTY SCHEMA =====
@Schema({ timestamps: true, collection: 'faculties' })
export class Faculty extends Document {
  @Prop({ required: true, unique: true })
  facultyCode: string;

  @Prop({ required: true })
  facultyName: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deanId?: Types.ObjectId;

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}
export const FacultySchema = SchemaFactory.createForClass(Faculty);

// ===== CLASS SCHEMA =====
@Schema({ timestamps: true, collection: 'classes' })
export class Class extends Document {
  @Prop({ required: true, unique: true })
  classCode: string;

  @Prop({ required: true })
  className: string;

  @Prop({ type: Types.ObjectId, ref: 'Faculty', required: true })
  facultyId: Types.ObjectId;

  @Prop({ required: true })
  academicYear: string;

  @Prop({ required: true })
  course: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  classOfficerId?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}
export const ClassSchema = SchemaFactory.createForClass(Class);

// ===== STUDENT SCHEMA =====
@Schema({ timestamps: true, collection: 'students' })
export class Student extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  studentCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  gender?: string;

  @Prop()
  address?: string;

  @Prop()
  hometown?: string;

  @Prop({ required: true })
  enrollmentYear: number;

  @Prop({ default: 'studying' })
  status: string;

  @Prop()
  major?: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);

// ===== SEMESTER SCHEMA =====
@Schema({ timestamps: true, collection: 'semesters' })
export class Semester extends Document {
  @Prop({ required: true, unique: true })
  semesterCode: string;

  @Prop({ required: true })
  semesterName: string;

  @Prop({ required: true })
  academicYear: string;

  @Prop({ required: true })
  semesterNumber: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: Object })
  deadlines: {
    selfAssessment: Date;
    classAssessment: Date;
    facultyAssessment: Date;
    schoolAssessment: Date;
  };
}
export const SemesterSchema = SchemaFactory.createForClass(Semester);

// ===== CRITERIA SCHEMA =====
@Schema({ timestamps: true, collection: 'criteria' })
export class Criteria extends Document {
  @Prop({ required: true, unique: true })
  criteriaCode: string;

  @Prop({ required: true })
  criteriaName: string;

  @Prop({ type: Types.ObjectId, ref: 'Criteria' })
  parentId?: Types.ObjectId;

  @Prop({ required: true })
  maxScore: number;

  @Prop({ required: true })
  level: number;

  @Prop()
  description?: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}
export const CriteriaSchema = SchemaFactory.createForClass(Criteria);

// ===== TRAINING ASSESSMENT SCHEMA =====
@Schema({ timestamps: true, collection: 'trainingassessments' })
export class TrainingAssessment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Semester', required: true })
  semesterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Criteria', required: true })
  criteriaId: Types.ObjectId;

  @Prop({ default: 0 })
  selfScore: number;

  @Prop()
  classScore?: number;

  @Prop()
  facultyScore?: number;

  @Prop()
  schoolScore?: number;

  @Prop()
  selfNote?: string;

  @Prop()
  classNote?: string;

  @Prop()
  facultyNote?: string;

  @Prop()
  schoolNote?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  classAssessorId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  facultyAssessorId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  schoolAssessorId?: Types.ObjectId;

  @Prop()
  selfAssessedAt?: Date;

  @Prop()
  classAssessedAt?: Date;

  @Prop()
  facultyAssessedAt?: Date;

  @Prop()
  schoolAssessedAt?: Date;

  @Prop({ default: 'draft' })
  status: string;
}
export const TrainingAssessmentSchema = SchemaFactory.createForClass(TrainingAssessment);

// ===== EVIDENCE SCHEMA =====
@Schema({ timestamps: true, collection: 'evidences' })
export class Evidence extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Semester', required: true })
  semesterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Criteria', required: true })
  criteriaId: Types.ObjectId;

  @Prop({ required: true })
  evidenceName: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  filePath: string;

  @Prop()
  fileType?: string;

  @Prop()
  fileSize?: number;

  @Prop({ default: false })
  isVerified: boolean;
}
export const EvidenceSchema = SchemaFactory.createForClass(Evidence);

// ===== SEMESTER TRAINING SCORE SCHEMA =====
@Schema({ timestamps: true, collection: 'semestertrainingscores' })
export class SemesterTrainingScore extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Semester', required: true })
  semesterId: Types.ObjectId;

  @Prop({ default: 0 })
  totalSelfScore: number;

  @Prop()
  totalClassScore?: number;

  @Prop()
  totalFacultyScore?: number;

  @Prop()
  totalSchoolScore?: number;

  @Prop()
  classification?: string;

  @Prop({ default: 'not_started' })
  overallStatus: string;

  @Prop()
  selfCompletedAt?: Date;

  @Prop()
  classCompletedAt?: Date;

  @Prop()
  facultyCompletedAt?: Date;

  @Prop()
  schoolCompletedAt?: Date;
}
export const SemesterTrainingScoreSchema = SchemaFactory.createForClass(SemesterTrainingScore);

// ===== NOTIFICATION SCHEMA =====
@Schema({ timestamps: true, collection: 'notifications' })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  content?: string;

  @Prop({ required: true })
  notificationType: string;

  @Prop({ type: Types.ObjectId })
  relatedId?: Types.ObjectId;

  @Prop()
  relatedType?: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  readAt?: Date;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);

// Export all schemas
export const schemas = [
  { name: User.name, schema: UserSchema },
  { name: Faculty.name, schema: FacultySchema },
  { name: Class.name, schema: ClassSchema },
  { name: Student.name, schema: StudentSchema },
  { name: Semester.name, schema: SemesterSchema },
  { name: Criteria.name, schema: CriteriaSchema },
  { name: TrainingAssessment.name, schema: TrainingAssessmentSchema },
  { name: Evidence.name, schema: EvidenceSchema },
  { name: SemesterTrainingScore.name, schema: SemesterTrainingScoreSchema },
  { name: Notification.name, schema: NotificationSchema },
];
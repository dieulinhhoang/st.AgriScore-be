// =============================================
// COMPLETE SEED DATA - HỆ THỐNG ĐIỂM RÈN LUYỆN VNUA
// Quy trình: Sinh viên → Lớp → Khoa → Trường
// =============================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Connection } from 'mongoose';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  User,
  Faculty,
  Class,
  Student,
  Semester,
  Criteria,
  TrainingAssessment,
  Evidence,
  SemesterTrainingScore,
  Notification,
} from './index';
async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const connection: Connection = app.get(getConnectionToken());

  console.log('🌱 Starting seed...');
  console.log('📊 Database:', connection.name);

  // Get all models
  const UserModel = app.get(getModelToken(User.name));
  const FacultiesModule = app.get(getModelToken(Faculty.name));
  const ClassModel = app.get(getModelToken(Class.name));
  const StudentModel = app.get(getModelToken(Student.name)); 
  const SemesterModel = app.get(getModelToken(Semester.name));
  const CriteriaModel = app.get(getModelToken(Criteria.name));
  const TrainingAssessmentModel = app.get(
    getModelToken(TrainingAssessment.name),
  );
  const EvidenceModel = app.get(getModelToken(Evidence.name));
  const SemesterTrainingScoreModel = app.get(
    getModelToken(SemesterTrainingScore.name),
  );
  const NotificationModel = app.get(getModelToken(Notification.name));

  // Clear existing data
  console.log('🗑️  Clearing old data...');
  await Promise.all([
    UserModel.deleteMany({}),
    FacultiesModule.deleteMany({}),
    ClassModel.deleteMany({}),
    StudentModel.deleteMany({}),
    SemesterModel.deleteMany({}),
    CriteriaModel.deleteMany({}),
    TrainingAssessmentModel.deleteMany({}),
    EvidenceModel.deleteMany({}),
    SemesterTrainingScoreModel.deleteMany({}),
    NotificationModel.deleteMany({}),
  ]);

  const hashedPassword = await bcrypt.hash('123456', 10);

  // =============================================
  // 1. CREATE USERS (Theo 4 cấp)
  // =============================================
  console.log('👥 Creating users...');
  const users = await UserModel.insertMany([
    // ADMIN
    {
      username: 'admin',
      passwordHash: hashedPassword,
      fullName: 'Quản trị hệ thống',
      email: 'admin@vnua.edu.vn',
      phone: '0243826512',
      role: 'admin',
      isActive: true,
    },

    // CẤP TRƯỜNG (School Officers)
    {
      username: 'school_officer1',
      passwordHash: hashedPassword,
      fullName: 'Phó Hiệu trưởng - Nguyễn Văn Hiệu',
      email: 'phohieutruong@vnua.edu.vn',
      phone: '0912000001',
      role: 'school_officer',
      isActive: true,
    },
    {
      username: 'school_officer2',
      passwordHash: hashedPassword,
      fullName: 'Trưởng phòng CTSV - Trần Thị Mai',
      email: 'truongphong.ctsv@vnua.edu.vn',
      phone: '0912000002',
      role: 'school_officer',
      isActive: true,
    },

    // CẤP KHOA (Faculty Officers) - Khoa CNTT
    {
      username: 'faculty_cntt',
      passwordHash: hashedPassword,
      fullName: 'Trưởng khoa CNTT - TS. Lê Văn Bình',
      email: 'truongkhoa.cntt@vnua.edu.vn',
      phone: '0912100001',
      role: 'faculty_officer',
      isActive: true,
    },
    {
      username: 'faculty_cntt_pho',
      passwordHash: hashedPassword,
      fullName: 'Phó khoa CNTT - ThS. Phạm Thị Hoa',
      email: 'phokhoa.cntt@vnua.edu.vn',
      phone: '0912100002',
      role: 'faculty_officer',
      isActive: true,
    },

    // CẤP KHOA - Khoa Kinh tế
    {
      username: 'faculty_kt',
      passwordHash: hashedPassword,
      fullName: 'Trưởng khoa Kinh tế - PGS. Hoàng Văn Kiên',
      email: 'truongkhoa.kt@vnua.edu.vn',
      phone: '0912200001',
      role: 'faculty_officer',
      isActive: true,
    },

    // CẤP LỚP (Class Officers) - GVCN Khoa CNTT
    {
      username: 'gvcn_cntt_k1',
      passwordHash: hashedPassword,
      fullName: 'GVCN CNTT K1 - ThS. Đỗ Minh Tuấn',
      email: 'gvcn.cntt.k1@vnua.edu.vn',
      phone: '0913100001',
      role: 'class_officer',
      isActive: true,
    },
    {
      username: 'gvcn_cntt_k2',
      passwordHash: hashedPassword,
      fullName: 'GVCN CNTT K2 - ThS. Nguyễn Thị Lan',
      email: 'gvcn.cntt.k2@vnua.edu.vn',
      phone: '0913100002',
      role: 'class_officer',
      isActive: true,
    },

    // CẤP LỚP - GVCN Khoa Kinh tế
    {
      username: 'gvcn_kt_k1',
      passwordHash: hashedPassword,
      fullName: 'GVCN KT K1 - ThS. Vũ Thị Hương',
      email: 'gvcn.kt.k1@vnua.edu.vn',
      phone: '0913200001',
      role: 'class_officer',
      isActive: true,
    },

    // SINH VIÊN - Khoa CNTT K1 (10 sinh viên)
    {
      username: '650101001',
      passwordHash: hashedPassword,
      fullName: 'Nguyễn Văn An',
      email: '650101001@sv.vnua.edu.vn',
      phone: '0961111001',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101002',
      passwordHash: hashedPassword,
      fullName: 'Trần Thị Bình',
      email: '650101002@sv.vnua.edu.vn',
      phone: '0961111002',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101003',
      passwordHash: hashedPassword,
      fullName: 'Lê Văn Cường',
      email: '650101003@sv.vnua.edu.vn',
      phone: '0961111003',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101004',
      passwordHash: hashedPassword,
      fullName: 'Phạm Thị Dung',
      email: '650101004@sv.vnua.edu.vn',
      phone: '0961111004',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101005',
      passwordHash: hashedPassword,
      fullName: 'Hoàng Văn Em',
      email: '650101005@sv.vnua.edu.vn',
      phone: '0961111005',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101006',
      passwordHash: hashedPassword,
      fullName: 'Vũ Thị Hoa',
      email: '650101006@sv.vnua.edu.vn',
      phone: '0961111006',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101007',
      passwordHash: hashedPassword,
      fullName: 'Đặng Văn Khoa',
      email: '650101007@sv.vnua.edu.vn',
      phone: '0961111007',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101008',
      passwordHash: hashedPassword,
      fullName: 'Bùi Thị Lan',
      email: '650101008@sv.vnua.edu.vn',
      phone: '0961111008',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101009',
      passwordHash: hashedPassword,
      fullName: 'Ngô Văn Minh',
      email: '650101009@sv.vnua.edu.vn',
      phone: '0961111009',
      role: 'student',
      isActive: true,
    },
    {
      username: '650101010',
      passwordHash: hashedPassword,
      fullName: 'Trương Thị Nga',
      email: '650101010@sv.vnua.edu.vn',
      phone: '0961111010',
      role: 'student',
      isActive: true,
    },

    // SINH VIÊN - Khoa Kinh tế K1 (5 sinh viên)
    {
      username: '650201001',
      passwordHash: hashedPassword,
      fullName: 'Phan Văn Phú',
      email: '650201001@sv.vnua.edu.vn',
      phone: '0962222001',
      role: 'student',
      isActive: true,
    },
    {
      username: '650201002',
      passwordHash: hashedPassword,
      fullName: 'Đinh Thị Quỳnh',
      email: '650201002@sv.vnua.edu.vn',
      phone: '0962222002',
      role: 'student',
      isActive: true,
    },
    {
      username: '650201003',
      passwordHash: hashedPassword,
      fullName: 'Cao Văn Sơn',
      email: '650201003@sv.vnua.edu.vn',
      phone: '0962222003',
      role: 'student',
      isActive: true,
    },
    {
      username: '650201004',
      passwordHash: hashedPassword,
      fullName: 'Lý Thị Thảo',
      email: '650201004@sv.vnua.edu.vn',
      phone: '0962222004',
      role: 'student',
      isActive: true,
    },
    {
      username: '650201005',
      passwordHash: hashedPassword,
      fullName: 'Mai Văn Uyên',
      email: '650201005@sv.vnua.edu.vn',
      phone: '0962222005',
      role: 'student',
      isActive: true,
    },
  ]);
  console.log(`✅ Created ${users.length} users`);

  // =============================================
  // 2. CREATE FACULTIES (Khoa)
  // =============================================
  console.log('🏛️  Creating faculties...');
  const facultyOfficerCNTT = users.find(u => u.username === 'faculty_cntt');
  const facultyOfficerKT = users.find(u => u.username === 'faculty_kt');

  const faculties = await FacultiesModule.insertMany([
    {
      facultyCode: 'CNTT',
      facultyName: 'Khoa Công nghệ Thông tin',
      deanId: facultyOfficerCNTT._id,
      description: 'Khoa đào tạo về Công nghệ thông tin, Khoa học máy tính',
      isActive: true,
    },
    {
      facultyCode: 'KT',
      facultyName: 'Khoa Kinh tế và Phát triển Nông thôn',
      deanId: facultyOfficerKT._id,
      description: 'Khoa đào tạo về Kinh tế, Quản trị kinh doanh',
      isActive: true,
    },
    {
      facultyCode: 'NN',
      facultyName: 'Khoa Nông học',
      description: 'Khoa đào tạo về Nông nghiệp, Trồng trọt',
      isActive: true,
    },
  ]);
  console.log(`✅ Created ${faculties.length} faculties`);

  // =============================================
  // 3. CREATE CLASSES (Lớp)
  // =============================================
  console.log('🎓 Creating classes...');
  const facultyCNTT = faculties.find(f => f.facultyCode === 'CNTT');
  const facultyKT = faculties.find(f => f.facultyCode === 'KT');

  const gvcnCNTT_K1 = users.find(u => u.username === 'gvcn_cntt_k1');
  const gvcnCNTT_K2 = users.find(u => u.username === 'gvcn_cntt_k2');
  const gvcnKT_K1 = users.find(u => u.username === 'gvcn_kt_k1');

  const classes = await ClassModel.insertMany([
    {
      classCode: 'CNTT65-K1',
      className: 'Công nghệ Thông tin K65 - Lớp 1',
      facultyId: facultyCNTT._id,
      academicYear: '2023-2024',
      course: 65,
      classOfficerId: gvcnCNTT_K1._id,
      isActive: true,
    },
    {
      classCode: 'CNTT65-K2',
      className: 'Công nghệ Thông tin K65 - Lớp 2',
      facultyId: facultyCNTT._id,
      academicYear: '2023-2024',
      course: 65,
      classOfficerId: gvcnCNTT_K2._id,
      isActive: true,
    },
    {
      classCode: 'KT65-K1',
      className: 'Kinh tế K65 - Lớp 1',
      facultyId: facultyKT._id,
      academicYear: '2023-2024',
      course: 65,
      classOfficerId: gvcnKT_K1._id,
      isActive: true,
    },
  ]);
  console.log(`✅ Created ${classes.length} classes`);

  // =============================================
  // 4. CREATE STUDENTS (Sinh viên)
  // =============================================
  console.log('🎒 Creating students...');
  const studentUsers = users.filter(u => u.role === 'student');
  const classCNTT_K1 = classes.find(c => c.classCode === 'CNTT65-K1');
  const classKT_K1 = classes.find(c => c.classCode === 'KT65-K1');

  const students = await StudentModel.insertMany([
    // Sinh viên CNTT K1 (10 SV)
    ...studentUsers.slice(0, 10).map((user, index) => ({
      userId: user._id,
      studentCode: user.username,
      classId: classCNTT_K1._id,
      dateOfBirth: new Date(`2002-${String(index + 1).padStart(2, '0')}-15`),
      gender: index % 2 === 0 ? 'male' : 'female',
      address: 'Hà Nội',
      hometown: ['Hà Nam', 'Hải Dương', 'Nam Định', 'Thái Bình', 'Hưng Yên'][index % 5],
      enrollmentYear: 2020,
      status: 'studying',
      major: 'Công nghệ Thông tin',
    })),

    // Sinh viên KT K1 (5 SV)
    ...studentUsers.slice(10, 15).map((user, index) => ({
      userId: user._id,
      studentCode: user.username,
      classId: classKT_K1._id,
      dateOfBirth: new Date(`2002-${String(index + 6).padStart(2, '0')}-20`),
      gender: index % 2 === 0 ? 'male' : 'female',
      address: 'Hà Nội',
      hometown: ['Bắc Ninh', 'Vĩnh Phúc', 'Phú Thọ'][index % 3],
      enrollmentYear: 2020,
      status: 'studying',
      major: 'Kinh tế',
    })),
  ]);
  console.log(`✅ Created ${students.length} students`);

  // =============================================
  // 5. CREATE SEMESTERS (Học kỳ)
  // =============================================
  console.log('📅 Creating semesters...');
  const semesters = await SemesterModel.insertMany([
    {
      semesterCode: 'HK1-2023-2024',
      semesterName: 'Học kỳ 1 năm học 2023-2024',
      academicYear: '2023-2024',
      semesterNumber: 1,
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-01-15'),
      isActive: false,
      deadlines: {
        selfAssessment: new Date('2024-01-10'),
        classAssessment: new Date('2024-01-15'),
        facultyAssessment: new Date('2024-01-20'),
        schoolAssessment: new Date('2024-01-25'),
      },
    },
    {
      semesterCode: 'HK2-2023-2024',
      semesterName: 'Học kỳ 2 năm học 2023-2024',
      academicYear: '2023-2024',
      semesterNumber: 2,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-06-15'),
      isActive: true,
      deadlines: {
        selfAssessment: new Date('2024-06-20'),
        classAssessment: new Date('2024-06-25'),
        facultyAssessment: new Date('2024-06-30'),
        schoolAssessment: new Date('2024-07-05'),
      },
    },
  ]);
  console.log(`✅ Created ${semesters.length} semesters`);

  const activeSemester = semesters.find(s => s.isActive);

  // =============================================
  // 6. CREATE CRITERIA (Tiêu chí - 5 Điều + Chi tiết)
  // =============================================
  console.log('📋 Creating criteria...');

  // Điều 1: Ý thức học tập (25 điểm)
  const dieu1 = await CriteriaModel.create({
    criteriaCode: 'I',
    criteriaName: 'Điều 1: Ý thức và kết quả trong học tập',
    parentId: null,
    maxScore: 25,
    level: 1,
    displayOrder: 1,
    description: 'Đánh giá ý thức học tập và kết quả học tập',
    isActive: true,
  });

  await CriteriaModel.insertMany([
    {
      criteriaCode: 'I.1',
      criteriaName: 'Ý thức và thái độ học tập tốt, không vi phạm quy chế học tập',
      parentId: dieu1._id,
      maxScore: 10,
      level: 2,
      displayOrder: 1,
      isActive: true,
    },
    {
      criteriaCode: 'I.2',
      criteriaName: 'Kết quả học tập đạt từ Giỏi trở lên (GPA >= 3.6)',
      parentId: dieu1._id,
      maxScore: 15,
      level: 2,
      displayOrder: 2,
      isActive: true,
    },
  ]);

  // Điều 2: Trách nhiệm công dân (25 điểm)
  const dieu2 = await CriteriaModel.create({
    criteriaCode: 'II',
    criteriaName: 'Điều 2: Ý thức và trách nhiệm công dân',
    parentId: null,
    maxScore: 25,
    level: 1,
    displayOrder: 2,
    description: 'Đánh giá ý thức công dân và trách nhiệm xã hội',
    isActive: true,
  });

  await CriteriaModel.insertMany([
    {
      criteriaCode: 'II.1',
      criteriaName: 'Chấp hành tốt chủ trương, chính sách của Đảng, pháp luật của Nhà nước',
      parentId: dieu2._id,
      maxScore: 10,
      level: 2,
      displayOrder: 1,
      isActive: true,
    },
    {
      criteriaCode: 'II.2',
      criteriaName: 'Tham gia đầy đủ các hoạt động chính trị - xã hội',
      parentId: dieu2._id,
      maxScore: 10,
      level: 2,
      displayOrder: 2,
      isActive: true,
    },
    {
      criteriaCode: 'II.3',
      criteriaName: 'Có ý thức tham gia các hoạt động tập thể',
      parentId: dieu2._id,
      maxScore: 5,
      level: 2,
      displayOrder: 3,
      isActive: true,
    },
  ]);

  // Điều 3: Hoạt động văn hóa, thể thao (20 điểm)
  const dieu3 = await CriteriaModel.create({
    criteriaCode: 'III',
    criteriaName: 'Điều 3: Ý thức và kết quả tham gia hoạt động văn hóa, văn nghệ, thể thao',
    parentId: null,
    maxScore: 20,
    level: 1,
    displayOrder: 3,
    description: 'Đánh giá tham gia hoạt động ngoại khóa',
    isActive: true,
  });

  await CriteriaModel.insertMany([
    {
      criteriaCode: 'III.1',
      criteriaName: 'Tham gia các hoạt động văn hóa, văn nghệ',
      parentId: dieu3._id,
      maxScore: 10,
      level: 2,
      displayOrder: 1,
      isActive: true,
    },
    {
      criteriaCode: 'III.2',
      criteriaName: 'Tham gia các hoạt động thể dục, thể thao',
      parentId: dieu3._id,
      maxScore: 10,
      level: 2,
      displayOrder: 2,
      isActive: true,
    },
  ]);

  // Điều 4: Phẩm chất công dân (25 điểm)
  const dieu4 = await CriteriaModel.create({
    criteriaCode: 'IV',
    criteriaName: 'Điều 4: Phẩm chất công dân và ý thức cộng đồng',
    parentId: null,
    maxScore: 25,
    level: 1,
    displayOrder: 4,
    description: 'Đánh giá phẩm chất đạo đức, lối sống',
    isActive: true,
  });

  await CriteriaModel.insertMany([
    {
      criteriaCode: 'IV.1',
      criteriaName: 'Ý thức chấp hành nghiêm túc nội quy, quy chế của nhà trường',
      parentId: dieu4._id,
      maxScore: 15,
      level: 2,
      displayOrder: 1,
      isActive: true,
    },
    {
      criteriaCode: 'IV.2',
      criteriaName: 'Có lối sống lành mạnh, trung thực, có văn hóa trong giao tiếp',
      parentId: dieu4._id,
      maxScore: 10,
      level: 2,
      displayOrder: 2,
      isActive: true,
    },
  ]);

  // Điều 5: Hội nhập và thích ứng (5 điểm)
  const dieu5 = await CriteriaModel.create({
    criteriaCode: 'V',
    criteriaName: 'Điều 5: Ý thức và kết quả trong học tập, rèn luyện của sinh viên',
    parentId: null,
    maxScore: 5,
    level: 1,
    displayOrder: 5,
    description: 'Đánh giá khả năng thích ứng và hội nhập',
    isActive: true,
  });

  await CriteriaModel.insertMany([
    {
      criteriaCode: 'V.1',
      criteriaName: 'Thích ứng và hòa nhập tốt với môi trường học tập',
      parentId: dieu5._id,
      maxScore: 3,
      level: 2,
      displayOrder: 1,
      isActive: true,
    },
    {
      criteriaCode: 'V.2',
      criteriaName: 'Tinh thần hợp tác, giúp đỡ bạn bè trong học tập',
      parentId: dieu5._id,
      maxScore: 2,
      level: 2,
      displayOrder: 2,
      isActive: true,
    },
  ]);

  const criteriaCount = await CriteriaModel.countDocuments();
  console.log(`✅ Created ${criteriaCount} criteria`);

  const allCriteria = await CriteriaModel.find({ level: 2 }); // Chỉ lấy tiêu chí level 2 để chấm

  // =============================================
  // 7. CREATE ASSESSMENTS (Đánh giá với 4 cấp)
  // =============================================
  console.log('📝 Creating training assessments...');

  // Lấy 5 sinh viên đầu để tạo đánh giá mẫu
  const sampleStudents = students.slice(0, 5);

  const assessments: any[] = [];

  for (const [studentIndex, student] of sampleStudents.entries()) {
    for (const criterion of allCriteria) {
      const maxScore = criterion.maxScore;

      // Sinh điểm ngẫu nhiên
      const selfScore = Math.floor(Math.random() * (maxScore * 0.2)) + Math.floor(maxScore * 0.8);

      let status, classScore, facultyScore, schoolScore;
      let classNote, facultyNote, schoolNote;
      let classAssessor, facultyAssessor, schoolAssessor;
      let classAssessedAt, facultyAssessedAt, schoolAssessedAt;

      // Tạo các trạng thái khác nhau cho từng SV
      if (studentIndex === 0) {
        // SV 1: Đã hoàn thành hết 4 cấp
        status = 'completed';
        classScore = Math.min(selfScore, maxScore);
        facultyScore = classScore;
        schoolScore = facultyScore;
        classNote = 'Sinh viên có ý thức học tập tốt, tham gia đầy đủ các hoạt động';
        facultyNote = 'Đồng ý với đánh giá của lớp';
        schoolNote = 'Phê duyệt';
        classAssessor = gvcnCNTT_K1._id;
        facultyAssessor = facultyOfficerCNTT._id;
        schoolAssessor = users.find(u => u.username === 'school_officer1')._id;
        classAssessedAt = new Date('2024-06-23T10:30:00');
        facultyAssessedAt = new Date('2024-06-28T14:00:00');
        schoolAssessedAt = new Date('2024-07-02T16:00:00');
      } else if (studentIndex === 1) {
        // SV 2: Đang chờ trường duyệt (đã qua khoa)
        status = 'school_reviewing';
        classScore = Math.min(selfScore, maxScore);
        facultyScore = classScore;
        schoolScore = null;
        classNote = 'Sinh viên tích cực tham gia hoạt động';
        facultyNote = 'Đồng ý với đánh giá của lớp';
        schoolNote = null;
        classAssessor = gvcnCNTT_K1._id;
        facultyAssessor = facultyOfficerCNTT._id;
        schoolAssessor = null;
        classAssessedAt = new Date('2024-06-24T09:15:00');
        facultyAssessedAt = new Date('2024-06-29T11:30:00');
        schoolAssessedAt = null;
      } else if (studentIndex === 2) {
        // SV 3: Đang chờ khoa duyệt (đã qua lớp)
        status = 'faculty_reviewing';
        classScore = Math.min(selfScore, maxScore);
        facultyScore = null;
        schoolScore = null;
        classNote = 'Sinh viên có tinh thần trách nhiệm cao';
        facultyNote = null;
        schoolNote = null;
        classAssessor = gvcnCNTT_K1._id;
        facultyAssessor = null;
        schoolAssessor = null;
        classAssessedAt = new Date('2024-06-24T11:00:00');
        facultyAssessedAt = null;
        schoolAssessedAt = null;
      } else if (studentIndex === 3) {
        // SV 4: Đang chờ lớp duyệt (SV đã nộp)
        status = 'class_reviewing';
        classScore = null;
        facultyScore = null;
        schoolScore = null;
        classNote = null;
        facultyNote = null;
        schoolNote = null;
        classAssessor = null;
        facultyAssessor = null;
        schoolAssessor = null;
        classAssessedAt = null;
        facultyAssessedAt = null;
        schoolAssessedAt = null;
      } else {
        // SV 5: Đã nộp (submitted), chờ lớp xử lý
        status = 'submitted';
        classScore = null;
        facultyScore = null;
        schoolScore = null;
        classNote = null;
        facultyNote = null;
        schoolNote = null;
        classAssessor = null;
        facultyAssessor = null;
        schoolAssessor = null;
        classAssessedAt = null;
        facultyAssessedAt = null;
        schoolAssessedAt = null;
      }

      assessments.push({
        studentId: student._id,
        semesterId: activeSemester._id,
        criteriaId: criterion._id,
        selfScore: selfScore,
        classScore: classScore,
        facultyScore: facultyScore,
        schoolScore: schoolScore,
        selfNote: 'Tôi đã tham gia đầy đủ và hoàn thành tốt tiêu chí này',
        classNote: classNote,
        facultyNote: facultyNote,
        schoolNote: schoolNote,
        classAssessorId: classAssessor,
        facultyAssessorId: facultyAssessor,
        schoolAssessorId: schoolAssessor,
        selfAssessedAt: new Date('2024-06-19T' + String(8 + studentIndex).padStart(2, '0') + ':00:00'),
        classAssessedAt: classAssessedAt,
        facultyAssessedAt: facultyAssessedAt,
        schoolAssessedAt: schoolAssessedAt,
        status: status,
      });
    }
  }

  await TrainingAssessmentModel.insertMany(assessments);
  console.log(`✅ Created ${assessments.length} training assessments`);

  // =============================================
  // 8. CREATE EVIDENCES (Minh chứng)
  // =============================================
  console.log('📎 Creating evidences...');

  const evidences: any[] = [];
  const someCriteria = allCriteria.slice(0, 5); // Lấy 5 tiêu chí đầu

  for (const student of sampleStudents.slice(0, 3)) {
    for (const criterion of someCriteria) {
      evidences.push({
        studentId: student._id,
        semesterId: activeSemester._id,
        criteriaId: criterion._id,
        evidenceName: `Minh chứng ${criterion.criteriaCode} - ${student.studentCode}`,
        description: `Giấy xác nhận, chứng chỉ tham gia hoạt động ${criterion.criteriaName}`,
        filePath: `/uploads/evidences/${student.studentCode}/${criterion.criteriaCode}_${Date.now()}.pdf`,
        fileType: 'application/pdf',
        fileSize: Math.floor(Math.random() * 2000000) + 500000,
        isVerified: true,
      });
    }
  }

  await EvidenceModel.insertMany(evidences);
  console.log(`✅ Created ${evidences.length} evidences`);

  // =============================================
  // 9. CREATE SEMESTER TRAINING SCORES (Tổng điểm)
  // =============================================
  console.log('📊 Creating semester training scores...');

  const scores: any[] = [];

  for (const [index, student] of sampleStudents.entries()) {
    let totalSelf = 0;
    let totalClass = 0;
    let totalFaculty = 0;
    let totalSchool = 0;

    // Tính tổng điểm từ assessments
    const studentAssessments = assessments.filter((a: any) =>
      a.studentId.toString() === student._id.toString()
    );

    for (const assessment of studentAssessments) {
      totalSelf += assessment.selfScore;
      if (assessment.classScore !== null) totalClass += assessment.classScore;
      if (assessment.facultyScore !== null) totalFaculty += assessment.facultyScore;
      if (assessment.schoolScore !== null) totalSchool += assessment.schoolScore;
    }

    // Xếp loại dựa trên điểm chính thức (school score)
    let classification: string | null = null;
    if (totalSchool > 0) {
      if (totalSchool >= 90) classification = 'excellent';
      else if (totalSchool >= 80) classification = 'good';
      else if (totalSchool >= 65) classification = 'average';
      else if (totalSchool >= 50) classification = 'weak';
      else classification = 'poor';
    }

    // Trạng thái tổng thể
    let overallStatus;
    if (index === 0) overallStatus = 'completed';
    else if (index === 1) overallStatus = 'school_reviewing';
    else if (index === 2) overallStatus = 'faculty_reviewing';
    else if (index === 3) overallStatus = 'class_reviewing';
    else overallStatus = 'self_assessing';

    scores.push({
      studentId: student._id,
      semesterId: activeSemester._id,
      totalSelfScore: totalSelf,
      totalClassScore: index >= 1 ? totalClass : null,
      totalFacultyScore: index >= 2 ? totalFaculty : null,
      totalSchoolScore: index === 0 ? totalSchool : null,
      classification: classification,
      overallStatus: overallStatus,
      selfCompletedAt: new Date('2024-06-19T' + String(8 + index).padStart(2, '0') + ':30:00'),
      classCompletedAt: index <= 2 ? new Date('2024-06-24T10:00:00') : null,
      facultyCompletedAt: index <= 1 ? new Date('2024-06-29T15:00:00') : null,
      schoolCompletedAt: index === 0 ? new Date('2024-07-02T16:30:00') : null,
    });
  }

  await SemesterTrainingScoreModel.insertMany(scores);
  console.log(`✅ Created ${scores.length} semester scores`);

  // =============================================
  // 10. CREATE NOTIFICATIONS (Thông báo)
  // =============================================
  console.log('🔔 Creating notifications...');
  interface INotification {
    userId: any;
    title: string;
    content: string;
    notificationType: string;
    relatedId?: any;
    relatedType?: string;
    isRead: boolean;
    readAt?: Date;
    createdAt: Date;
  }
  const notifications: INotification[] = [];
  // Thông báo cho tất cả sinh viên
  for (const student of students) {
    notifications.push(
      {
        userId: student.userId,
        title: '🎯 Mở đợt đánh giá điểm rèn luyện HK2 2023-2024',
        content: `Sinh viên vui lòng thực hiện tự đánh giá trước ngày ${activeSemester.deadlines.selfAssessment.toLocaleDateString('vi-VN')}. Đăng nhập hệ thống để thực hiện đánh giá.`,
        notificationType: 'deadline',
        relatedId: activeSemester._id,
        relatedType: 'semester',
        isRead: true,
        readAt: new Date('2024-06-15T08:00:00'),
        createdAt: new Date('2024-06-10T08:00:00'),
      },
      {
        userId: student.userId,
        title: '⏰ Nhắc nhở: Còn 3 ngày để hoàn thành tự đánh giá',
        content: 'Hạn cuối tự đánh giá là 20/06/2024. Vui lòng hoàn thành sớm để tránh bị trễ hạn.',
        notificationType: 'reminder',
        relatedId: activeSemester._id,
        relatedType: 'semester',
        isRead: false,
        createdAt: new Date('2024-06-17T08:00:00'),
      }
    );
  }

  // Thông báo cho sinh viên đã được chấm
  for (const student of sampleStudents.slice(0, 3)) {
    notifications.push({
      userId: student.userId,
      title: '✅ Đánh giá của bạn đã được lớp xét duyệt',
      content: 'Cán bộ lớp đã hoàn thành đánh giá điểm rèn luyện của bạn. Vui lòng đăng nhập để xem chi tiết.',
      notificationType: 'approval',
      relatedId: student._id,
      relatedType: 'assessment',
      isRead: false,
      createdAt: new Date('2024-06-24T12:00:00'),
    });
  }

  // Thông báo cho cán bộ lớp
  for (const gvcn of [gvcnCNTT_K1, gvcnCNTT_K2, gvcnKT_K1]) {
    notifications.push(
      {
        userId: gvcn._id,
        title: '📝 Có sinh viên đã nộp đánh giá',
        content: 'Có sinh viên trong lớp đã hoàn thành tự đánh giá. Vui lòng vào hệ thống để xem xét và đánh giá.',
        notificationType: 'system',
        isRead: false,
        createdAt: new Date('2024-06-20T09:00:00'),
      },
      {
        userId: gvcn._id,
        title: '⏰ Hạn chót đánh giá cấp lớp: 25/06/2024',
        content: 'Vui lòng hoàn thành đánh giá sinh viên trước deadline để đảm bảo tiến độ.',
        notificationType: 'deadline',
        isRead: false,
        createdAt: new Date('2024-06-22T08:00:00'),
      }
    );
  }

  // Thông báo cho cấp khoa
  notifications.push(
    {
      userId: facultyOfficerCNTT._id,
      title: '📋 Có lớp đã hoàn thành đánh giá',
      content: `Lớp ${classCNTT_K1.className} đã hoàn thành đánh giá cấp lớp. Vui lòng xem xét và phê duyệt.`,
      notificationType: 'system',
      relatedId: classCNTT_K1._id,
      relatedType: 'class',
      isRead: false,
      createdAt: new Date('2024-06-25T10:00:00'),
    },
    {
      userId: facultyOfficerCNTT._id,
      title: '⏰ Deadline đánh giá cấp khoa: 30/06/2024',
      content: 'Vui lòng hoàn thành đánh giá các lớp trong khoa trước hạn chót.',
      notificationType: 'deadline',
      isRead: false,
      createdAt: new Date('2024-06-27T08:00:00'),
    }
  );

  // Thông báo cho cấp trường
  const schoolOfficer1 = users.find(u => u.username === 'school_officer1');
  notifications.push(
    {
      userId: schoolOfficer1._id,
      title: '📊 Các khoa đã hoàn thành đánh giá',
      content: 'Khoa CNTT và Khoa Kinh tế đã hoàn thành đánh giá. Vui lòng xem xét và phê duyệt cuối cùng.',
      notificationType: 'system',
      isRead: false,
      createdAt: new Date('2024-07-01T08:00:00'),
    },
    {
      userId: schoolOfficer1._id,
      title: '⏰ Deadline phê duyệt cấp trường: 05/07/2024',
      content: 'Vui lòng hoàn thành phê duyệt cuối cùng điểm rèn luyện toàn trường.',
      notificationType: 'deadline',
      isRead: false,
      createdAt: new Date('2024-07-02T08:00:00'),
    }
  );

  await NotificationModel.insertMany(notifications);
  console.log(`✅ Created ${notifications.length} notifications`);

  // =============================================
  // 11. SUMMARY
  // =============================================
  console.log('\n' + '='.repeat(60));
  console.log('🎉 SEED COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(60));

  console.log('\n📊 DATABASE SUMMARY:');
  console.log('┌─────────────────────────────┬─────────┐');
  console.log('│ Collection                  │ Count   │');
  console.log('├─────────────────────────────┼─────────┤');
  console.log(`│ Users                       │ ${String(users.length).padStart(7)} │`);
  console.log(`│ Faculties                   │ ${String(faculties.length).padStart(7)} │`);
  console.log(`│ Classes                     │ ${String(classes.length).padStart(7)} │`);
  console.log(`│ Students                    │ ${String(students.length).padStart(7)} │`);
  console.log(`│ Semesters                   │ ${String(semesters.length).padStart(7)} │`);
  console.log(`│ Criteria                    │ ${String(criteriaCount).padStart(7)} │`);
  console.log(`│ Training Assessments        │ ${String(assessments.length).padStart(7)} │`);
  console.log(`│ Evidences                   │ ${String(evidences.length).padStart(7)} │`);
  console.log(`│ Semester Training Scores    │ ${String(scores.length).padStart(7)} │`);
  console.log(`│ Notifications               │ ${String(notifications.length).padStart(7)} │`);
  console.log('└─────────────────────────────┴─────────┘');

  console.log('\n👥 USER ACCOUNTS BY ROLE:');
  console.log('┌─────────────────────────────┬─────────┐');
  console.log('│ Role                        │ Count   │');
  console.log('├─────────────────────────────┼─────────┤');
  console.log(`│ Admin                       │ ${String(users.filter(u => u.role === 'admin').length).padStart(7)} │`);
  console.log(`│ School Officers (Trường)    │ ${String(users.filter(u => u.role === 'school_officer').length).padStart(7)} │`);
  console.log(`│ Faculty Officers (Khoa)     │ ${String(users.filter(u => u.role === 'faculty_officer').length).padStart(7)} │`);
  console.log(`│ Class Officers (GVCN)       │ ${String(users.filter(u => u.role === 'class_officer').length).padStart(7)} │`);
  console.log(`│ Students (Sinh viên)        │ ${String(users.filter(u => u.role === 'student').length).padStart(7)} │`);
  console.log('└─────────────────────────────┴─────────┘');

  console.log('\n🎓 LOGIN ACCOUNTS:');
  console.log('┌──────────────────┬────────────┬─────────────────────────────┐');
  console.log('│ Username         │ Password   │ Role                        │');
  console.log('├──────────────────┼────────────┼─────────────────────────────┤');
  console.log('│ admin            │ 123456     │ Admin                       │');
  console.log('│ school_officer1  │ 123456     │ Phó Hiệu trưởng             │');
  console.log('│ school_officer2  │ 123456     │ Trưởng phòng CTSV           │');
  console.log('│ faculty_cntt     │ 123456     │ Trưởng khoa CNTT            │');
  console.log('│ faculty_kt       │ 123456     │ Trưởng khoa Kinh tế         │');
  console.log('│ gvcn_cntt_k1     │ 123456     │ GVCN CNTT K1                │');
  console.log('│ gvcn_kt_k1       │ 123456     │ GVCN KT K1                  │');
  console.log('│ 650101001        │ 123456     │ Sinh viên CNTT (Đã xong)    │');
  console.log('│ 650101002        │ 123456     │ Sinh viên CNTT (Chờ trường) │');
  console.log('│ 650101003        │ 123456     │ Sinh viên CNTT (Chờ khoa)   │');
  console.log('│ 650101004        │ 123456     │ Sinh viên CNTT (Chờ lớp)    │');
  console.log('│ 650101005        │ 123456     │ Sinh viên CNTT (Đã nộp)     │');
  console.log('└──────────────────┴────────────┴─────────────────────────────┘');

  console.log('\n📋 QUY TRÌNH ĐÁNH GIÁ 4 CẤP:');
  console.log('┌─────┬──────────────────────┬──────────────────────────────┐');
  console.log('│ Cấp │ Vai trò              │ Trạng thái                   │');
  console.log('├─────┼──────────────────────┼──────────────────────────────┤');
  console.log('│  1  │ Sinh viên            │ Tự đánh giá (selfScore)      │');
  console.log('│  2  │ Cán bộ lớp (GVCN)    │ Đánh giá lớp (classScore)    │');
  console.log('│  3  │ Cán bộ khoa          │ Đánh giá khoa (facultyScore) │');
  console.log('│  4  │ Cán bộ trường        │ Phê duyệt (schoolScore)      │');
  console.log('└─────┴──────────────────────┴──────────────────────────────┘');

  console.log('\n📊 TRẠNG THÁI ĐÁNH GIÁ MẪU:');
  console.log('┌──────────────┬─────────────────────────┬──────────────────┐');
  console.log('│ Sinh viên    │ Trạng thái              │ Điểm             │');
  console.log('├──────────────┼─────────────────────────┼──────────────────┤');
  console.log('│ 650101001    │ Completed (Đã xong)     │ 4/4 cấp đã chấm  │');
  console.log('│ 650101002    │ School Reviewing        │ 3/4 cấp đã chấm  │');
  console.log('│ 650101003    │ Faculty Reviewing       │ 2/4 cấp đã chấm  │');
  console.log('│ 650101004    │ Class Reviewing         │ 1/4 cấp đã chấm  │');
  console.log('│ 650101005    │ Submitted               │ 1/4 cấp đã chấm  │');
  console.log('└──────────────┴─────────────────────────┴──────────────────┘');

  console.log('\n✅ NEXT STEPS:');
  console.log('1. 🌐 Truy cập MongoDB Atlas: https://cloud.mongodb.com');
  console.log('2. 👀 Xem Collections → Kiểm tra dữ liệu');
  console.log('3. 🚀 Chạy Backend: npm run start:dev');
  console.log('4. 🎨 Chạy Frontend: npm run dev');
  console.log('5. 🔐 Login với các tài khoản trên để test');

  console.log('\n💡 TIPS:');
  console.log('- Login bằng admin để xem toàn bộ hệ thống');
  console.log('- Login bằng 650101001 để xem flow đã hoàn thành');
  console.log('- Login bằng gvcn_cntt_k1 để test chấm điểm cấp lớp');
  console.log('- Login bằng faculty_cntt để test chấm điểm cấp khoa');
  console.log('- Login bằng school_officer1 để test phê duyệt cuối');

  await app.close();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
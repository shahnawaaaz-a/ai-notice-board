import { School, User, Student, Teacher, Parent, SchoolClass, Section, Category, Notice, SchoolEvent, Activity, Achievement, Notification } from '../types';

export const demoSchools: School[] = [
  {
    id: 'school-1',
    name: 'Delhi Public School',
    slug: 'delhi-public-school',
    schoolCode: 'DPS-001',
    email: 'admin@dps.edu.in',
    phone: '+91-11-2345-6789',
    address: 'Sector 24, Mathura Road',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    logoUrl: '',
    website: 'https://www.dps.edu.in',
    principalName: 'Dr. Rajesh Kumar',
    status: 'approved',
    academicYear: '2025-2026',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'school-2',
    name: 'Green Valley International School',
    slug: 'green-valley-international',
    schoolCode: 'GVI-002',
    email: 'admin@gvis.edu.in',
    phone: '+91-80-4567-8901',
    address: '15th Cross, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    logoUrl: '',
    website: 'https://www.gvis.edu.in',
    principalName: 'Mrs. Priya Sharma',
    status: 'approved',
    academicYear: '2025-2026',
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: 'school-3',
    name: 'Springfield Academy',
    slug: 'springfield-academy',
    schoolCode: 'SA-003',
    email: 'info@springfield.edu',
    phone: '+91-22-3456-7890',
    address: 'Marine Drive, Churchgate',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400020',
    logoUrl: '',
    website: 'https://www.springfield.edu.in',
    principalName: 'Mr. Anil Mehta',
    status: 'pending',
    academicYear: '2025-2026',
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-03-10T10:00:00Z',
  },
];

export const demoUsers: User[] = [
  { id: 'user-super', schoolId: null, name: 'Platform Admin', email: 'super@schoolboard.ai', phone: '+91-99999-00001', password: 'admin123', role: 'super_admin', avatarUrl: '', status: 'active', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'user-admin-1', schoolId: 'school-1', name: 'Dr. Rajesh Kumar', email: 'admin@demo-school.com', phone: '+91-99999-00002', password: 'admin123', role: 'school_admin', avatarUrl: '', status: 'active', createdAt: '2025-01-15T10:00:00Z', updatedAt: '2025-01-15T10:00:00Z' },
  { id: 'user-teacher-1', schoolId: 'school-1', name: 'Mrs. Sunita Verma', email: 'teacher1@demo-school.com', phone: '+91-99999-00003', password: 'teacher123', role: 'teacher', avatarUrl: '', status: 'active', createdAt: '2025-01-16T10:00:00Z', updatedAt: '2025-01-16T10:00:00Z' },
  { id: 'user-teacher-2', schoolId: 'school-1', name: 'Mr. Vikram Singh', email: 'teacher2@demo-school.com', phone: '+91-99999-00004', password: 'teacher123', role: 'teacher', avatarUrl: '', status: 'active', createdAt: '2025-01-16T10:00:00Z', updatedAt: '2025-01-16T10:00:00Z' },
  { id: 'user-student-1', schoolId: 'school-1', name: 'Aarav Sharma', email: 'student1@demo-school.com', phone: '+91-99999-00005', password: 'student123', role: 'student', avatarUrl: '', status: 'active', createdAt: '2025-01-17T10:00:00Z', updatedAt: '2025-01-17T10:00:00Z' },
  { id: 'user-student-2', schoolId: 'school-1', name: 'Ananya Gupta', email: 'student2@demo-school.com', phone: '+91-99999-00006', password: 'student123', role: 'student', avatarUrl: '', status: 'active', createdAt: '2025-01-17T10:00:00Z', updatedAt: '2025-01-17T10:00:00Z' },
  { id: 'user-parent-1', schoolId: 'school-1', name: 'Mr. Rakesh Sharma', email: 'parent1@demo-school.com', phone: '+91-99999-00007', password: 'parent123', role: 'parent', avatarUrl: '', status: 'active', createdAt: '2025-01-18T10:00:00Z', updatedAt: '2025-01-18T10:00:00Z' },
  { id: 'user-admin-2', schoolId: 'school-2', name: 'Mrs. Priya Sharma', email: 'admin@gvi-school.com', phone: '+91-99999-00008', password: 'admin123', role: 'school_admin', avatarUrl: '', status: 'active', createdAt: '2025-02-01T10:00:00Z', updatedAt: '2025-02-01T10:00:00Z' },
];

export const demoStudents: Student[] = [
  { id: 'student-1', schoolId: 'school-1', userId: 'user-student-1', admissionNumber: 'DPS2025001', classId: 'class-10', sectionId: 'section-a', rollNumber: '01' },
  { id: 'student-2', schoolId: 'school-1', userId: 'user-student-2', admissionNumber: 'DPS2025002', classId: 'class-9', sectionId: 'section-b', rollNumber: '15' },
];

export const demoTeachers: Teacher[] = [
  { id: 'teacher-1', schoolId: 'school-1', userId: 'user-teacher-1', employeeId: 'EMP001', department: 'Science', designation: 'Senior Teacher', subjectIds: ['Physics', 'Chemistry'] },
  { id: 'teacher-2', schoolId: 'school-1', userId: 'user-teacher-2', employeeId: 'EMP002', department: 'Mathematics', designation: 'HOD Mathematics', subjectIds: ['Mathematics'] },
];

export const demoParents: Parent[] = [
  { id: 'parent-1', schoolId: 'school-1', userId: 'user-parent-1', relationship: 'Father', linkedStudentIds: ['student-1'] },
];

export const demoClasses: SchoolClass[] = [
  { id: 'class-nursery', schoolId: 'school-1', name: 'Nursery', order: 1 },
  { id: 'class-lkg', schoolId: 'school-1', name: 'LKG', order: 2 },
  { id: 'class-ukg', schoolId: 'school-1', name: 'UKG', order: 3 },
  { id: 'class-1', schoolId: 'school-1', name: 'Class 1', order: 4 },
  { id: 'class-2', schoolId: 'school-1', name: 'Class 2', order: 5 },
  { id: 'class-3', schoolId: 'school-1', name: 'Class 3', order: 6 },
  { id: 'class-4', schoolId: 'school-1', name: 'Class 4', order: 7 },
  { id: 'class-5', schoolId: 'school-1', name: 'Class 5', order: 8 },
  { id: 'class-6', schoolId: 'school-1', name: 'Class 6', order: 9 },
  { id: 'class-7', schoolId: 'school-1', name: 'Class 7', order: 10 },
  { id: 'class-8', schoolId: 'school-1', name: 'Class 8', order: 11 },
  { id: 'class-9', schoolId: 'school-1', name: 'Class 9', order: 12 },
  { id: 'class-10', schoolId: 'school-1', name: 'Class 10', order: 13 },
  { id: 'class-11', schoolId: 'school-1', name: 'Class 11', order: 14 },
  { id: 'class-12', schoolId: 'school-1', name: 'Class 12', order: 15 },
];

export const demoSections: Section[] = [
  { id: 'section-a', classId: 'class-9', name: 'A' },
  { id: 'section-b', classId: 'class-9', name: 'B' },
  { id: 'section-c', classId: 'class-9', name: 'C' },
  { id: 'section-a', classId: 'class-10', name: 'A' },
  { id: 'section-b', classId: 'class-10', name: 'B' },
];

export const demoCategories: Category[] = [
  { id: 'cat-general', schoolId: null, name: 'General Announcement', description: 'General school announcements', icon: 'Megaphone', color: '#3b82f6', isGlobal: true },
  { id: 'cat-important', schoolId: null, name: 'Important Notice', description: 'Important notices requiring attention', icon: 'AlertTriangle', color: '#f59e0b', isGlobal: true },
  { id: 'cat-circular', schoolId: null, name: 'Circular', description: 'Official school circulars', icon: 'FileText', color: '#8b5cf6', isGlobal: true },
  { id: 'cat-exam', schoolId: null, name: 'Examination', description: 'Exam schedules and information', icon: 'ClipboardList', color: '#ef4444', isGlobal: true },
  { id: 'cat-homework', schoolId: null, name: 'Homework', description: 'Homework assignments', icon: 'BookOpen', color: '#10b981', isGlobal: true },
  { id: 'cat-holiday', schoolId: null, name: 'Holiday', description: 'Holiday announcements', icon: 'Calendar', color: '#06b6d4', isGlobal: true },
  { id: 'cat-event', schoolId: null, name: 'Event', description: 'School events', icon: 'CalendarDays', color: '#ec4899', isGlobal: true },
  { id: 'cat-sports', schoolId: null, name: 'Sports', description: 'Sports activities and results', icon: 'Trophy', color: '#f97316', isGlobal: true },
  { id: 'cat-achievement', schoolId: null, name: 'Achievement', description: 'Student and school achievements', icon: 'Award', color: '#eab308', isGlobal: true },
  { id: 'cat-emergency', schoolId: null, name: 'Emergency', description: 'Emergency alerts', icon: 'AlertCircle', color: '#dc2626', isGlobal: true },
  { id: 'cat-transport', schoolId: null, name: 'Transport', description: 'Transport related notices', icon: 'Bus', color: '#6366f1', isGlobal: true },
  { id: 'cat-fee', schoolId: null, name: 'Fee Reminder', description: 'Fee payment reminders', icon: 'CreditCard', color: '#14b8a6', isGlobal: true },
];

export const demoNotices: Notice[] = [
  {
    id: 'notice-1', schoolId: 'school-1', authorId: 'user-admin-1', authorName: 'Dr. Rajesh Kumar', authorRole: 'school_admin',
    title: 'Annual Sports Day 2026', content: 'We are delighted to announce that our Annual Sports Day will be held on 15th February 2026. All students from Class 1 to Class 12 are requested to participate. Events include track races, field events, relay races, and fun activities for junior classes.\n\nParents are cordially invited to attend and cheer for their children. The event will begin at 8:00 AM and prizes will be distributed at 3:00 PM.\n\nPlease ensure students wear their sports uniform and carry water bottles.',
    categoryId: 'cat-event', priority: 'important', status: 'published', audienceType: 'all', targetClassIds: [], targetSectionIds: [],
    publishAt: '2026-01-20T08:00:00Z', expiresAt: '2026-02-16T23:59:00Z', coverImageUrl: '', tags: ['sports', 'annual', 'event'],
    isPinned: true, commentsEnabled: true, notificationEnabled: true, requireAcknowledgement: false, views: 843, downloads: 198, bookmarks: 67, acknowledgements: 712, createdAt: '2026-01-20T08:00:00Z', updatedAt: '2026-01-20T08:00:00Z',
  },
  {
    id: 'notice-2', schoolId: 'school-1', authorId: 'user-admin-1', authorName: 'Dr. Rajesh Kumar', authorRole: 'school_admin',
    title: '🚨 School Closed Due to Heavy Rain', content: 'Due to heavy rainfall and waterlogging in several areas, the school will remain CLOSED tomorrow (25th January 2026). All classes, activities, and examinations scheduled for tomorrow are postponed.\n\nOnline classes will be conducted as per the regular timetable. Students should join their respective virtual classrooms at the usual time.\n\nStay safe and take care.',
    categoryId: 'cat-emergency', priority: 'emergency', status: 'published', audienceType: 'all', targetClassIds: [], targetSectionIds: [],
    publishAt: '2026-01-24T18:00:00Z', expiresAt: '2026-01-26T23:59:00Z', coverImageUrl: '', tags: ['emergency', 'closure', 'rain'],
    isPinned: true, commentsEnabled: false, notificationEnabled: true, requireAcknowledgement: true, views: 1205, downloads: 0, bookmarks: 45, acknowledgements: 987, createdAt: '2026-01-24T18:00:00Z', updatedAt: '2026-01-24T18:00:00Z',
  },
  {
    id: 'notice-3', schoolId: 'school-1', authorId: 'user-teacher-2', authorName: 'Mr. Vikram Singh', authorRole: 'teacher',
    title: 'Class 10 Mathematics Unit Test', content: 'This is to inform all Class 10 students that the Mathematics Unit Test for Chapter 5-8 will be conducted on 28th January 2026 (Wednesday).\n\nTopics covered:\n- Arithmetic Progressions\n- Triangles\n- Coordinate Geometry\n- Trigonometry\n\nStudents must bring their admit cards, geometry box, and scientific calculator. The test will be of 40 marks and duration will be 2 hours.',
    categoryId: 'cat-exam', priority: 'important', status: 'published', audienceType: 'class', targetClassIds: ['class-10'], targetSectionIds: [],
    publishAt: '2026-01-22T09:00:00Z', expiresAt: '2026-01-29T23:59:00Z', coverImageUrl: '', tags: ['exam', 'mathematics', 'class-10'],
    isPinned: false, commentsEnabled: true, notificationEnabled: true, requireAcknowledgement: false, views: 356, downloads: 89, bookmarks: 234, acknowledgements: 0, createdAt: '2026-01-22T09:00:00Z', updatedAt: '2026-01-22T09:00:00Z',
  },
  {
    id: 'notice-4', schoolId: 'school-1', authorId: 'user-teacher-1', authorName: 'Mrs. Sunita Verma', authorRole: 'teacher',
    title: 'Science Project Submission', content: 'All Class 9 students are required to submit their Science Working Model projects by 30th January 2026.\n\nGuidelines:\n- Working model on any physics/chemistry concept\n- Must include a project report (min 5 pages)\n- Presentation of 5 minutes per student\n- Creativity and originality will be evaluated\n\nSubmit to the Science Lab during lunch break or after school hours.',
    categoryId: 'cat-homework', priority: 'normal', status: 'published', audienceType: 'class', targetClassIds: ['class-9'], targetSectionIds: ['section-a', 'section-b'],
    publishAt: '2026-01-18T10:00:00Z', expiresAt: '2026-01-31T23:59:00Z', coverImageUrl: '', tags: ['project', 'science', 'class-9'],
    isPinned: false, commentsEnabled: true, notificationEnabled: true, requireAcknowledgement: false, views: 234, downloads: 45, bookmarks: 12, acknowledgements: 0, createdAt: '2026-01-18T10:00:00Z', updatedAt: '2026-01-18T10:00:00Z',
  },
  {
    id: 'notice-5', schoolId: 'school-1', authorId: 'user-admin-1', authorName: 'Dr. Rajesh Kumar', authorRole: 'school_admin',
    title: 'Republic Day Celebration', content: 'Join us in celebrating the 77th Republic Day on 26th January 2026. The flag hoisting ceremony will be held at 8:00 AM followed by the parade and cultural program.\n\nAll students must attend in proper uniform. National anthem will be sung at 8:15 AM sharp.\n\nSweet distribution will follow the ceremony.',
    categoryId: 'cat-event', priority: 'normal', status: 'published', audienceType: 'all', targetClassIds: [], targetSectionIds: [],
    publishAt: '2026-01-23T08:00:00Z', expiresAt: '2026-01-27T23:59:00Z', coverImageUrl: '', tags: ['republic-day', 'celebration', 'national'],
    isPinned: false, commentsEnabled: true, notificationEnabled: true, requireAcknowledgement: false, views: 567, downloads: 23, bookmarks: 34, acknowledgements: 0, createdAt: '2026-01-23T08:00:00Z', updatedAt: '2026-01-23T08:00:00Z',
  },
  {
    id: 'notice-6', schoolId: 'school-1', authorId: 'user-admin-1', authorName: 'Dr. Rajesh Kumar', authorRole: 'school_admin',
    title: 'Fee Payment Reminder - Q3', content: 'This is a gentle reminder that the third quarter school fees are due by 31st January 2026. Parents who have not yet paid the fees are requested to clear the dues at the earliest.\n\nPayment can be made through:\n- Online payment portal\n- Bank transfer\n- Cash at the accounts section\n\nLate fee of ₹500 will be applicable after the due date.',
    categoryId: 'cat-fee', priority: 'important', status: 'published', audienceType: 'parents', targetClassIds: [], targetSectionIds: [],
    publishAt: '2026-01-15T09:00:00Z', expiresAt: '2026-02-01T23:59:00Z', coverImageUrl: '', tags: ['fee', 'payment', 'reminder'],
    isPinned: false, commentsEnabled: false, notificationEnabled: true, requireAcknowledgement: false, views: 432, downloads: 156, bookmarks: 89, acknowledgements: 0, createdAt: '2026-01-15T09:00:00Z', updatedAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'notice-7', schoolId: 'school-1', authorId: 'user-admin-1', authorName: 'Dr. Rajesh Kumar', authorRole: 'school_admin',
    title: 'Parent-Teacher Meeting Schedule', content: 'The Parent-Teacher Meeting (PTM) for all classes will be held as per the following schedule:\n\nClass 1-5: 2nd February 2026 (Saturday) - 9:00 AM to 12:00 PM\nClass 6-8: 3rd February 2026 (Sunday) - 9:00 AM to 12:00 PM\nClass 9-12: 4th February 2026 (Monday) - 2:00 PM to 5:00 PM\n\nParents are requested to attend the PTM to discuss their ward\'s academic progress.',
    categoryId: 'cat-general', priority: 'normal', status: 'published', audienceType: 'parents', targetClassIds: [], targetSectionIds: [],
    publishAt: '2026-01-25T10:00:00Z', expiresAt: '2026-02-05T23:59:00Z', coverImageUrl: '', tags: ['ptm', 'parents', 'meeting'],
    isPinned: false, commentsEnabled: true, notificationEnabled: true, requireAcknowledgement: false, views: 389, downloads: 67, bookmarks: 45, acknowledgements: 0, createdAt: '2026-01-25T10:00:00Z', updatedAt: '2026-01-25T10:00:00Z',
  },
  {
    id: 'notice-8', schoolId: 'school-2', authorId: 'user-admin-2', authorName: 'Mrs. Priya Sharma', authorRole: 'school_admin',
    title: 'Science Exhibition 2026', content: 'Green Valley International School is proud to announce its Annual Science Exhibition on 10th March 2026. Students from Class 6 to 12 are invited to participate.\n\nRegistration deadline: 20th February 2026\n\nPrizes for top 3 projects in each category.',
    categoryId: 'cat-event', priority: 'normal', status: 'published', audienceType: 'all', targetClassIds: [], targetSectionIds: [],
    publishAt: '2026-01-20T08:00:00Z', expiresAt: '2026-03-11T23:59:00Z', coverImageUrl: '', tags: ['science', 'exhibition'],
    isPinned: true, commentsEnabled: true, notificationEnabled: true, requireAcknowledgement: false, views: 234, downloads: 56, bookmarks: 78, acknowledgements: 0, createdAt: '2026-01-20T08:00:00Z', updatedAt: '2026-01-20T08:00:00Z',
  },
];

export const demoEvents: SchoolEvent[] = [
  { id: 'event-1', schoolId: 'school-1', title: 'Annual Sports Day', description: 'Annual inter-house sports competition with track and field events.', startDate: '2026-02-15T08:00:00Z', endDate: '2026-02-15T16:00:00Z', location: 'School Sports Ground', organizer: 'Sports Department', audienceType: 'all', coverImageUrl: '', createdBy: 'user-admin-1', createdAt: '2026-01-20T08:00:00Z' },
  { id: 'event-2', schoolId: 'school-1', title: 'Science Exhibition', description: 'Annual science exhibition showcasing student projects and innovations.', startDate: '2026-02-20T09:00:00Z', endDate: '2026-02-20T15:00:00Z', location: 'School Auditorium', organizer: 'Science Department', audienceType: 'all', coverImageUrl: '', createdBy: 'user-teacher-1', createdAt: '2026-01-22T08:00:00Z' },
  { id: 'event-3', schoolId: 'school-1', title: 'Parent-Teacher Meeting', description: 'Quarterly parent-teacher meeting to discuss student progress.', startDate: '2026-02-02T09:00:00Z', endDate: '2026-02-02T12:00:00Z', location: 'School Campus', organizer: 'Administration', audienceType: 'parents', coverImageUrl: '', createdBy: 'user-admin-1', createdAt: '2026-01-25T08:00:00Z' },
  { id: 'event-4', schoolId: 'school-1', title: 'Inter-School Debate Competition', description: 'Inter-school debate competition on environmental topics.', startDate: '2026-03-05T10:00:00Z', endDate: '2026-03-05T14:00:00Z', location: 'School Auditorium', organizer: 'English Department', audienceType: 'all', coverImageUrl: '', createdBy: 'user-teacher-2', createdAt: '2026-01-28T08:00:00Z' },
];

export const demoActivities: Activity[] = [
  { id: 'activity-1', schoolId: 'school-1', title: 'Annual Day Celebration 2025', description: 'A grand celebration of art, culture, and talent showcasing performances by students from all classes.', type: 'Cultural', date: '2025-12-15', images: [], results: 'Over 500 students participated in various cultural performances including dance, drama, and music.', winners: ['Best Performance - Class 10', 'Best Drama - Class 8', 'Best Dance - Class 6'], createdAt: '2025-12-16T08:00:00Z' },
  { id: 'activity-2', schoolId: 'school-1', title: 'Inter-House Cricket Tournament', description: 'Annual inter-house cricket tournament with matches played over two weeks.', type: 'Sports', date: '2025-11-20', images: [], results: 'Blue House won the tournament defeating Red House in the finals.', winners: ['Winner - Blue House', 'Runner-up - Red House', 'Best Batsman - Rohan (Class 9)', 'Best Bowler - Arjun (Class 10)'], createdAt: '2025-11-21T08:00:00Z' },
];

export const demoAchievements: Achievement[] = [
  { id: 'ach-1', schoolId: 'school-1', title: 'National Science Olympiad Winner', description: 'Secured 1st place in the National Science Olympiad 2025 with a project on renewable energy.', studentName: 'Priya Patel', className: 'Class 10-A', category: 'Academic', imageUrl: '', date: '2025-12-01', createdAt: '2025-12-02T08:00:00Z' },
  { id: 'ach-2', schoolId: 'school-1', title: 'State Level Swimming Champion', description: 'Won gold medal in 100m freestyle at the State Level Swimming Championship.', studentName: 'Arjun Reddy', className: 'Class 11-B', category: 'Sports', imageUrl: '', date: '2025-11-15', createdAt: '2025-11-16T08:00:00Z' },
  { id: 'ach-3', schoolId: 'school-1', title: 'Mathematics Quiz Champion', description: 'Won the Inter-School Mathematics Quiz Competition 2025.', studentName: 'Ananya Gupta', className: 'Class 9-B', category: 'Academic', imageUrl: '', date: '2025-10-20', createdAt: '2025-10-21T08:00:00Z' },
];

export const demoNotifications: Notification[] = [
  { id: 'notif-1', userId: 'user-student-1', schoolId: 'school-1', title: 'New Notice: Annual Sports Day', message: 'Annual Sports Day will be held on 15th February 2026. Check details.', type: 'event', relatedId: 'notice-1', isRead: false, createdAt: '2026-01-20T08:00:00Z' },
  { id: 'notif-2', userId: 'user-student-1', schoolId: 'school-1', title: '🚨 Emergency: School Closed', message: 'School will remain closed tomorrow due to heavy rain.', type: 'emergency', relatedId: 'notice-2', isRead: false, createdAt: '2026-01-24T18:00:00Z' },
  { id: 'notif-3', userId: 'user-student-1', schoolId: 'school-1', title: 'Mathematics Unit Test', message: 'Class 10 Mathematics Unit Test on 28th January.', type: 'exam', relatedId: 'notice-3', isRead: true, createdAt: '2026-01-22T09:00:00Z' },
  { id: 'notif-4', userId: 'user-parent-1', schoolId: 'school-1', title: 'Fee Payment Reminder', message: 'Third quarter fees are due by 31st January 2026.', type: 'notice', relatedId: 'notice-6', isRead: false, createdAt: '2026-01-15T09:00:00Z' },
  { id: 'notif-5', userId: 'user-parent-1', schoolId: 'school-1', title: 'PTM Schedule Released', message: 'Parent-Teacher Meeting schedule has been published.', type: 'notice', relatedId: 'notice-7', isRead: false, createdAt: '2026-01-25T10:00:00Z' },
  { id: 'notif-6', userId: 'user-admin-1', schoolId: 'school-1', title: 'New Student Registered', message: 'A new student has been registered in Class 5-A.', type: 'system', relatedId: '', isRead: true, createdAt: '2026-01-23T10:00:00Z' },
];

// ===== CORE TYPES =====

export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';
export type SchoolStatus = 'pending' | 'approved' | 'suspended' | 'rejected';
export type NoticePriority = 'normal' | 'important' | 'urgent' | 'emergency';
export type NoticeStatus = 'draft' | 'scheduled' | 'published' | 'expired' | 'archived';
export type AudienceType = 'all' | 'teachers' | 'students' | 'parents' | 'class' | 'section' | 'custom';
export type NotificationType = 'notice' | 'event' | 'homework' | 'exam' | 'emergency' | 'system' | 'achievement';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface School {
  id: string;
  name: string;
  slug: string;
  schoolCode: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  logoUrl: string;
  website: string;
  principalName: string;
  status: SchoolStatus;
  academicYear: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  schoolId: string | null;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  avatarUrl: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  schoolId: string;
  userId: string;
  admissionNumber: string;
  classId: string;
  sectionId: string;
  rollNumber: string;
}

export interface Teacher {
  id: string;
  schoolId: string;
  userId: string;
  employeeId: string;
  department: string;
  designation: string;
  subjectIds: string[];
}

export interface Parent {
  id: string;
  schoolId: string;
  userId: string;
  relationship: string;
  linkedStudentIds: string[];
}

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  order: number;
}

export interface Section {
  id: string;
  classId: string;
  name: string;
}

export interface Category {
  id: string;
  schoolId: string | null;
  name: string;
  description: string;
  icon: string;
  color: string;
  isGlobal: boolean;
}

export interface Notice {
  id: string;
  schoolId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  content: string;
  categoryId: string;
  priority: NoticePriority;
  status: NoticeStatus;
  audienceType: AudienceType;
  targetClassIds: string[];
  targetSectionIds: string[];
  publishAt: string;
  expiresAt: string;
  coverImageUrl: string;
  tags: string[];
  isPinned: boolean;
  commentsEnabled: boolean;
  notificationEnabled: boolean;
  requireAcknowledgement: boolean;
  views: number;
  downloads: number;
  bookmarks: number;
  acknowledgements: number;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  noticeId: string;
  schoolId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
}

export interface SchoolEvent {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  audienceType: AudienceType;
  coverImageUrl: string;
  createdBy: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  type: string;
  date: string;
  images: string[];
  results: string;
  winners: string[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  studentName: string;
  className: string;
  category: string;
  imageUrl: string;
  date: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  schoolId: string;
  title: string;
  message: string;
  type: NotificationType;
  relatedId: string;
  isRead: boolean;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  noticeId: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  schoolId: string | null;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, any>;
  createdAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  categories: string[];
  priorities: NoticePriority[];
}

export interface AIUsage {
  id: string;
  userId: string;
  schoolId: string;
  feature: string;
  tokensUsed: number;
  createdAt: string;
}

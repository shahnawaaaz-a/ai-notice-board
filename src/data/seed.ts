import { School, User, Student, Teacher, Parent, SchoolClass, Section, Category, Notice, SchoolEvent, Activity, Achievement, Notification } from '../types';

// Empty arrays - no demo data
export const demoSchools: School[] = [];
export const demoUsers: User[] = [];
export const demoStudents: Student[] = [];
export const demoTeachers: Teacher[] = [];
export const demoParents: Parent[] = [];
export const demoClasses: SchoolClass[] = [];
export const demoSections: Section[] = [];

// Default categories (needed for the app to function)
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

// Empty arrays - no demo data
export const demoNotices: Notice[] = [];
export const demoEvents: SchoolEvent[] = [];
export const demoActivities: Activity[] = [];
export const demoAchievements: Achievement[] = [];
export const demoNotifications: Notification[] = [];

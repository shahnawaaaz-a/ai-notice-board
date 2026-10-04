import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, School, Notice, SchoolEvent, Notification, Bookmark, ThemeMode, UserRole } from '../types';
import { demoSchools, demoUsers, demoNotices, demoEvents, demoNotifications, demoCategories, demoClasses, demoSections, demoStudents, demoTeachers, demoParents, demoActivities, demoAchievements } from '../data/seed';
import type { Category, SchoolClass, Section, Activity, Achievement, Student, Teacher, Parent } from '../types';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  
  // Data
  schools: School[];
  users: User[];
  notices: Notice[];
  events: SchoolEvent[];
  notifications: Notification[];
  bookmarks: Bookmark[];
  categories: Category[];
  classes: SchoolClass[];
  sections: Section[];
  students: Student[];
  teachers: Teacher[];
  parents: Parent[];
  activities: Activity[];
  achievements: Achievement[];
  
  // Actions
  addNotice: (notice: Notice) => void;
  updateNotice: (id: string, updates: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  addEvent: (event: SchoolEvent) => void;
  updateEvent: (id: string, updates: Partial<SchoolEvent>) => void;
  deleteEvent: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toggleBookmark: (noticeId: string) => void;
  addSchool: (school: School) => void;
  updateSchool: (id: string, updates: Partial<School>) => void;
  approveSchool: (id: string) => void;
  suspendSchool: (id: string) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  // Helpers
  getSchoolNotices: (schoolId: string) => Notice[];
  getUserNotifications: (userId: string) => Notification[];
  getUserBookmarks: (userId: string) => Bookmark[];
  getSchoolUsers: (schoolId: string) => User[];
  getSchoolEvents: (schoolId: string) => SchoolEvent[];
  getSchoolClasses: (schoolId: string) => SchoolClass[];
  getSchoolSections: (classId: string) => Section[];
  getStudentByUserId: (userId: string) => Student | undefined;
  getTeacherByUserId: (userId: string) => Teacher | undefined;
  getParentByUserId: (userId: string) => Parent | undefined;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      currentUser: null,
      isAuthenticated: false,
      
      login: (email: string, password: string) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user && user.status === 'active') {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({ currentUser: null, isAuthenticated: false }),
      
      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      // Data
      schools: demoSchools,
      users: demoUsers,
      notices: demoNotices,
      events: demoEvents,
      notifications: demoNotifications,
      bookmarks: [],
      categories: demoCategories,
      classes: demoClasses,
      sections: demoSections,
      students: demoStudents,
      teachers: demoTeachers,
      parents: demoParents,
      activities: demoActivities,
      achievements: demoAchievements,
      
      // Actions
      addNotice: (notice) => set(state => ({ notices: [notice, ...state.notices] })),
      updateNotice: (id, updates) => set(state => ({
        notices: state.notices.map(n => n.id === id ? { ...n, ...updates } : n)
      })),
      deleteNotice: (id) => set(state => ({
        notices: state.notices.filter(n => n.id !== id)
      })),
      
      addEvent: (event) => set(state => ({ events: [event, ...state.events] })),
      updateEvent: (id, updates) => set(state => ({
        events: state.events.map(e => e.id === id ? { ...e, ...updates } : e)
      })),
      deleteEvent: (id) => set(state => ({
        events: state.events.filter(e => e.id !== id)
      })),
      
      addNotification: (notification) => set(state => ({
        notifications: [notification, ...state.notifications]
      })),
      markNotificationRead: (id) => set(state => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
      })),
      markAllNotificationsRead: () => set(state => ({
        notifications: state.notifications.map(n => 
          n.userId === state.currentUser?.id ? { ...n, isRead: true } : n
        )
      })),
      
      toggleBookmark: (noticeId) => set(state => {
        const userId = state.currentUser?.id;
        if (!userId) return state;
        const existing = state.bookmarks.find(b => b.noticeId === noticeId && b.userId === userId);
        if (existing) {
          return { bookmarks: state.bookmarks.filter(b => b.id !== existing.id) };
        }
        return { bookmarks: [...state.bookmarks, { id: `bm-${Date.now()}`, userId, noticeId, createdAt: new Date().toISOString() }] };
      }),
      
      addSchool: (school) => set(state => ({ schools: [...state.schools, school] })),
      updateSchool: (id, updates) => set(state => ({
        schools: state.schools.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      approveSchool: (id) => set(state => ({
        schools: state.schools.map(s => s.id === id ? { ...s, status: 'approved' as const } : s)
      })),
      suspendSchool: (id) => set(state => ({
        schools: state.schools.map(s => s.id === id ? { ...s, status: 'suspended' as const } : s)
      })),
      
      addUser: (user) => set(state => ({ users: [...state.users, user] })),
      updateUser: (id, updates) => set(state => ({
        users: state.users.map(u => u.id === id ? { ...u, ...updates } : u)
      })),
      deleteUser: (id) => set(state => ({
        users: state.users.filter(u => u.id !== id)
      })),
      
      // Helpers
      getSchoolNotices: (schoolId) => get().notices.filter(n => n.schoolId === schoolId && n.status === 'published'),
      getUserNotifications: (userId) => get().notifications.filter(n => n.userId === userId),
      getUserBookmarks: (userId) => get().bookmarks.filter(b => b.userId === userId),
      getSchoolUsers: (schoolId) => get().users.filter(u => u.schoolId === schoolId),
      getSchoolEvents: (schoolId) => get().events.filter(e => e.schoolId === schoolId),
      getSchoolClasses: (schoolId) => get().classes.filter(c => c.schoolId === schoolId),
      getSchoolSections: (classId) => get().sections.filter(s => s.classId === classId),
      getStudentByUserId: (userId) => get().students.find(s => s.userId === userId),
      getTeacherByUserId: (userId) => get().teachers.find(t => t.userId === userId),
      getParentByUserId: (userId) => get().parents.find(p => p.userId === userId),
    }),
    {
      name: 'ai-school-noticeboard',
      partialize: (state) => ({
        theme: state.theme,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        schools: state.schools,
        users: state.users,
        notices: state.notices,
        events: state.events,
        notifications: state.notifications,
        bookmarks: state.bookmarks,
        activities: state.activities,
        achievements: state.achievements,
      }),
    }
  )
);

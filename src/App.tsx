import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/Dashboard';
import NoticesPage from './pages/Notices';
import NoticeDetailPage from './pages/NoticeDetail';
import CreateNoticePage from './pages/CreateNotice';
import EventsPage from './pages/Events';
import CalendarPage from './pages/Calendar';
import NotificationsPage from './pages/Notifications';
import BookmarksPage from './pages/Bookmarks';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import UsersPage from './pages/Users';
import AnalyticsPage from './pages/Analytics';
import AdminPage from './pages/Admin';
import SchoolPublicPage from './pages/SchoolPublic';
import AIAssistantPage from './pages/AIAssistant';
import AchievementsPage from './pages/Achievements';
import ActivitiesPage from './pages/Activities';
import { useEffect } from 'react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function App() {
  const theme = useAppStore(s => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/schools/:slug" element={<SchoolPublicPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/notices" element={<ProtectedRoute><DashboardLayout><NoticesPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/notices/create" element={<ProtectedRoute><DashboardLayout><CreateNoticePage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/notices/:id" element={<ProtectedRoute><DashboardLayout><NoticeDetailPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><DashboardLayout><EventsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><DashboardLayout><CalendarPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><DashboardLayout><NotificationsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><DashboardLayout><BookmarksPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><DashboardLayout><ProfilePage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><DashboardLayout><UsersPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><DashboardLayout><AdminPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ProtectedRoute><DashboardLayout><AIAssistantPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><DashboardLayout><AchievementsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/activities" element={<ProtectedRoute><DashboardLayout><ActivitiesPage /></DashboardLayout></ProtectedRoute>} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

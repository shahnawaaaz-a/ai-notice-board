import { useAppStore } from '../store';
import { Link } from 'react-router-dom';
import { Megaphone, Users, Calendar, Bell, TrendingUp, Eye, Download, Bookmark, AlertTriangle, Shield, School, UserCheck, Plus } from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, schools, notices, events, notifications, users, achievements } = useAppStore();
  if (!currentUser) return null;

  const school = schools.find(s => s.id === currentUser.schoolId);
  const schoolNotices = notices.filter(n => n.schoolId === currentUser.schoolId && n.status === 'published');
  const schoolEvents = events.filter(e => e.schoolId === currentUser.schoolId);
  const userNotifs = notifications.filter(n => n.userId === currentUser.id);
  const unreadNotifs = userNotifs.filter(n => !n.isRead);
  const schoolUsers = users.filter(u => u.schoolId === currentUser.schoolId);
  const schoolAchievements = achievements.filter(a => a.schoolId === currentUser.schoolId);

  const pinnedNotices = schoolNotices.filter(n => n.isPinned);
  const recentNotices = schoolNotices.slice(0, 5);
  const upcomingEvents = schoolEvents.filter(e => new Date(e.startDate) > new Date()).slice(0, 4);

  // Super Admin Dashboard
  if (currentUser.role === 'super_admin') {
    const totalSchools = schools.length;
    const approvedSchools = schools.filter(s => s.status === 'approved').length;
    const pendingSchools = schools.filter(s => s.status === 'pending').length;
    const totalUsers = users.length;
    const totalNotices = notices.length;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {currentUser.name}</p>
          </div>
          <Link to="/admin" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <Shield className="w-4 h-4" /> Admin Panel
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Schools', value: totalSchools, icon: School, color: 'bg-blue-500' },
            { label: 'Approved', value: approvedSchools, icon: UserCheck, color: 'bg-green-500' },
            { label: 'Pending', value: pendingSchools, icon: AlertTriangle, color: 'bg-yellow-500' },
            { label: 'Total Users', value: totalUsers, icon: Users, color: 'bg-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Schools</h3>
            <div className="space-y-3">
              {schools.slice(0, 5).map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400">{s.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.city}, {s.state}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : s.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Notices</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{totalNotices}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Events</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{events.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Achievements</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{achievements.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // School Admin / Teacher / Student / Parent Dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentUser.role === 'school_admin' ? 'School Dashboard' : currentUser.role === 'teacher' ? 'Teacher Dashboard' : currentUser.role === 'student' ? 'Student Dashboard' : 'Parent Dashboard'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {school?.name} • {school?.academicYear}
          </p>
        </div>
        {(currentUser.role === 'school_admin' || currentUser.role === 'teacher') && (
          <Link to="/notices/create" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Notice
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Notices', value: schoolNotices.length, icon: Megaphone, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' },
          { label: 'Events', value: schoolEvents.length, icon: Calendar, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400' },
          { label: 'Unread', value: unreadNotifs.length, icon: Bell, color: 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400' },
          { label: currentUser.role === 'school_admin' ? 'Users' : 'Achievements', value: currentUser.role === 'school_admin' ? schoolUsers.length : schoolAchievements.length, icon: currentUser.role === 'school_admin' ? Users : TrendingUp, color: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            📌 Pinned Notices
          </h3>
          <div className="space-y-3">
            {pinnedNotices.map(notice => (
              <Link key={notice.id} to={`/notices/${notice.id}`} className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        notice.priority === 'emergency' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        notice.priority === 'urgent' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        notice.priority === 'important' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                      }`}>{notice.priority}</span>
                      <span className="text-xs text-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{notice.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{notice.content.substring(0, 120)}...</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Eye className="w-3.5 h-3.5" />{notice.views}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notices */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Recent Notices</h3>
            <Link to="/notices" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          {recentNotices.length === 0 ? (
            <div className="text-center py-8">
              <Megaphone className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
              <p className="text-gray-500 mt-2">No notices yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentNotices.map(notice => (
                <Link key={notice.id} to={`/notices/${notice.id}`} className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notice.priority === 'emergency' ? 'bg-red-500' :
                      notice.priority === 'urgent' ? 'bg-orange-500' :
                      notice.priority === 'important' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{notice.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{notice.content.substring(0, 80)}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span>{notice.authorName}</span>
                        <span>•</span>
                        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Eye className="w-3.5 h-3.5" />{notice.views}
                      <Download className="w-3.5 h-3.5 ml-1" />{notice.downloads}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
              <Link to="/events" className="text-sm text-indigo-600 hover:underline">View all</Link>
            </div>
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {(currentUser.role === 'school_admin' || currentUser.role === 'teacher') && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/notices/create" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                  <Plus className="w-4 h-4 text-indigo-500" /> Create Notice
                </Link>
                <Link to="/users" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4 text-green-500" /> Manage Users
                </Link>
                <Link to="/analytics" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                  <TrendingUp className="w-4 h-4 text-purple-500" /> View Analytics
                </Link>
                <Link to="/ai-assistant" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                  <Bookmark className="w-4 h-4 text-orange-500" /> AI Assistant
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

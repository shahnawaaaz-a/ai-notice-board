import { useAppStore } from '../store';
import { BarChart3, TrendingUp, Eye, Users, Megaphone, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function AnalyticsPage() {
  const { currentUser, notices, events, users, schools } = useAppStore();
  if (!currentUser) return null;

  const isSuperAdmin = currentUser.role === 'super_admin';
  const schoolNotices = isSuperAdmin ? notices : notices.filter(n => n.schoolId === currentUser.schoolId);
  const schoolEvents = isSuperAdmin ? events : events.filter(e => e.schoolId === currentUser.schoolId);
  const schoolUsers = isSuperAdmin ? users : users.filter(u => u.schoolId === currentUser.schoolId);

  // Chart data
  const categoryData = [
    { name: 'General', count: schoolNotices.filter(n => n.categoryId === 'cat-general').length },
    { name: 'Important', count: schoolNotices.filter(n => n.categoryId === 'cat-important').length },
    { name: 'Exam', count: schoolNotices.filter(n => n.categoryId === 'cat-exam').length },
    { name: 'Event', count: schoolNotices.filter(n => n.categoryId === 'cat-event').length },
    { name: 'Homework', count: schoolNotices.filter(n => n.categoryId === 'cat-homework').length },
    { name: 'Emergency', count: schoolNotices.filter(n => n.categoryId === 'cat-emergency').length },
  ].filter(d => d.count > 0);

  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#ec4899', '#10b981', '#dc2626'];

  const engagementData = schoolNotices.slice(0, 7).map(n => ({
    name: n.title.substring(0, 15) + '...',
    views: n.views,
    downloads: n.downloads,
  }));

  const monthlyData = [
    { month: 'Jan', notices: 12, users: 45 },
    { month: 'Feb', notices: 18, users: 52 },
    { month: 'Mar', notices: 15, users: 58 },
    { month: 'Apr', notices: 22, users: 65 },
    { month: 'May', notices: 28, users: 72 },
    { month: 'Jun', notices: 20, users: 78 },
  ];

  const totalViews = schoolNotices.reduce((sum, n) => sum + n.views, 0);
  const totalDownloads = schoolNotices.reduce((sum, n) => sum + n.downloads, 0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">{isSuperAdmin ? 'Platform Analytics' : 'School Analytics'}</h1><p className="text-gray-600 dark:text-gray-400">Insights and engagement metrics</p></div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: isSuperAdmin ? 'Total Schools' : 'Notices', value: isSuperAdmin ? schools.length : schoolNotices.length, icon: isSuperAdmin ? Megaphone : BarChart3, color: 'bg-blue-500' },
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'bg-green-500' },
          { label: 'Downloads', value: totalDownloads.toLocaleString(), icon: TrendingUp, color: 'bg-purple-500' },
          { label: 'Users', value: schoolUsers.length, icon: Users, color: 'bg-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p><p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p></div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}><stat.icon className="w-5 h-5 text-white" /></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notices by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="count" label={({ name, count }) => `${name}: ${count}`}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="notices" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notice Engagement</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
            <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="downloads" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

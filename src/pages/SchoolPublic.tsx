import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { School, MapPin, Globe, Phone, Calendar, Megaphone, Trophy } from 'lucide-react';

export default function SchoolPublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { schools, notices, events, achievements } = useAppStore();
  const school = schools.find(s => s.slug === slug);

  if (!school) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center"><School className="w-16 h-16 text-gray-300 mx-auto" /><h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">School not found</h2><Link to="/" className="text-indigo-600 hover:underline mt-2 inline-block">← Go home</Link></div>
    </div>
  );

  const publicNotices = notices.filter(n => n.schoolId === school.id && n.status === 'published').slice(0, 10);
  const schoolEvents = events.filter(e => e.schoolId === school.id);
  const schoolAchievements = achievements.filter(a => a.schoolId === school.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><School className="w-5 h-5 text-white" /></div><span className="font-bold text-gray-900 dark:text-white">AI Noticeboard</span></Link>
          <Link to="/login" className="text-sm text-indigo-600 hover:underline font-medium">Sign In</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* School Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">{school.name.charAt(0)}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{school.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Principal: {school.principalName}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{school.address}, {school.city}</span>
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{school.phone}</span>
                {school.website && <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{school.website}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notices */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><Megaphone className="w-5 h-5" /> Public Notices</h2>
            {publicNotices.length === 0 ? <p className="text-gray-500">No public notices available.</p> : (
              <div className="space-y-3">
                {publicNotices.map(notice => (
                  <div key={notice.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${notice.priority === 'emergency' ? 'bg-red-100 text-red-700' : notice.priority === 'important' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{notice.priority}</span>
                      <span className="text-xs text-gray-400">{new Date(notice.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{notice.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{notice.content.substring(0, 150)}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Calendar className="w-5 h-5" /> Upcoming Events</h3>
              {schoolEvents.length === 0 ? <p className="text-sm text-gray-500">No upcoming events</p> : (
                <div className="space-y-2">
                  {schoolEvents.slice(0, 5).map(e => (
                    <div key={e.id} className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{e.title}</p>
                      <p className="text-xs text-gray-500">{new Date(e.startDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Trophy className="w-5 h-5" /> Achievements</h3>
              {schoolAchievements.length === 0 ? <p className="text-sm text-gray-500">No achievements listed</p> : (
                <div className="space-y-2">
                  {schoolAchievements.slice(0, 5).map(a => (
                    <div key={a.id} className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.studentName} • {a.className}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

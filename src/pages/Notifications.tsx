import { useAppStore } from '../store';
import { Bell, Check, CheckCheck, Megaphone, Calendar, AlertTriangle, BookOpen } from 'lucide-react';

export default function NotificationsPage() {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  if (!currentUser) return null;
  const userNotifs = notifications.filter(n => n.userId === currentUser.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const unread = userNotifs.filter(n => !n.isRead);

  const getIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'event': return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'exam': return <BookOpen className="w-5 h-5 text-orange-500" />;
      default: return <Megaphone className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1><p className="text-gray-600 dark:text-gray-400">{unread.length} unread</p></div>
        {unread.length > 0 && <button onClick={markAllNotificationsRead} className="text-sm text-indigo-600 hover:underline font-medium flex items-center gap-1"><CheckCheck className="w-4 h-4" /> Mark all read</button>}
      </div>

      {userNotifs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <p className="text-gray-500 mt-4">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {userNotifs.map(notif => (
            <div key={notif.id} className={`bg-white dark:bg-gray-800 rounded-xl border p-4 flex items-start gap-3 transition-colors ${notif.isRead ? 'border-gray-200 dark:border-gray-700' : 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10'}`}>
              <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-white'}`}>{notif.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              {!notif.isRead && (
                <button onClick={() => markNotificationRead(notif.id)} className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

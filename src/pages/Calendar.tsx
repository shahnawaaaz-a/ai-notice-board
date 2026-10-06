import { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const { currentUser, events, notices } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  if (!currentUser) return null;

  const schoolEvents = events.filter(e => e.schoolId === currentUser.schoolId);
  const schoolNotices = notices.filter(n => n.schoolId === currentUser.schoolId && n.status === 'published');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const getEventsForDay = (day: number) => {
    const date = new Date(year, month, day);
    return schoolEvents.filter(e => {
      const eDate = new Date(e.startDate);
      return eDate.getDate() === day && eDate.getMonth() === month && eDate.getFullYear() === year;
    });
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Calendar</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" /></button>
          <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[180px] text-center">{monthName}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" /></button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="p-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const dayEvents = day ? getEventsForDay(day) : [];
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            return (
              <div key={i} className={`min-h-[80px] p-2 border-b border-r border-gray-100 dark:border-gray-700 ${!day ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
                {day && (
                  <>
                    <span className={`text-sm font-medium ${isToday ? 'w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center' : 'text-gray-700 dark:text-gray-300'}`}>{day}</span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.map(e => (
                        <div key={e.id} className="text-[10px] px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded truncate">{e.title}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events This Month</h3>
        {schoolEvents.filter(e => { const d = new Date(e.startDate); return d.getMonth() === month && d.getFullYear() === year; }).length === 0 ? (
          <p className="text-sm text-gray-500">No events this month</p>
        ) : (
          <div className="space-y-3">
            {schoolEvents.filter(e => { const d = new Date(e.startDate); return d.getMonth() === month && d.getFullYear() === year; }).map(e => (
              <div key={e.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{new Date(e.startDate).getDate()}</span>
                </div>
                <div><p className="text-sm font-medium text-gray-900 dark:text-white">{e.title}</p><p className="text-xs text-gray-500">{e.location}</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

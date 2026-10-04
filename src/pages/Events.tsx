import { useState } from 'react';
import { useAppStore } from '../store';
import { Calendar, MapPin, Clock, Users, Plus, Loader2 } from 'lucide-react';

export default function EventsPage() {
  const { currentUser, events, addEvent } = useAppStore();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', startDate: '', endDate: '', location: '' });
  const [loading, setLoading] = useState(false);

  if (!currentUser) return null;
  const schoolEvents = events.filter(e => e.schoolId === currentUser.schoolId).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addEvent({
        id: `event-${Date.now()}`, schoolId: currentUser.schoolId!, title: form.title, description: form.description,
        startDate: form.startDate, endDate: form.endDate || form.startDate, location: form.location,
        organizer: currentUser.name, audienceType: 'all', coverImageUrl: '', createdBy: currentUser.id, createdAt: new Date().toISOString(),
      });
      setForm({ title: '', description: '', startDate: '', endDate: '', location: '' });
      setShowCreate(false);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1><p className="text-gray-600 dark:text-gray-400">{schoolEvents.length} events</p></div>
        {(currentUser.role === 'school_admin' || currentUser.role === 'teacher') && (
          <button onClick={() => setShowCreate(!showCreate)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Create Event</button>
        )}
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Event title" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="datetime-local" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
            <input type="datetime-local" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Location" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          <div className="flex gap-3"><button type="button" onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Event'}</button></div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schoolEvents.map(event => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{new Date(event.startDate).toLocaleDateString('en', { month: 'short' })}</span>
                <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{new Date(event.startDate).getDate()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(event.startDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</span>
                  {event.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {schoolEvents.length === 0 && <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"><Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" /><p className="text-gray-500 mt-4">No events yet</p></div>}
    </div>
  );
}

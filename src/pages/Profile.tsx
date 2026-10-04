import { useState } from 'react';
import { useAppStore } from '../store';
import { User, Mail, Phone, School, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateUser, schools } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser?.name || '', phone: currentUser?.phone || '' });
  if (!currentUser) return null;
  const school = schools.find(s => s.id === currentUser.schoolId);

  const handleSave = () => {
    updateUser(currentUser.id, { name: form.name, phone: form.phone, updatedAt: new Date().toISOString() });
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentUser.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h2>
            <span className="inline-block mt-1 text-xs px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full capitalize">{currentUser.role.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.email}</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <div><p className="text-xs text-gray-500">Phone</p><p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.phone || 'Not set'}</p></div>
          </div>
          {school && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <School className="w-5 h-5 text-gray-400" />
              <div><p className="text-xs text-gray-500">School</p><p className="text-sm font-medium text-gray-900 dark:text-white">{school.name}</p></div>
            </div>
          )}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div><p className="text-xs text-gray-500">Member since</p><p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(currentUser.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
          </div>
        </div>

        {editing ? (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditing(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg">Save</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="mt-6 w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Edit Profile</button>
        )}
      </div>
    </div>
  );
}

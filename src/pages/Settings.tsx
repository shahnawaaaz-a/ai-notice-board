import { useAppStore } from '../store';
import { Moon, Sun, Monitor, Bell, Shield, Globe } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme, currentUser } = useAppStore();
  if (!currentUser) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      {/* Theme */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Monitor className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['light', 'dark', 'system'] as const).map(mode => (
            <button key={mode} onClick={() => setTheme(mode)} className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors ${theme === mode ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              {mode === 'light' ? <Sun className="w-5 h-5 mx-auto mb-1" /> : mode === 'dark' ? <Moon className="w-5 h-5 mx-auto mb-1" /> : <Monitor className="w-5 h-5 mx-auto mb-1" />}
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
        </div>
        <div className="space-y-3">
          {['All notifications', 'Important only', 'Emergency only', 'Events', 'Exam updates', 'Homework'].map(item => (
            <label key={item} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Change Password</button>
          <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Two-Factor Authentication</button>
          <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Active Sessions</button>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Language</h3>
        </div>
        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option>English</option>
          <option>हिन्दी (Hindi)</option>
          <option>اردو (Urdu)</option>
        </select>
      </div>
    </div>
  );
}

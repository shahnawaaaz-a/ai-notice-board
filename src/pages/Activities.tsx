import { useAppStore } from '../store';
import { Sparkles, Calendar, Users } from 'lucide-react';

export default function ActivitiesPage() {
  const { currentUser, activities } = useAppStore();
  if (!currentUser) return null;
  const schoolActivities = activities.filter(a => a.schoolId === currentUser.schoolId);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activities</h1><p className="text-gray-600 dark:text-gray-400">School activities and programs</p></div>

      {schoolActivities.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Sparkles className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <p className="text-gray-500 mt-4">No activities recorded yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {schoolActivities.map(activity => (
            <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">{activity.type}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(activity.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{activity.description}</p>
                  
                  {activity.results && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{activity.results}</p>
                    </div>
                  )}
                  
                  {activity.winners.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> Winners & Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {activity.winners.map((w, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full">🏆 {w}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

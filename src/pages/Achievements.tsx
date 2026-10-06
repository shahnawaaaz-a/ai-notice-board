import { useAppStore } from '../store';
import { Trophy, Award, Star } from 'lucide-react';

export default function AchievementsPage() {
  const { currentUser, achievements } = useAppStore();
  if (!currentUser) return null;
  const schoolAchievements = achievements.filter(a => a.schoolId === currentUser.schoolId);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1><p className="text-gray-600 dark:text-gray-400">Celebrating excellence</p></div>

      {schoolAchievements.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <p className="text-gray-500 mt-4">No achievements recorded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schoolAchievements.map(ach => (
            <div key={ach.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{ach.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ach.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{ach.studentName}</span>
                    <span className="text-xs text-gray-500">• {ach.className}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">{ach.category}</span>
                    <span className="text-xs text-gray-400">{new Date(ach.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

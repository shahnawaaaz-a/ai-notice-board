import { useAppStore } from '../store';
import { Link } from 'react-router-dom';
import { Bookmark, Megaphone, Eye } from 'lucide-react';

export default function BookmarksPage() {
  const { currentUser, bookmarks, notices, categories } = useAppStore();
  if (!currentUser) return null;
  const userBookmarks = bookmarks.filter(b => b.userId === currentUser.id);
  const bookmarkedNotices = userBookmarks.map(b => notices.find(n => n.id === b.noticeId)).filter(Boolean);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookmarks</h1><p className="text-gray-600 dark:text-gray-400">{userBookmarks.length} saved notices</p></div>
      {bookmarkedNotices.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Bookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <p className="text-gray-500 mt-4">No bookmarked notices</p>
          <Link to="/notices" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">Browse notices</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedNotices.map(notice => {
            if (!notice) return null;
            const cat = categories.find(c => c.id === notice.categoryId);
            return (
              <Link key={notice.id} to={`/notices/${notice.id}`} className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <Bookmark className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    {cat && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: cat.color + '20', color: cat.color }}>{cat.name}</span>}
                    <h3 className="font-medium text-gray-900 dark:text-white mt-1">{notice.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{notice.content.substring(0, 100)}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{notice.authorName}</span>
                      <span>•</span>
                      <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{notice.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

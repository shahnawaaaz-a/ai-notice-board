import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowLeft, Calendar, User, Eye, Download, Bookmark, Share2, Clock, Tag, Users, AlertTriangle } from 'lucide-react';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { notices, categories, currentUser, bookmarks, toggleBookmark, updateNotice } = useAppStore();
  
  if (!currentUser || !id) return null;
  const notice = notices.find(n => n.id === id);
  if (!notice) return (
    <div className="text-center py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notice not found</h2>
      <Link to="/notices" className="text-indigo-600 hover:underline mt-2 inline-block">← Back to notices</Link>
    </div>
  );

  const category = categories.find(c => c.id === notice.categoryId);
  const isBookmarked = bookmarks.some(b => b.noticeId === notice.id && b.userId === currentUser.id);

  // Increment views on load
  if (notice.views === 0 || notice.views) {
    setTimeout(() => updateNotice(notice.id, { views: notice.views + 1 }), 0);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/notices" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">
        <ArrowLeft className="w-4 h-4" /> Back to notices
      </Link>

      <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Priority Banner */}
        {notice.priority === 'emergency' && (
          <div className="bg-red-600 text-white px-6 py-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Emergency Notice</span>
          </div>
        )}

        <div className="p-6 lg:p-8">
          {/* Meta */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {category && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: category.color + '20', color: category.color }}>
                {category.name}
              </span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
              notice.priority === 'emergency' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
              notice.priority === 'urgent' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              notice.priority === 'important' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>{notice.priority}</span>
            {notice.isPinned && <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">📌 Pinned</span>}
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{notice.title}</h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{notice.authorName}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {notice.expiresAt && (
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Expires: {new Date(notice.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            )}
          </div>

          {/* Content */}
          <div className="mt-6 prose dark:prose-invert max-w-none">
            {notice.content.split('\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {notice.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-6 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {notice.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">#{tag}</span>
              ))}
            </div>
          )}

          {/* Target Audience */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>Audience: {notice.audienceType === 'all' ? 'Everyone' : notice.audienceType}</span>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => toggleBookmark(notice.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isBookmarked ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{notice.views} views</span>
            <span className="flex items-center gap-1.5"><Download className="w-4 h-4" />{notice.downloads} downloads</span>
            <span className="flex items-center gap-1.5"><Bookmark className="w-4 h-4" />{notice.bookmarks} bookmarks</span>
          </div>
        </div>
      </article>
    </div>
  );
}

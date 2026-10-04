import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Search, Filter, Eye, Download, Bookmark, Pin, Plus, Megaphone, Calendar, User, ChevronDown } from 'lucide-react';

export default function NoticesPage() {
  const { currentUser, notices, categories, bookmarks, toggleBookmark } = useAppStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  if (!currentUser) return null;

  const schoolNotices = notices.filter(n => n.schoolId === currentUser.schoolId && n.status === 'published');
  const bookmarkedIds = bookmarks.filter(b => b.userId === currentUser.id).map(b => b.noticeId);

  const filteredNotices = useMemo(() => {
    let result = schoolNotices;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some(t => t.includes(q)));
    }
    if (categoryFilter) result = result.filter(n => n.categoryId === categoryFilter);
    if (priorityFilter) result = result.filter(n => n.priority === priorityFilter);
    // Sort: pinned first, then by date
    return result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [schoolNotices, search, categoryFilter, priorityFilter]);

  const getCategoryInfo = (catId: string) => categories.find(c => c.id === catId);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'important': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Noticeboard</h1>
          <p className="text-gray-600 dark:text-gray-400">{filteredNotices.length} notices</p>
        </div>
        {(currentUser.role === 'school_admin' || currentUser.role === 'teacher') && (
          <Link to="/notices/create" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Notice
          </Link>
        )}
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-lg border text-sm font-medium flex items-center gap-2 ${showFilters ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <Filter className="w-4 h-4" /> Filters <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
              <option value="">All Categories</option>
              {categories.filter(c => c.isGlobal || c.schoolId === currentUser.schoolId).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
              <option value="">All Priorities</option>
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
            {(categoryFilter || priorityFilter) && (
              <button onClick={() => { setCategoryFilter(''); setPriorityFilter(''); }} className="text-sm text-indigo-600 hover:underline">Clear filters</button>
            )}
          </div>
        )}
      </div>

      {/* Notices Feed */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Megaphone className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">No notices found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map(notice => {
            const category = getCategoryInfo(notice.categoryId);
            const isBookmarked = bookmarkedIds.includes(notice.id);
            
            return (
              <div key={notice.id} className={`bg-white dark:bg-gray-800 rounded-xl border ${notice.priority === 'emergency' ? 'border-red-300 dark:border-red-700 ring-1 ring-red-200 dark:ring-red-800' : 'border-gray-200 dark:border-gray-700'} overflow-hidden hover:shadow-md transition-shadow`}>
                {notice.isPinned && (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-1.5 flex items-center gap-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                    <Pin className="w-3 h-3" /> Pinned Notice
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {category && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: category.color + '20', color: category.color }}>
                            {category.name}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getPriorityStyle(notice.priority)}`}>
                          {notice.priority === 'emergency' && '🚨 '}{notice.priority}
                        </span>
                      </div>
                      
                      <Link to={`/notices/${notice.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">{notice.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{notice.content.substring(0, 200)}...</p>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{notice.authorName}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{notice.views} views</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => toggleBookmark(notice.id)}
                        className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'}`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <Link to={`/notices/${notice.id}`} className="text-xs text-indigo-600 hover:underline font-medium">View →</Link>
                    </div>
                  </div>

                  {notice.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {notice.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

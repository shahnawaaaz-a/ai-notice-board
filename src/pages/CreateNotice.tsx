import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Sparkles, Loader2 } from 'lucide-react';
import type { NoticePriority, AudienceType } from '../types';

export default function CreateNoticePage() {
  const { currentUser, categories, classes, addNotice } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', content: '', categoryId: 'cat-general', priority: 'normal' as NoticePriority,
    audienceType: 'all' as AudienceType, targetClassIds: [] as string[], tags: '', isPinned: false,
  });

  if (!currentUser || (currentUser.role !== 'school_admin' && currentUser.role !== 'teacher')) {
    return <div className="text-center py-16"><p className="text-gray-500">You don't have permission to create notices.</p></div>;
  }

  const schoolCategories = categories.filter(c => c.isGlobal || c.schoolId === currentUser.schoolId);

  const handleAI = () => {
    setAiLoading(true);
    setTimeout(() => {
      const improved = `We wish to inform you that ${form.content || 'the school will remain closed tomorrow due to unforeseen circumstances'}. All students and staff are requested to take note of this important update. For any queries, please contact the school office. Thank you for your cooperation.`;
      setForm(f => ({ ...f, content: improved }));
      setAiLoading(false);
    }, 1500);
  };

  const handleAIGenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      setForm(f => ({
        ...f,
        title: 'Important School Announcement',
        content: `Dear Students and Parents,\n\nThis is to inform you that ${form.content || 'an important update regarding school activities'}.\n\nPlease take note of the following:\n- All concerned students must adhere to the instructions\n- Parents are requested to ensure compliance\n- For any queries, contact the school office\n\nThank you for your cooperation.\n\nRegards,\nSchool Administration`
      }));
      setAiLoading(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const notice = {
        id: `notice-${Date.now()}`,
        schoolId: currentUser.schoolId!,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        title: form.title,
        content: form.content,
        categoryId: form.categoryId,
        priority: form.priority,
        status: 'published' as const,
        audienceType: form.audienceType,
        targetClassIds: form.targetClassIds,
        targetSectionIds: [],
        publishAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        coverImageUrl: '',
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        isPinned: form.isPinned,
        commentsEnabled: true,
        notificationEnabled: true,
        requireAcknowledgement: form.priority === 'emergency',
        views: 0,
        downloads: 0,
        bookmarks: 0,
        acknowledgements: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      addNotice(notice);
      setLoading(false);
      navigate('/notices');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Notice</h1>
        <p className="text-gray-600 dark:text-gray-400">Publish a new notice to the school noticeboard</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter notice title"
            required
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content *</label>
            <div className="flex gap-2">
              <button type="button" onClick={handleAIGenerate} disabled={aiLoading} className="text-xs px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 flex items-center gap-1 disabled:opacity-50">
                {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} Generate with AI
              </button>
              <button type="button" onClick={handleAI} disabled={aiLoading} className="text-xs px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium hover:bg-indigo-200 flex items-center gap-1 disabled:opacity-50">
                {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} Improve with AI
              </button>
            </div>
          </div>
          <textarea
            value={form.content}
            onChange={e => setForm({...form, content: e.target.value})}
            rows={8}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Write your notice content here..."
            required
          />
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
              {schoolCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value as NoticePriority})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
          <select value={form.audienceType} onChange={e => setForm({...form, audienceType: e.target.value as AudienceType})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
            <option value="all">Everyone</option>
            <option value="teachers">Teachers</option>
            <option value="students">Students</option>
            <option value="parents">Parents</option>
            <option value="class">Specific Class</option>
          </select>
        </div>

        {/* Class Selection */}
        {form.audienceType === 'class' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Classes</label>
            <div className="flex flex-wrap gap-2">
              {classes.filter(c => c.schoolId === currentUser.schoolId).map(cls => (
                <label key={cls.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer text-sm">
                  <input type="checkbox" checked={form.targetClassIds.includes(cls.id)} onChange={e => {
                    if (e.target.checked) setForm({...form, targetClassIds: [...form.targetClassIds, cls.id]});
                    else setForm({...form, targetClassIds: form.targetClassIds.filter(id => id !== cls.id)});
                  }} className="rounded" />
                  {cls.name}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" placeholder="exam, class-10, mathematics" />
        </div>

        {/* Pin */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isPinned} onChange={e => setForm({...form, isPinned: e.target.checked})} className="rounded" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Pin this notice to the top</span>
        </label>

        {/* Submit */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button type="button" onClick={() => navigate('/notices')} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</> : 'Publish Notice'}
          </button>
        </div>
      </form>
    </div>
  );
}

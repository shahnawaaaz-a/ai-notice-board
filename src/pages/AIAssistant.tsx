import { useState } from 'react';
import { useAppStore } from '../store';
import { Bot, Send, Sparkles, Loader2 } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function AIAssistantPage() {
  const { currentUser, notices, events } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI School Assistant. I can help you find information about notices, events, exams, holidays, and more. Try asking:\n\n• \"What notices were posted today?\"\n• \"Is there a holiday next week?\"\n• \"When is the next PTM?\"\n• \"Show me exam-related notices\"\n• \"Summarize the latest emergency notice\"" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!currentUser) return null;

  const schoolNotices = notices.filter(n => n.schoolId === currentUser.schoolId && n.status === 'published');
  const schoolEvents = events.filter(e => e.schoolId === currentUser.schoolId);

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('today') || q.includes('posted')) {
      const today = new Date().toDateString();
      const todayNotices = schoolNotices.filter(n => new Date(n.createdAt).toDateString() === today);
      if (todayNotices.length === 0) return "I don't see any notices posted today. The most recent notice is: \"" + schoolNotices[0]?.title + "\" posted on " + new Date(schoolNotices[0]?.createdAt || '').toLocaleDateString() + ".";
      return `There are ${todayNotices.length} notice(s) posted today:\n${todayNotices.map(n => `• ${n.title}`).join('\n')}`;
    }
    
    if (q.includes('holiday') || q.includes('closed')) {
      const holidays = schoolNotices.filter(n => n.categoryId === 'cat-holiday' || n.content.toLowerCase().includes('holiday') || n.content.toLowerCase().includes('closed'));
      if (holidays.length === 0) return "I don't see any upcoming holiday announcements at the moment.";
      return `Here are the holiday-related notices:\n${holidays.map(n => `• ${n.title} - ${new Date(n.createdAt).toLocaleDateString()}`).join('\n')}`;
    }
    
    if (q.includes('exam') || q.includes('test')) {
      const exams = schoolNotices.filter(n => n.categoryId === 'cat-exam' || n.content.toLowerCase().includes('exam') || n.content.toLowerCase().includes('test'));
      if (exams.length === 0) return "I don't see any exam-related notices currently.";
      return `Here are the exam-related notices:\n${exams.map(n => `• ${n.title} (${new Date(n.createdAt).toLocaleDateString()})`).join('\n')}`;
    }
    
    if (q.includes('event') || q.includes('ptm') || q.includes('meeting')) {
      const upcomingEvents = schoolEvents.filter(e => new Date(e.startDate) > new Date());
      if (upcomingEvents.length === 0) return "There are no upcoming events scheduled at the moment.";
      return `Upcoming events:\n${upcomingEvents.map(e => `• ${e.title} - ${new Date(e.startDate).toLocaleDateString()} at ${e.location || 'TBA'}`).join('\n')}`;
    }
    
    if (q.includes('emergency')) {
      const emergencies = schoolNotices.filter(n => n.priority === 'emergency');
      if (emergencies.length === 0) return "There are no active emergency notices at the moment.";
      return `Active emergency notices:\n${emergencies.map(n => `• ${n.title}\n  ${n.content.substring(0, 100)}...`).join('\n\n')}`;
    }

    if (q.includes('summarize') || q.includes('summary')) {
      const latest = schoolNotices[0];
      if (!latest) return "There are no notices to summarize.";
      return `📋 Summary of "${latest.title}":\n\n• Category: ${latest.categoryId.replace('cat-', '')}\n• Priority: ${latest.priority}\n• Posted by: ${latest.authorName}\n• Views: ${latest.views}\n• Key content: ${latest.content.substring(0, 150)}...`;
    }

    if (q.includes('notice') || q.includes('announcement')) {
      return `Your school has ${schoolNotices.length} published notices. The most recent ones are:\n${schoolNotices.slice(0, 5).map(n => `• ${n.title} [${n.priority}]`).join('\n')}\n\nWould you like me to filter by category or priority?`;
    }

    return `I found ${schoolNotices.length} notices and ${schoolEvents.length} events for your school. Here are some things I can help with:\n\n• Search notices by category or date\n• Find upcoming events\n• Check exam schedules\n• Look up holiday information\n• Summarize notices\n\nPlease try a more specific question!`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 1000);
  };

  const suggestions = ['What notices were posted today?', 'Is there a holiday next week?', 'When is the next PTM?', 'Show exam notices', 'Summarize latest notice'];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
          <p className="text-sm text-gray-500">Ask questions about your school notices and events</p>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" /></div>}
              <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"><Loader2 className="w-4 h-4 text-purple-600 animate-spin" /></div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-xl"><Loader2 className="w-4 h-4 animate-spin text-gray-400" /></div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex gap-2 overflow-x-auto">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { setInput(s); }} className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600">{s}</button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about notices, events, exams..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg disabled:opacity-50">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">AI responses are based on your school's data. AI may occasionally make mistakes.</p>
    </div>
  );
}

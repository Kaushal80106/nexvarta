import { useState, type FormEvent } from 'react';
import { Sparkles, Send, Bot, User, Copy, Check, ExternalLink, Bookmark } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { showToast } from '../../store/useAppStore';
import { mockStories } from '../../data/mockStories';
import { SavedStoryCard } from '../cards/SavedStoryCard';

const promptTemplates = [
  'Explain the RBI repo rate pause and what it means for Indian home loans.',
  'Summarize the Dahanu-Virar rail quadrupling and key milestones.',
  'Compare OpenAI test-time compute with traditional LLM reasoning.',
  'What is the current status of the Dholera semiconductor fabrication facility?'
];

export function AssistantView() {
  const { chatHistory, sendAssistantMessage } = useAppStore();
  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendAssistantMessage(inputVal);
    setInputVal('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="border-b border-[#252B38] pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#7C5CFF]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            NexVarta AI News Assistant
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Grounded conversational intelligence across hundreds of verified wires, research papers, and civic records.
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
        {promptTemplates.map((p) => (
          <button
            key={p}
            onClick={() => sendAssistantMessage(p)}
            className="p-3 rounded-xl bg-[#10141D] hover:bg-[#171C27] border border-[#252B38] hover:border-[#7C5CFF]/50 text-left text-slate-300 hover:text-white transition-all"
          >
            <span className="text-[#7C5CFF] mr-1.5">✦</span>
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Conversation Thread */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl min-h-[400px] flex flex-col justify-between overflow-hidden">
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[520px]">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#7C5CFF]/20 border border-[#7C5CFF]/40 text-[#7C5CFF] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-[#7C5CFF] text-white rounded-br-none font-medium'
                    : 'bg-[#171C27] border border-[#252B38] text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#252B38] text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500">GROUNDED IN INDEPENDENT SOURCES: </span>
                    <span className="text-[#22D3EE] font-medium">{msg.sources.join(', ')}</span>
                  </div>
                )}

                {msg.role === 'assistant' && (
                  <div className="mt-2.5 flex items-center justify-end gap-2 text-slate-400">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-white flex items-center gap-1 text-[11px] font-mono"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-[#252B38] text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-[#171C27] border-t border-[#252B38] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything about current events, policy, or markets..."
            className="flex-1 bg-[#10141D] border border-[#252B38] focus:border-[#7C5CFF] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="p-3 rounded-xl bg-[#7C5CFF] hover:bg-[#6D4AEF] disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function SavedView() {
  const { user, navigate } = useAppStore();
  const [selectedFolder, setSelectedFolder] = useState('All');

  const folders = ['All', 'Technology', 'Finance', 'Research', 'Read Later'];

  const savedStories = mockStories.filter((s) => user.savedStoryIds.includes(s.id));

  const filtered = selectedFolder === 'All'
    ? savedStories
    : savedStories.filter(s => s.category.toLowerCase() === selectedFolder.toLowerCase());

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252B38] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#7C5CFF]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Saved Intelligence Library
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {savedStories.length} curated stories bookmarked for reference and research.
          </p>
        </div>

        {/* Folder pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${
                selectedFolder === f
                  ? 'bg-[#171C27] border-[#7C5CFF] text-white font-semibold'
                  : 'bg-[#10141D] border-[#252B38] text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-12 text-center max-w-md mx-auto">
          <Bookmark className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Your library is empty</h3>
          <p className="text-xs text-slate-400 mb-4">
            Click the bookmark icon on any story to save it here for future research.
          </p>
          <button
            onClick={() => navigate('home')}
            className="px-4 py-2 rounded-lg bg-[#7C5CFF] text-white font-semibold text-xs"
          >
            Explore Feed
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((story) => (
            <SavedStoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}

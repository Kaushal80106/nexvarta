import { useState } from 'react';
import { Clock, Trash2, ArrowUpRight, Sliders, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockStories } from '../../data/mockStories';
import { formatRelativeTime } from '../../lib/utils';
import { showToast } from '../../store/useAppStore';

export function HistoryView() {
  const { navigate } = useAppStore();
  const [historyList, setHistoryList] = useState(mockStories.slice(0, 4));

  const handleClear = () => {
    setHistoryList([]);
    showToast('Reading history cleared');
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#252B38] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#22D3EE]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Reading & Inquiry History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Past story syntheses and conversational queries you have analyzed.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-mono transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-12 text-center max-w-md mx-auto">
          <Clock className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No reading history</h3>
          <p className="text-xs text-slate-400 mb-4">
            Stories you read and examine will appear here.
          </p>
          <button
            onClick={() => navigate('home')}
            className="px-4 py-2 rounded-lg bg-[#7C5CFF] text-white font-semibold text-xs"
          >
            Browse Today's Stories
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            TODAY'S READING SESSION
          </div>
          {historyList.map((story) => (
            <div
              key={story.id}
              onClick={() => navigate('story', { storyId: story.id })}
              className="bg-[#10141D] border border-[#252B38] hover:border-slate-600 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-slate-400">
                  <span className="text-[#7C5CFF] uppercase font-bold">{story.category}</span>
                  <span>•</span>
                  <span>Read {formatRelativeTime(story.publishedAt)}</span>
                  <span>•</span>
                  <span>{story.readTimeMinutes} min read</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{story.headline}</h4>
              </div>

              <div className="p-2 rounded-lg bg-[#171C27] text-slate-400 hover:text-white shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PersonalizationView() {
  const { user } = useAppStore();
  const [techWeight, setTechWeight] = useState(88);
  const [finWeight, setFinWeight] = useState(76);
  const [localWeight, setLocalWeight] = useState(65);
  const [polWeight, setPolWeight] = useState(42);

  const handleSave = () => {
    showToast('Algorithmic weights updated successfully');
  };

  const handleReset = () => {
    setTechWeight(50);
    setFinWeight(50);
    setLocalWeight(50);
    setPolWeight(50);
    showToast('Feed weights reset to neutral baseline');
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="border-b border-[#252B38] pb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#7C5CFF]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Personalization & Algorithmic Controls
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Take active control over what the NexVarta synthesis engine prioritizes in your daily briefing.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#252B38] text-xs font-mono">
          <span className="text-slate-400">READER ARCHETYPE</span>
          <span className="text-emerald-400 font-bold">Tech & Macro Strategist</span>
        </div>
        <p className="text-xs text-slate-300 mt-3 leading-relaxed">
          Based on your reading patterns, NexVarta weighs AI systems, central bank policy announcements, and western suburban civic infrastructure significantly higher than general entertainment.
        </p>
      </div>

      {/* Fine-Tuning Sliders */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 space-y-5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-white">CATEGORY FEED WEIGHTS</span>
          <button onClick={handleReset} className="text-slate-400 hover:text-white flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            <span>Reset Weights</span>
          </button>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-200">Technology & AI Systems</span>
              <span className="text-[#7C5CFF] font-bold">{techWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={techWeight}
              onChange={(e) => setTechWeight(Number(e.target.value))}
              className="w-full accent-[#7C5CFF] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-200">Financial Markets & Central Banking</span>
              <span className="text-[#22D3EE] font-bold">{finWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={finWeight}
              onChange={(e) => setFinWeight(Number(e.target.value))}
              className="w-full accent-[#22D3EE] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-200">Hyperlocal Municipal Infrastructure</span>
              <span className="text-emerald-400 font-bold">{localWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={localWeight}
              onChange={(e) => setLocalWeight(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-200">General Political Updates</span>
              <span className="text-amber-400 font-bold">{polWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={polWeight}
              onChange={(e) => setPolWeight(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white font-semibold text-xs transition-colors font-mono"
        >
          Save Feed Preferences
        </button>
      </div>

      {/* Algorithmic Transparency Box */}
      <div className="bg-[#171C27] border border-[#252B38] rounded-xl p-4 text-xs font-mono text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
        <div>
          <div className="text-white font-bold mb-0.5">100% Algorithmic Privacy</div>
          <p className="leading-relaxed">
            Your reading weights are computed locally and are never sold to ad networks or third parties. We do not use telemetry to build ad profiles.
          </p>
        </div>
      </div>
    </div>
  );
}

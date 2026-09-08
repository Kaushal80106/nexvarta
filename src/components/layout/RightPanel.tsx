import { useState } from 'react';
import { 
  TrendingUp, 
  Sun, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Headphones, 
  ChevronRight,
  ShieldCheck 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockStories } from '../../data/mockStories';
import { mockDailyBriefs } from '../../data/mockDailyBrief';

const marketIndices = [
  { name: 'NIFTY 50', val: '24,842.60', change: '+0.64%', up: true },
  { name: 'S&P 500', val: '5,820.40', change: '+0.42%', up: true },
  { name: 'USD / INR', val: '84.12', change: '-0.08%', up: false },
  { name: '10Y G-Sec', val: '6.98%', change: '+0.03%', up: true },
];

export function RightPanel() {
  const { navigate, openStoryAssistant } = useAppStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const topTrending = mockStories.filter(s => s.isTrending).slice(0, 3);

  const toggleListen = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <aside className="hidden xl:flex flex-col w-80 shrink-0 p-4 space-y-5 border-l border-[#252B38] bg-[#080B12] sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      {/* Live Market & Yields Ticker */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#252B38] text-[10px] font-mono text-slate-400">
          <span>MACRO INTELLIGENCE</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          {marketIndices.map((idx) => (
            <div key={idx.name} className="bg-[#171C27] p-2 rounded border border-[#252B38]">
              <div className="text-[10px] text-slate-400 truncate">{idx.name}</div>
              <div className="font-bold text-white mt-0.5">{idx.val}</div>
              <div className={`text-[10px] flex items-center gap-0.5 mt-0.5 ${idx.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {idx.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{idx.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Brief Card Preview */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
            <Sun className="w-4 h-4" />
            <span>DAILY INTELLIGENCE BRIEF</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">TODAY</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          5 key stories synthesized for your personalized topics this morning.
        </p>

        <div className="space-y-1.5 mb-3">
          {mockDailyBriefs.slice(0, 3).map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => navigate('daily-brief')}
              className="text-[11px] text-slate-300 hover:text-white line-clamp-1 cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-slate-500 font-mono text-[10px]">{idx + 1}.</span>
              <span className="truncate">{item.headline}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-[#252B38]">
          <button
            onClick={() => navigate('daily-brief')}
            className="flex-1 py-1.5 rounded-lg bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-xs font-semibold text-white flex items-center justify-center gap-1 transition-colors"
          >
            <span>Read 5 Points</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleListen}
            className={`p-1.5 rounded-lg border transition-colors ${
              isPlayingAudio ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-[#171C27] border-[#252B38] text-slate-400 hover:text-white'
            }`}
            title="Listen to synthesized audio brief"
          >
            <Headphones className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trending Velocity Section */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>TRENDING VELOCITY</span>
          </span>
          <button 
            onClick={() => navigate('trending')}
            className="text-[10px] text-[#7C5CFF] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {topTrending.map((story) => (
            <div 
              key={story.id}
              onClick={() => navigate('story', { storyId: story.id })}
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-[#7C5CFF] uppercase">{story.category}</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                  {story.growthRate}
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-200 group-hover:text-[#7C5CFF] transition-colors line-clamp-2 leading-snug">
                {story.headline}
              </h5>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                {story.sourceCount} outlets clustered
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick AI Prompt Widget */}
      <div className="bg-gradient-to-br from-[#7C5CFF]/10 to-[#22D3EE]/10 border border-[#7C5CFF]/30 rounded-xl p-4 text-xs">
        <div className="flex items-center gap-2 font-mono font-bold text-white mb-2">
          <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
          <span>Ask NexVarta AI</span>
        </div>
        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
          Need a quick breakdown or cross-source comparison of current news?
        </p>
        <button
          onClick={() => navigate('assistant')}
          className="w-full py-2 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Open Assistant</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

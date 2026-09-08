import { useState } from 'react';
import { TrendingUp, Flame, MessageSquare, Newspaper, Zap, Globe } from 'lucide-react';
import { mockStories } from '../../data/mockStories';
import { TrendingStoryCard } from '../cards/TrendingStoryCard';
import { StandardStoryCard } from '../cards/StandardStoryCard';

export function TrendingView() {
  const [subTab, setSubTab] = useState<'now' | 'rising' | 'discussed' | 'covered'>('now');

  const trendingStories = mockStories.filter(s => s.isTrending);

  const getSortedStories = () => {
    if (subTab === 'rising') {
      return [...trendingStories].sort((a, b) => (b.growthRate || '').localeCompare(a.growthRate || ''));
    }
    if (subTab === 'covered') {
      return [...mockStories].sort((a, b) => b.sourceCount - a.sourceCount);
    }
    if (subTab === 'discussed') {
      return [...trendingStories].reverse();
    }
    return trendingStories;
  };

  const storiesToRender = getSortedStories();

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="border-b border-[#252B38] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Trending Velocity & Topic Trajectory
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Real-time cluster acceleration tracking wire frequency, quote re-broadcasts, and public discourse volume.
        </p>

        {/* Subtabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto text-xs font-mono">
          {[
            { id: 'now', label: 'Trending Now', icon: Flame },
            { id: 'rising', label: 'Rising Fast (240%+)', icon: Zap },
            { id: 'covered', label: 'Most Covered by Outlets', icon: Newspaper },
            { id: 'discussed', label: 'High Discourse Volume', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${
                  subTab === tab.id
                    ? 'bg-[#171C27] border-[#7C5CFF] text-white font-semibold'
                    : 'bg-[#10141D] border-[#252B38] text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Fastest Spreading Cluster</div>
          <div className="text-sm font-bold text-white mt-1 line-clamp-1">OpenAI Autonomous Reasoning</div>
          <div className="text-emerald-400 text-[11px] mt-0.5">↑ +380% velocity in past 2 hrs</div>
        </div>
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Highest Consensus Cluster</div>
          <div className="text-sm font-bold text-white mt-1 line-clamp-1">RBI Policy Repo Rate</div>
          <div className="text-[#22D3EE] text-[11px] mt-0.5">24 outlets with 100% data match</div>
        </div>
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Top Hyperlocal Pulse</div>
          <div className="text-sm font-bold text-white mt-1 line-clamp-1">Dahanu-Virar Rail Quadrupling</div>
          <div className="text-amber-400 text-[11px] mt-0.5">Palghar Transit Commuters</div>
        </div>
      </div>

      {/* Stories list */}
      <div className="space-y-4">
        {storiesToRender.map((story) => (
          <TrendingStoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}

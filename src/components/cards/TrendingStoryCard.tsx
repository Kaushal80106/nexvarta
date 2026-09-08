import { Bookmark, Share2, Flame, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Story } from '../../types';
import { formatRelativeTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export function TrendingStoryCard({ story, rank = 1 }: { story: Story; rank?: number; key?: string }) {
  const { navigate, user, toggleSaveStory, openShareModal } = useAppStore();
  const isSaved = user.savedStoryIds.includes(story.id);

  return (
    <div className="group bg-[#10141D] border border-[#252B38] hover:border-[#7C5CFF]/40 rounded-xl p-4 sm:p-5 transition-all flex items-start gap-4">
      {/* Rank indicator */}
      <div className="flex flex-col items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-[#171C27] border border-[#252B38] text-[#F8FAFC] font-mono font-extrabold text-lg sm:text-xl shrink-0">
        <span>#{rank}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7C5CFF]">
            {story.category}
          </span>
          <span className="text-slate-500">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            <Flame className="w-3 h-3" />
            {story.growthRate || `Trending Score: ${story.trendingScore || 88}`}
          </span>
          <span className="text-[11px] font-mono text-slate-400">{formatRelativeTime(story.publishedAt)}</span>
        </div>

        <h3
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-base font-bold text-[#F8FAFC] hover:text-[#7C5CFF] cursor-pointer transition-colors leading-snug mb-2 line-clamp-2"
        >
          {story.headline}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 mb-3">
          {story.aiSummary.short}
        </p>

        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#252B38]/50">
          <div className="flex items-center gap-2 text-slate-400">
            <span>{story.sourceCount} sources</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{story.impact.potentialLevel} Impact</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveStory(story.id)}
              className="p-1 rounded hover:bg-[#171C27] text-slate-400 hover:text-white transition-colors"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#7C5CFF] text-[#7C5CFF]' : ''}`} />
            </button>
            <button
              onClick={() => openShareModal(story)}
              className="p-1 rounded hover:bg-[#171C27] text-slate-400 hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('story', { storyId: story.id })}
              className="px-2.5 py-1 rounded bg-[#171C27] hover:bg-[#7C5CFF] hover:text-white text-slate-300 text-[11px] font-medium transition-colors flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

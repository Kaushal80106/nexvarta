import { Bookmark, Share2, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Story } from '../../types';
import { formatRelativeTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export function SavedStoryCard({ story }: { story: Story; key?: string }) {
  const { navigate, toggleSaveStory, openShareModal } = useAppStore();

  return (
    <div className="bg-[#10141D] border border-[#252B38] hover:border-[#7C5CFF]/40 rounded-xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C5CFF] bg-[#7C5CFF]/15 px-2 py-0.5 rounded border border-[#7C5CFF]/30">
            {story.category}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] font-mono text-slate-400">{formatRelativeTime(story.publishedAt)}</span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] font-mono text-slate-400">{story.readTimeMinutes} min read</span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-500/20">
            Impact: {story.impact.potentialLevel}
          </span>
        </div>

        <h3
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-sm sm:text-base font-bold text-white hover:text-[#7C5CFF] cursor-pointer transition-colors leading-snug mb-2"
        >
          {story.headline}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {story.aiSummary.short}
        </p>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          onClick={() => toggleSaveStory(story.id)}
          className="p-2 rounded-lg bg-[#171C27] border border-[#252B38] text-[#7C5CFF] hover:text-white transition-colors"
          title="Remove from saved"
        >
          <Bookmark className="w-4 h-4 fill-[#7C5CFF]" />
        </button>

        <button
          onClick={() => openShareModal(story)}
          className="p-2 rounded-lg bg-[#171C27] border border-[#252B38] text-slate-400 hover:text-white transition-colors"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('story', { storyId: story.id })}
          className="px-3 py-2 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>Read Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

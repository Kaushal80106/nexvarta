import { MapPin, ArrowRight, Bookmark, Share2, AlertCircle } from 'lucide-react';
import { Story } from '../../types';
import { formatRelativeTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export function LocalStoryCard({ story }: { story: Story; key?: string }) {
  const { navigate, user, toggleSaveStory, openShareModal } = useAppStore();
  const isSaved = user.savedStoryIds.includes(story.id);

  const locationLabel = [
    story.location?.city,
    story.location?.district,
    story.location?.state
  ].filter(Boolean).join(' • ');

  return (
    <div className="bg-[#10141D] border border-[#252B38] hover:border-[#22D3EE]/40 rounded-xl p-5 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded border border-[#22D3EE]/20">
            <MapPin className="w-3 h-3" />
            {locationLabel || 'Local Dispatch'}
          </span>
          <span className="text-[11px] font-mono text-slate-400">{formatRelativeTime(story.publishedAt)}</span>
        </div>

        <h3
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-base font-bold text-[#F8FAFC] hover:text-[#22D3EE] cursor-pointer transition-colors leading-snug mb-2.5"
        >
          {story.headline}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-3 mb-4">
          {story.aiSummary.short}
        </p>

        {story.impact.domains && story.impact.domains.length > 0 && (
          <div className="bg-[#171C27]/80 rounded-lg p-2.5 mb-4 border border-[#252B38]/60">
            <div className="text-[10px] font-mono text-slate-400 mb-1">LOCAL CIVIC IMPACT:</div>
            <div className="text-xs text-emerald-300 font-medium flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
              <span>{story.impact.domains[0].description}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#252B38]">
        <button
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-xs font-semibold text-[#22D3EE] hover:text-cyan-200 flex items-center gap-1 transition-colors"
        >
          <span>Read Local Intelligence</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleSaveStory(story.id)}
            className="p-1.5 rounded hover:bg-[#171C27] text-slate-400 hover:text-white transition-colors"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#7C5CFF] text-[#7C5CFF]' : ''}`} />
          </button>
          <button
            onClick={() => openShareModal(story)}
            className="p-1.5 rounded hover:bg-[#171C27] text-slate-400 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SavedStoryCard({ story, folderName }: { story: Story; folderName?: string }) {
  const { navigate, toggleSaveStory, openShareModal } = useAppStore();

  return (
    <div className="bg-[#10141D] border border-[#252B38] hover:border-[#7C5CFF]/30 rounded-xl p-5 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7C5CFF]">
            {story.category}
          </span>
          {folderName && (
            <span className="text-[10px] font-mono text-slate-400 bg-[#171C27] px-2 py-0.5 rounded border border-[#252B38]">
              Folder: {folderName}
            </span>
          )}
        </div>

        <h3
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-base font-bold text-[#F8FAFC] hover:text-[#7C5CFF] cursor-pointer transition-colors leading-snug mb-2"
        >
          {story.headline}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 mb-3">
          {story.aiSummary.short}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#252B38] text-xs font-mono">
        <button
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-[#7C5CFF] hover:underline"
        >
          Open Intelligence
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openShareModal(story)}
            className="p-1 rounded hover:bg-[#171C27] text-slate-400 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => toggleSaveStory(story.id)}
            className="px-2 py-1 rounded bg-[#171C27] hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 text-[11px] border border-[#252B38] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

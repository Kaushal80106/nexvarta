import { useState } from 'react';
import { Bookmark, Share2, MoreHorizontal, ArrowRight, ShieldCheck, Sparkles, Info, ExternalLink } from 'lucide-react';
import { Story } from '../../types';
import { formatRelativeTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

interface StandardStoryCardProps {
  key?: string;
  story: Story;
  layout?: 'grid' | 'list';
}

export function StandardStoryCard({ story, layout = 'grid' }: StandardStoryCardProps) {
  const { 
    navigate, 
    user, 
    toggleSaveStory, 
    openShareModal, 
    openWhySeeingModal, 
    openReportModal, 
    openStoryAssistant 
  } = useAppStore();
  const [showMenu, setShowMenu] = useState(false);

  const isSaved = user.savedStoryIds.includes(story.id);

  if (layout === 'list') {
    return (
      <div className="group bg-surface border border-border hover:border-border transition-all duration-150 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-5 card-shadow">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              {story.category}
            </span>
            <span className="text-text-muted">•</span>
            <span className="text-[12px] text-text-muted font-medium">{formatRelativeTime(story.publishedAt)}</span>
          </div>

          <h3 
            onClick={() => navigate('story', { storyId: story.id })}
            className="text-[18px] font-[600] text-text-primary hover:text-primary cursor-pointer transition-colors leading-[1.3] mb-2"
          >
            {story.headline}
          </h3>

          <p className="text-[15px] text-text-secondary line-clamp-2 leading-[1.65] mb-3">
            {story.aiSummary?.short || story.subheadline}
          </p>

          <div className="flex items-center gap-2 text-[12px] font-medium text-text-muted">
            <span>
              {story.sources.map(s => s.name).slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
          <button
            onClick={() => navigate('story', { storyId: story.id })}
            className="px-4 py-2 rounded-lg bg-surface-secondary hover:bg-primary hover:text-white text-text-primary text-[13px] font-medium border border-border transition-colors group-btn"
          >
            Read Story
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleSaveStory(story.id)}
              className={`p-2 rounded-lg transition-colors ${isSaved ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-text-primary hover:bg-surface-secondary'}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
            </button>
            <button
              onClick={() => openShareModal(story)}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-surface border border-border transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between h-full card-shadow hover:shadow-lg">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            {story.category}
          </span>
          <span className="text-text-muted">•</span>
          <span className="text-[12px] text-text-muted font-medium">{formatRelativeTime(story.publishedAt)}</span>
        </div>

        <h3 
          onClick={() => navigate('story', { storyId: story.id })}
          className="text-[18px] font-[600] text-text-primary hover:text-primary cursor-pointer transition-colors leading-[1.3] mb-3 line-clamp-3"
        >
          {story.headline}
        </h3>

        <div className="mb-4">
          <p className="text-[14px] text-text-secondary line-clamp-3 leading-[1.6]">
            {story.aiSummary?.short || story.subheadline}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between pt-3 border-t border-border relative">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('story', { storyId: story.id })}
              className="text-[13px] font-medium text-primary hover:text-primary-hover flex items-center gap-1 transition-colors group-btn"
            >
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={story.sources[0]?.originalUrl || 'javascript:void(0)'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-text-muted hover:text-cyan transition-colors"
              title="Read Original Article"
            >
              <span>Original</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleSaveStory(story.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isSaved ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-text-primary hover:bg-surface-secondary'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
            </button>
            <button
              onClick={() => openShareModal(story)}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {showMenu && (
                <div 
                  onMouseLeave={() => setShowMenu(false)}
                  className="absolute right-0 bottom-full mb-2 w-48 bg-surface border border-border rounded-xl card-shadow py-1 z-30 text-[13px]"
                >
                  <button
                    onClick={() => { setShowMenu(false); openWhySeeingModal(story); }}
                    className="w-full text-left px-3 py-2 hover:bg-surface-secondary flex items-center gap-2 text-text-primary"
                  >
                    <Info className="w-4 h-4 text-text-muted" />
                    <span>Why am I seeing this?</span>
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); openStoryAssistant(story); }}
                    className="w-full text-left px-3 py-2 hover:bg-surface-secondary flex items-center gap-2 text-text-primary"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Ask AI Assistant</span>
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); openReportModal(story); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#252B38] text-rose-400 border-t border-[#252B38]"
                  >
                    <span>Report Story</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

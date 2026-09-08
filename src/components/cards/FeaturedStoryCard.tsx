import { useState } from 'react';
import { Bookmark, Share2, MoreHorizontal, ArrowRight, ShieldCheck, Sparkles, Info, ExternalLink } from 'lucide-react';
import { Story } from '../../types';
import { formatRelativeTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

interface FeaturedStoryCardProps {
  story: Story;
}

export function FeaturedStoryCard({ story }: FeaturedStoryCardProps) {
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

  return (
    <div className="group relative bg-surface border border-border hover:border-border transition-all duration-200 rounded-2xl p-6 sm:p-8 card-shadow overflow-hidden">
      {/* Header bar: Category and Timestamp */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            {story.category}
          </span>
          <span className="text-xs text-text-muted">
            • {formatRelativeTime(story.publishedAt)}
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <h2 
        onClick={() => navigate('story', { storyId: story.id })}
        className="text-2xl sm:text-[32px] font-[650] tracking-[-0.03em] text-text-primary hover:text-primary cursor-pointer transition-colors leading-[1.15] mb-3"
      >
        {story.headline}
      </h2>

      {story.subheadline && (
        <p className="text-[15px] text-text-secondary leading-[1.65] mb-6 line-clamp-2 max-w-3xl">
          {story.subheadline}
        </p>
      )}

      {/* AI Summary Block */}
      <div className="ai-summary-block border rounded-xl p-5 mb-6 relative">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            AI Intelligence
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted ml-auto">
            AI Generated
          </span>
        </div>
        <p className="text-[15px] leading-[1.65] font-normal">
          {story.aiSummary?.short || story.subheadline}
        </p>
      </div>
      
      {/* Intelligence metadata row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-text-muted">Impact</span>
          <span className={`text-[11px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded ${
              story.impact.potentialLevel === 'CRITICAL' || story.impact.potentialLevel === 'HIGH'
                ? 'bg-negative/10 text-negative border border-negative/20'
                : 'bg-warning/10 text-warning border border-warning/20'
            }`}>
            {story.impact.potentialLevel}
          </span>
          <span className="text-[12px] font-medium text-positive">↗ {story.impact.direction.replace('POSITIVE', 'Positive').replace('NEGATIVE', 'Negative')}</span>
        </div>
        <div className="w-px h-3 bg-border hidden sm:block"></div>
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-cyan">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{story.impact.confidence}% Confidence</span>
        </div>
        <div className="w-px h-3 bg-border hidden sm:block"></div>
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-text-muted">
          <span>{story.sourceCount} Sources Verified</span>
        </div>
      </div>

      {/* Actions footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('story', { storyId: story.id })}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-text-primary hover:text-primary transition-colors group"
          >
            <span>Read Intelligence</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <a
            href={story.sources[0]?.originalUrl || 'javascript:void(0)'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-muted hover:text-cyan transition-colors"
            title="Read Original Article"
          >
            <span>Read Original</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleSaveStory(story.id)}
            aria-label={isSaved ? 'Remove from saved' : 'Save story'}
            className={`p-2 rounded-lg transition-colors ${
              isSaved 
                ? 'text-primary bg-primary/10' 
                : 'text-text-muted hover:text-text-primary hover:bg-surface-secondary'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
          </button>

          <button
            onClick={() => openShareModal(story)}
            aria-label="Share story"
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              aria-label="More actions"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMenu && (
              <div 
                onMouseLeave={() => setShowMenu(false)}
                className="absolute right-0 bottom-full mb-2 w-52 bg-surface border border-border rounded-xl card-shadow py-1 z-30 text-[13px] text-text-primary"
              >
                <button
                  onClick={() => { setShowMenu(false); openWhySeeingModal(story); }}
                  className="w-full text-left px-3 py-2 hover:bg-surface-secondary flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-text-muted" />
                  <span>Why am I seeing this?</span>
                </button>
                <button
                  onClick={() => { setShowMenu(false); openStoryAssistant(story); }}
                  className="w-full text-left px-3 py-2 hover:bg-surface-secondary flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Ask NexVarta AI</span>
                </button>
                <button
                  onClick={() => { setShowMenu(false); openReportModal(story); }}
                  className="w-full text-left px-3 py-2 hover:bg-surface-secondary text-negative flex items-center gap-2 border-t border-border mt-1"
                >
                  <span>Report Story / Issue</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
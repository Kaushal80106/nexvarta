import { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Check, 
  Plus, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Info,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { Story } from '../../types';
import { formatRelativeTime } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';
import { ImpactIntelligence } from './ImpactIntelligence';
import { SourceComparison } from './SourceComparison';
import { VerificationSection } from './VerificationSection';
import { TimelineView } from './TimelineView';
import { FloatingAIAssistant } from './FloatingAIAssistant';
import { TrustBadge } from '../intelligence/TrustBadge';
import { mockStories } from '../../data/mockStories';

interface StoryDetailViewProps {
  story: Story;
}

export function StoryDetailView({ story }: StoryDetailViewProps) {
  const { 
    navigate, 
    user, 
    toggleSaveStory, 
    toggleFollowEntity, 
    openShareModal, 
    openWhySeeingModal, 
    openStoryAssistant 
  } = useAppStore();

  const isSaved = user.savedStoryIds.includes(story.id);
  const primaryEntity = story.relatedEntities?.[0];
  const isFollowingEntity = primaryEntity ? user.followedTopics.includes(primaryEntity.name) : false;

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-6">
      {/* Top navigation / breadcrumbs */}
      <div className="flex items-center justify-between py-4 border-b border-border mb-6">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openWhySeeingModal(story)}
            className="text-[12px] font-medium text-cyan hover:underline flex items-center gap-1 bg-surface-secondary px-3 py-1.5 rounded-lg border border-border"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Why am I seeing this?</span>
          </button>
        </div>
      </div>

      {/* Story Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
            {story.category}
          </span>
          <span className="text-text-muted">•</span>
          <span className="text-[12px] font-medium text-text-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatRelativeTime(story.publishedAt)}
          </span>
          <span className="text-text-muted">•</span>
          <span className="text-[12px] font-medium text-text-muted">
            {story.readTimeMinutes} min synthesis
          </span>
          {story.location && (
            <>
              <span className="text-text-muted">•</span>
              <span className="text-[12px] font-medium text-cyan flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {story.location.city || story.location.country}
              </span>
            </>
          )}
        </div>

        <h1 className="text-[32px] sm:text-[40px] font-[650] text-text-primary tracking-[-0.03em] leading-[1.1] mb-4">
          {story.headline}
        </h1>

        {story.subheadline && (
          <h2 className="text-[18px] text-text-secondary leading-[1.5] mb-6 max-w-3xl font-medium">
            {story.subheadline}
          </h2>
        )}

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
        {/* Follow button — uses primaryEntity if available, otherwise follows the category */}
        <div className="flex items-center gap-3">
          {primaryEntity ? (
            <>
              <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border flex items-center justify-center font-bold text-text-primary text-[15px]">
                {primaryEntity.name.charAt(0)}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-text-primary">{primaryEntity.name}</div>
                <div className="text-[12px] text-text-muted">{primaryEntity.type}</div>
              </div>
              <button
                onClick={() => toggleFollowEntity(primaryEntity.name)}
                className={`ml-2 px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition-colors ${
                  isFollowingEntity
                    ? 'bg-surface-secondary text-text-primary border border-border'
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {isFollowingEntity ? (
                  <><Check className="w-3.5 h-3.5" /><span>Following</span></>
                ) : (
                  <><Plus className="w-3.5 h-3.5" /><span>Follow</span></>
                )}
              </button>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border flex items-center justify-center font-bold text-text-primary text-[14px]">
                {story.category.charAt(0)}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-text-primary">{story.category}</div>
                <div className="text-[12px] text-text-muted">Topic</div>
              </div>
              <button
                onClick={() => toggleFollowEntity(story.category)}
                className={`ml-2 px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition-colors ${
                  user.followedTopics.includes(story.category)
                    ? 'bg-surface-secondary text-text-primary border border-border'
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {user.followedTopics.includes(story.category) ? (
                  <><Check className="w-3.5 h-3.5" /><span>Following</span></>
                ) : (
                  <><Plus className="w-3.5 h-3.5" /><span>Follow</span></>
                )}
              </button>
            </>
          )}
        </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveStory(story.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                isSaved ? 'text-primary bg-primary/10 border-primary/20' : 'text-text-muted hover:text-text-primary bg-surface hover:bg-surface-secondary border-border'
              } border`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => openShareModal(story)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-text-muted hover:text-text-primary bg-surface hover:bg-surface-secondary border border-border transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            
            <button
              onClick={() => openStoryAssistant(story)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* Left Column: AI Summary & Text */}
        <div className="lg:col-span-8 space-y-8">
          {/* AI Comprehensive Summary */}
          {story.aiSummary && (
            <div className="ai-summary-block border rounded-2xl p-6 card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  AI Synthesized Summary
                </h3>
              </div>
              <div className="space-y-4 text-[16px] leading-[1.65]">
                {story.aiSummary.comprehensive ? (
                  story.aiSummary.comprehensive.map((para: any, idx: any) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>{story.aiSummary.detailed || story.aiSummary.short}</p>
                )}
                {story.aiSummary.keyFacts && (
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    {story.aiSummary.keyFacts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          
          {/* Timeline View */}
          {story.timeline && story.timeline.length > 0 && (
            <TimelineView timeline={story.timeline} />
          )}

          {/* Verification Section */}
          {story.verification && (
            <VerificationSection verification={story.verification} />
          )}
        </div>

        {/* Right Column: Intelligence Panels */}
        <div className="lg:col-span-4 space-y-6">
          {story.impact && (
            <ImpactIntelligence impact={story.impact} />
          )}
          
          {/* Original Sources Panel */}
          <div className="bg-surface border border-border rounded-2xl p-5 card-shadow">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <Layers className="w-4 h-4 text-cyan" />
              <h3 className="text-[14px] font-semibold text-text-primary">Source Material</h3>
            </div>
            
            <div className="space-y-3">
              {(story.sources || []).map((source, idx) => (
                <div key={idx} className="group">
                  <a 
                    href={source.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[14px] font-medium text-text-primary hover:text-primary leading-snug mb-1"
                  >
                    {source.headline || story.headline}
                  </a>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-text-muted">{source.name}</span>
                    <div className="flex items-center gap-1 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Read Original</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border border-border rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors">
              Compare Full Sources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
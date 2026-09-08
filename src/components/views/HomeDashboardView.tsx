import { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Sparkles, 
  SlidersHorizontal, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockStories } from '../../data/mockStories';
import { FeaturedStoryCard } from '../cards/FeaturedStoryCard';
import { StandardStoryCard } from '../cards/StandardStoryCard';
import { TrendingStoryCard } from '../cards/TrendingStoryCard';
import { LocalStoryCard } from '../cards/LocalStoryCard';
import { StoryCardSkeleton } from '../cards/StoryCardSkeleton';
import { Category } from '../../types';
import { useUser } from '@clerk/clerk-react';

const categories: (Category | 'All')[] = [
  'All',
  'Technology',
  'Finance',
  'Business',
  'Politics',
  'Science',
  'Sports',
  'World',
  'India',
  'Local'
];

export function HomeDashboardView() {
  const { 
    user, 
    feedTab, 
    setFeedTab, 
    viewMode, 
    setViewMode, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    navigate,
    feed,
    loadMoreFeed
  } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);

  // Filter stories client-side — feed now loads 50 on startup so all categories are present
  const filteredStories = (feed && feed.length > 0 ? feed : mockStories).filter((story) => {
    if (selectedCategory !== 'All' && story.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        story.headline.toLowerCase().includes(q) ||
        story.aiSummary.short.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (feedTab === 'trending') return story.isTrending;
    if (feedTab === 'local') {
      return (
        story.category === 'Local' ||
        story.category === 'India' ||
        (story.location && story.location.country === 'India')
      );
    }
    if (feedTab === 'following') {
      return story.relatedEntities.some(ent => user.followedTopics.includes(ent.name));
    }
    return true;
  });

  const featuredStory = filteredStories.find(s => s.id === 'story-1') || filteredStories[0];
  const remainingStories = filteredStories.filter(s => s.id !== featuredStory?.id);

  const getTabLabel = (id: string) => {
    const map: Record<string, string> = {
      'for-you': 'For You',
      'top': 'Top Stories',
      'trending': 'Trending',
      'following': 'Following',
      'local': 'Local',
      'latest': 'Latest'
    };
    return map[id] || id;
  };

  const { isSignedIn, user: clerkUser } = useUser();
  const displayName = isSignedIn ? clerkUser?.firstName || 'there' : 'Explorer';

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Command Center Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[32px] font-[650] text-text-primary tracking-[-0.03em] leading-tight">
            Good evening, {displayName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[15px] text-text-secondary flex items-center gap-1.5">
              <span>Your daily</span>
              <span className="relative overflow-hidden inline-flex items-center justify-center w-[160px] h-[24px]">
                <span className="absolute inset-0 flex flex-col animate-[wordSlide_6s_ease-in-out_infinite] font-semibold text-primary">
                  <span className="h-[24px] flex items-center">news that matters.</span>
                  <span className="h-[24px] flex items-center">truth and clarity.</span>
                  <span className="h-[24px] flex items-center">intelligence feed.</span>
                </span>
              </span>
            </p>
            <span className="text-[13px] text-text-muted hidden sm:inline-flex items-center gap-1 ml-2">
              • Updated 2 min ago
            </span>
          </div>
        </div>

        {/* Tab triggers - Editorial style */}
        <div className="flex items-center gap-4 overflow-x-auto text-[14px] font-medium border-b border-transparent">
          {['for-you', 'top', 'trending', 'following'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFeedTab(tab as any)}
              className={`pb-2 whitespace-nowrap transition-colors editorial-tab ${
                feedTab === tab
                  ? 'text-primary editorial-tab-active'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full border text-[13px] font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary border-primary text-white card-shadow'
                  : 'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Story Content Area */}
      {isLoading ? (
        <StoryCardSkeleton count={4} />
      ) : filteredStories.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center max-w-lg mx-auto card-shadow">
          <Compass className="w-8 h-8 text-text-muted mx-auto mb-3" />
          <h3 className="text-[16px] font-[600] text-text-primary mb-1">No stories match your filter</h3>
          <p className="text-[14px] text-text-secondary mb-5">
            Try switching to 'All' categories or searching for a different term.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setFeedTab('top'); }}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-[13px] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Top Story */}
          {featuredStory && feedTab !== 'trending' && (
            <div>
              <FeaturedStoryCard story={featuredStory} />
            </div>
          )}

          {/* Rest of Stories */}
          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="text-[18px] font-[650] text-text-primary">
                {getTabLabel(feedTab)}
              </span>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(featuredStory && feedTab !== 'trending' ? remainingStories : filteredStories).map((story) => (
                  <StandardStoryCard key={story.id} story={story} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStories.map((story) => (
                  <StandardStoryCard key={story.id} story={story} layout="list" />
                ))}
              </div>
            )}

            {/* Load More Past News */}
            <div className="flex justify-center pt-4">
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await loadMoreFeed();
                  setIsLoading(false);
                }}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-pulse">Loading past stories...</span>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 rotate-90" />
                    Load More Past News
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

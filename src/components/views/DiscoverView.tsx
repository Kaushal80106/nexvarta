import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Globe, 
  MapPin, 
  Building2, 
  X, 
  LayoutGrid, 
  List,
  SlidersHorizontal
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockStories } from '../../data/mockStories';
import { StandardStoryCard } from '../cards/StandardStoryCard';
import { StoryCardSkeleton } from '../cards/StoryCardSkeleton';
import { Category } from '../../types';

export function DiscoverView() {
  const { searchQuery, setSearchQuery, viewMode, setViewMode, feed } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTime, setSelectedTime] = useState<string>('Any');
  const [selectedImpact, setSelectedImpact] = useState<string>('Any');
  const [showSimulatedLoading, setShowSimulatedLoading] = useState(false);

  const categories = ['All', 'Technology', 'Finance', 'Business', 'Politics', 'Science', 'Sports', 'Local'];
  const times = ['Any', 'Past 24 Hours', 'Past 7 Days', 'Past 30 Days'];
  const impacts = ['Any', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  const filtered = (feed && feed.length > 0 ? feed : mockStories).filter((s) => {
    if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
    if (selectedImpact !== 'Any' && s.impact.potentialLevel !== selectedImpact) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = s.headline.toLowerCase().includes(q) ||
        s.aiSummary.short.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.sources.some(src => src.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleSimulateLoad = () => {
    setShowSimulatedLoading(true);
    setTimeout(() => setShowSimulatedLoading(false), 900);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Search Bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1">
          Discover & Intelligence Search
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          Query clustered stories, empirical claims, policy gazettes, and verified source consensus.
        </p>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, entity, headline keywords, or policy..."
            className="w-full bg-[#10141D] border border-[#252B38] focus:border-[#7C5CFF] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Deep Filter Bar */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#252B38] text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-[#7C5CFF]" />
            <span className="font-bold">MULTI-DIMENSIONAL FILTERS</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateLoad}
              className="text-[11px] text-[#22D3EE] hover:underline"
            >
              Simulate Index Refresh
            </button>
            <div className="flex items-center bg-[#171C27] border border-[#252B38] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#252B38] text-white' : 'text-slate-400'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-[#252B38] text-white' : 'text-slate-400'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#171C27] border border-[#252B38] rounded-lg p-2 text-slate-200 outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Time Horizon / Date</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-[#171C27] border border-[#252B38] rounded-lg p-2 text-slate-200 outline-none"
            >
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Potential Impact Severity</label>
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="w-full bg-[#171C27] border border-[#252B38] rounded-lg p-2 text-slate-200 outline-none"
            >
              {impacts.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span>SHOWING {filtered.length} INTELLIGENCE DOSSIERS</span>
        {(selectedCategory !== 'All' || selectedImpact !== 'Any' || searchQuery) && (
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedImpact('Any'); setSearchQuery(''); }}
            className="text-rose-400 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Display */}
      {showSimulatedLoading ? (
        <StoryCardSkeleton count={3} />
      ) : filtered.length === 0 ? (
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-12 text-center max-w-md mx-auto">
          <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No stories found</h3>
          <p className="text-xs text-slate-400 mb-4">
            No clusters match your exact combination of search terms and impact criteria.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedImpact('Any'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-lg bg-[#7C5CFF] text-white font-semibold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((story) => (
            <StandardStoryCard key={story.id} story={story} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((story) => (
            <StandardStoryCard key={story.id} story={story} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}

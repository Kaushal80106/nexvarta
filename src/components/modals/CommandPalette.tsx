import { useState, useEffect } from 'react';
import { Search, Sparkles, TrendingUp, Bookmark, Newspaper, Settings, Compass, MapPin, X, Sun, Moon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockStories } from '../../data/mockStories';
import { mockEntities } from '../../data/mockEntities';

export function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, navigate, theme, toggleTheme } = useAppStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredStories = mockStories.filter(s => 
    s.headline.toLowerCase().includes(query.toLowerCase()) || 
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredEntities = mockEntities.filter(e => 
    e.name.toLowerCase().includes(query.toLowerCase()) || 
    e.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectStory = (id: string) => {
    setCommandPaletteOpen(false);
    navigate('story', { storyId: id });
  };

  const handleSelectEntity = (slug: string) => {
    setCommandPaletteOpen(false);
    navigate('entity', { entitySlug: slug });
  };

  const handleAction = (route: any) => {
    setCommandPaletteOpen(false);
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="w-full max-w-2xl bg-[#10141D] border border-[#252B38] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        {/* Search input bar */}
        <div className="p-3.5 border-b border-[#252B38] flex items-center gap-3 bg-[#171C27]">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, topics, people, companies, or jump to..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results / Navigation shortcuts */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 text-xs font-mono">
          {/* Quick Actions */}
          {!query && (
            <div>
              <div className="px-3 py-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Jump To
              </div>
              <div className="grid grid-cols-2 gap-1 font-sans">
                <button
                  onClick={() => handleAction('home')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300"
                >
                  <Newspaper className="w-4 h-4 text-[#7C5CFF]" />
                  <span>Personalized Feed</span>
                </button>
                <button
                  onClick={() => handleAction('discover')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300"
                >
                  <Compass className="w-4 h-4 text-[#22D3EE]" />
                  <span>Discover & Deep Filters</span>
                </button>
                <button
                  onClick={() => handleAction('trending')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300"
                >
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Trending Velocity</span>
                </button>
                <button
                  onClick={() => handleAction('assistant')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300"
                >
                  <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
                  <span>AI News Assistant</span>
                </button>
                <button
                  onClick={() => handleAction('local')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Hyperlocal News</span>
                </button>
                <button
                  onClick={() => handleAction('saved')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300"
                >
                  <Bookmark className="w-4 h-4 text-slate-400" />
                  <span>Saved Library</span>
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    setCommandPaletteOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center gap-2 text-slate-300 col-span-2 border border-[#252B38]"
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 text-[#7C5CFF]" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Toggle Day / Night Mode (Currently {theme === 'light' ? 'Day' : 'Night'})</span>
                </button>
              </div>
            </div>
          )}

          {/* Theme Search Match */}
          {query && ('day mode night mode theme dark light toggle'.includes(query.toLowerCase()) || query.toLowerCase().includes('mode')) && (
            <div>
              <div className="px-3 py-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Theme & Appearance
              </div>
              <div className="space-y-1 font-sans">
                <button
                  onClick={() => {
                    toggleTheme();
                    setCommandPaletteOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center justify-between text-slate-200"
                >
                  <div className="flex items-center gap-2.5">
                    {theme === 'light' ? <Moon className="w-4 h-4 text-[#7C5CFF]" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    <span>Switch to {theme === 'light' ? 'Night Mode (Obsidian Dark)' : 'Day Mode (Editorial Light)'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Action</span>
                </button>
              </div>
            </div>
          )}

          {/* Stories matches */}
          {filteredStories.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Stories ({filteredStories.length})
              </div>
              <div className="space-y-1 font-sans">
                {filteredStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => handleSelectStory(story.id)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-start gap-2.5 transition-colors"
                  >
                    <span className="text-[10px] font-mono font-bold uppercase text-[#7C5CFF] bg-[#7C5CFF]/15 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                      {story.category}
                    </span>
                    <span className="text-xs text-slate-200 line-clamp-1 flex-1 font-medium">
                      {story.headline}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {story.sourceCount} sources
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Entities matches */}
          {filteredEntities.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Entities & Topics ({filteredEntities.length})
              </div>
              <div className="space-y-1 font-sans">
                {filteredEntities.map((ent) => (
                  <button
                    key={ent.id}
                    onClick={() => handleSelectEntity(ent.slug)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#171C27] flex items-center justify-between text-slate-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{ent.name}</span>
                      <span className="text-[10px] font-mono text-[#22D3EE] bg-[#22D3EE]/10 px-1.5 rounded">
                        {ent.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {ent.followersCount.toLocaleString()} followers
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && filteredStories.length === 0 && filteredEntities.length === 0 && (
            <div className="p-8 text-center text-slate-400 font-sans">
              <p className="text-sm">No stories or entities matched "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "OpenAI", "RBI", "Virar", or "Tech"</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-2.5 bg-[#080B12] border-t border-[#252B38] text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Navigation shortcuts: [ESC] to close</span>
          <span>Tip: Press '?' anytime for full shortcut cheatsheet</span>
        </div>
      </div>
    </div>
  );
}

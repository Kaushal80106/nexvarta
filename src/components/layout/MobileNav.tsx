import { Home, Compass, TrendingUp, Bookmark, User, Sparkles, X, Sun, Moon } from 'lucide-react';
import { ViewRoute } from '../../types';
import { useAppStore } from '../../store/useAppStore';

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentRoute, navigate, user, setSelectedCategory, theme, toggleTheme } = useAppStore();

  const handleNav = (route: ViewRoute) => {
    navigate(route);
    onClose();
  };

  return (
    <>
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          
          <div className="relative w-4/5 max-w-xs bg-[#080B12] border-r border-[#252B38] h-full flex flex-col p-4 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#252B38] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#7C5CFF] flex items-center justify-center text-white font-mono font-bold text-sm">
                  N
                </div>
                <div>
                  <div className="font-mono font-bold text-sm text-white">NEXVARTA</div>
                  <div className="text-[10px] text-slate-400 font-mono">News That Matters</div>
                </div>
              </div>
              <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <button onClick={() => handleNav('home')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Home Feed
              </button>
              <button onClick={() => handleNav('discover')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Discover & Search
              </button>
              <button onClick={() => handleNav('trending')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Trending Now
              </button>
              <button onClick={() => handleNav('following')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Following Topics
              </button>
              <button onClick={() => handleNav('local')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Hyperlocal News
              </button>
              <button onClick={() => handleNav('daily-brief')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Daily Briefing
              </button>
              <button onClick={() => handleNav('saved')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Saved Library
              </button>
              <button onClick={() => handleNav('history')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Reading History
              </button>
              <button onClick={() => handleNav('personalization')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Personalization
              </button>
              <button onClick={() => handleNav('admin')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Admin Suite
              </button>
              <button onClick={() => handleNav('pricing')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Pricing & Pro
              </button>
              <button onClick={() => handleNav('settings')} className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#171C27]">
                Settings
              </button>

              <div className="pt-2 mt-2 border-t border-[#252B38]">
                <button 
                  onClick={() => {
                    toggleTheme();
                  }} 
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 bg-[#171C27] border border-[#252B38]"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'light' ? <Moon className="w-4 h-4 text-[#7C5CFF]" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    <span>{theme === 'light' ? 'Night Mode' : 'Day Mode'}</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10141D] text-slate-400">
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#080B12]/95 backdrop-blur-lg border-t border-[#252B38] px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => navigate('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-mono ${
            currentRoute === 'home' ? 'text-[#7C5CFF]' : 'text-slate-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate('discover')}
          className={`flex flex-col items-center gap-1 text-[10px] font-mono ${
            currentRoute === 'discover' ? 'text-[#7C5CFF]' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Discover</span>
        </button>

        <button
          onClick={() => navigate('assistant')}
          className="relative -top-3 w-11 h-11 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] text-white flex items-center justify-center shadow-lg border border-white/20"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={() => navigate('trending')}
          className={`flex flex-col items-center gap-1 text-[10px] font-mono ${
            currentRoute === 'trending' ? 'text-[#7C5CFF]' : 'text-slate-400'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trends</span>
        </button>

        <button
          onClick={() => navigate('saved')}
          className={`flex flex-col items-center gap-1 text-[10px] font-mono ${
            currentRoute === 'saved' ? 'text-[#7C5CFF]' : 'text-slate-400'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
      </div>
    </>
  );
}

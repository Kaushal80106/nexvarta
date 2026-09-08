import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Globe, 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  Sliders, 
  Check, 
  ExternalLink,
  Sun,
  Moon 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const languages = [
  'English',
  'Hindi',
  'Marathi',
  'Gujarati',
  'Tamil',
  'Telugu',
  'Bengali',
  'Kannada',
  'Malayalam',
  'Punjabi'
];

export function Header({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  const { 
    setCommandPaletteOpen, 
    selectedLocation, 
    selectedLanguage, 
    setSelectedLanguage, 
    navigate, 
    notifications,
    user,
    currentRoute,
    theme,
    toggleTheme
  } = useAppStore();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border px-4 sm:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & brand for small screens */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleMobileMenu}
            aria-label="Open navigation menu"
            className="p-1.5 rounded-lg bg-surface border border-border text-text-muted hover:text-text-primary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-mono font-bold text-xs">
              N
            </div>
            <span className="font-[650] text-[15px] tracking-tight text-text-primary">NEXVARTA</span>
          </div>
        </div>

        {/* Global Search Bar (Trigger for Cmd+K) - Primary Element */}
        <div 
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex flex-1 max-w-lg items-center justify-between bg-surface border border-border hover:border-primary/50 hover:bg-surface-secondary rounded-xl px-4 py-2 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3 text-[14px] text-text-muted">
            <Search className="w-4 h-4 text-text-muted" />
            <span>Search stories, people, companies, events...</span>
          </div>
          <kbd className="text-[11px] font-mono font-medium text-text-muted bg-background border border-border px-2 py-0.5 rounded shadow-sm">
            {navigator?.userAgent?.includes('Mac') ? '⌘ K' : 'Ctrl K'}
          </kbd>
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="sm:hidden p-2 rounded-lg bg-surface border border-border text-text-muted"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Right action controls */}
        <div className="flex items-center gap-2">
          {/* Location Selector Pill */}
          <button
            onClick={() => navigate('local')}
            className="flex items-center gap-1.5 text-[12px] font-medium text-text-muted hover:text-text-primary bg-surface hover:bg-surface-secondary border border-border px-3 py-1.5 rounded-lg transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan" />
            <span className="hidden md:inline">{selectedLocation.city}, {selectedLocation.district}</span>
            <span className="md:hidden">{selectedLocation.city}</span>
          </button>

          {/* Global Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-[12px] font-medium text-text-muted hover:text-text-primary bg-surface hover:bg-surface-secondary border border-border px-3 py-1.5 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-text-muted" />
              <span className="hidden sm:inline">{selectedLanguage}</span>
            </button>

            {showLangMenu && (
              <div 
                className="absolute right-0 top-full mt-2 w-40 bg-surface border border-border rounded-xl shadow-xl py-1 z-30"
                onMouseLeave={() => setShowLangMenu(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang as any);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-surface-secondary flex items-center justify-between ${
                      selectedLanguage === lang ? 'text-primary font-medium bg-primary/5' : 'text-text-secondary'
                    }`}
                  >
                    {lang}
                    {selectedLanguage === lang && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-surface hover:bg-surface-secondary border border-border text-text-muted hover:text-text-primary transition-colors flex items-center gap-2 group"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 text-primary group-hover:-rotate-12 transition-transform" />
                <span className="text-[11px] font-medium hidden xl:inline">Night Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-warning group-hover:rotate-45 transition-transform" />
                <span className="text-[11px] font-medium hidden xl:inline">Day Mode</span>
              </>
            )}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => navigate('notifications')}
            className="p-2 rounded-lg bg-surface hover:bg-surface-secondary border border-border text-text-muted hover:text-text-primary relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[9px] font-bold text-white flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          <div className="ml-1 flex items-center justify-center">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-lg border border-border"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-[12px] font-medium bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

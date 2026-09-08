import { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { mockStories } from './data/mockStories';

// Layout
import { Sidebar } from './components/layout/Sidebar';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { RightPanel } from './components/layout/RightPanel';

// Modals
import { CommandPalette } from './components/modals/CommandPalette';
import { WhySeeingThisModal, ReportStoryModal } from './components/modals/WhySeeingThisModal';
import { ShareModal, KeyboardShortcutsModal } from './components/modals/ShareModal';
import { FloatingAIAssistant } from './components/story/FloatingAIAssistant';

// Views
import { LandingView } from './components/views/LandingView';
import { HomeDashboardView } from './components/views/HomeDashboardView';
import { DiscoverView } from './components/views/DiscoverView';
import { TrendingView } from './components/views/TrendingView';
import { FollowingView, EntityDetailView } from './components/views/FollowingView';
import { LocalNewsView, DailyBriefView } from './components/views/LocalNewsView';
import { AssistantView, SavedView } from './components/views/AssistantView';
import { HistoryView, PersonalizationView } from './components/views/HistoryView';
import { NotificationsView, SettingsView } from './components/views/NotificationsView';
import { PricingView, HelpCenterView } from './components/views/PricingView';
import { AdminView } from './components/views/AdminView';
import { AuthView, NotFoundView } from './components/views/AuthView';
import { OnboardingView } from './components/views/OnboardingView';
import { StoryDetailView } from './components/story/StoryDetailView';

export function App() {
  const { 
    theme, 
    currentRoute, 
    currentStoryId, 
    currentEntitySlug,
    isCommandPaletteOpen, 
    isWhySeeingModalOpen,
    isReportModalOpen,
    isShareModalOpen,
    isKeyboardShortcutsOpen,
    toastMessage,
    feed,
    fetchLiveFeed,
    navigate, 
    setKeyboardShortcutsOpen, 
    toggleTheme 
  } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchLiveFeed();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '?') {
        e.preventDefault();
        setKeyboardShortcutsOpen(true);
      } else if (e.key === 'g' || e.key === 'G') {
        navigate('home');
      } else if (e.key === 't' || e.key === 'T') {
        navigate('trending');
      } else if (e.key === 's' || e.key === 'S') {
        navigate('saved');
      } else if (e.key === 'a' || e.key === 'A') {
        navigate('assistant');
      } else if (e.key === 'l' || e.key === 'L') {
        navigate('local');
      } else if (e.key === 'd' || e.key === 'D') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (currentRoute === 'landing') {
    return (
      <div className="bg-background min-h-screen text-text-primary">
        <LandingView />
        <CommandPalette />
        <KeyboardShortcutsModal />
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-secondary border border-border text-text-primary text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-2xl">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  if (currentRoute === 'onboarding') {
    return (
      <div className="bg-background min-h-screen text-text-primary flex flex-col">
        <OnboardingView />
        <CommandPalette />
        <KeyboardShortcutsModal />
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-secondary border border-border text-text-primary text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-2xl">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  if (currentRoute === 'auth') {
    return (
      <div className="bg-background min-h-screen text-text-primary flex flex-col">
        <AuthView />
        <CommandPalette />
        <KeyboardShortcutsModal />
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-secondary border border-border text-text-primary text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-2xl">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeDashboardView />;
      case 'discover':
        return <DiscoverView />;
      case 'trending':
        return <TrendingView />;
      case 'following':
        return <FollowingView />;
      case 'entity':
        return <EntityDetailView />;
      case 'local':
        return <LocalNewsView />;
      case 'daily-brief':
        return <DailyBriefView />;
      case 'assistant':
        return <AssistantView />;
      case 'saved':
        return <SavedView />;
      case 'history':
        return <HistoryView />;
      case 'personalization':
        return <PersonalizationView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      case 'pricing':
        return <PricingView />;
      case 'help':
        return <HelpCenterView />;
      case 'admin':
        return <AdminView />;
      case 'story': {
        const sid = currentStoryId || 'story-1';
        const found = (feed || []).find((s: any) => s.id === sid) || mockStories.find((s) => s.id === sid) || mockStories[0];
        if (!found) return <NotFoundView />;
        return <StoryDetailView story={found} />;
      }
      default:
        return <NotFoundView />;
    }
  };

  return (
    <div className="bg-background text-text-primary min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-text-primary transition-colors duration-200">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <CommandPalette />
      <WhySeeingThisModal />
      <ReportStoryModal />
      <ShareModal />
      <KeyboardShortcutsModal />
      <FloatingAIAssistant />

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-secondary border border-border text-text-primary text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;

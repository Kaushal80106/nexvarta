import { useState, useEffect } from 'react';
import { 
  ViewRoute, 
  Story, 
  Category, 
  UserProfile, 
  NotificationItem 
} from '../types';
import { mockStories } from '../data/mockStories';
import { mockEntities } from '../data/mockEntities';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
  contextStoryTitle?: string;
}

export interface AppState {
  theme: 'dark' | 'light';
  currentRoute: ViewRoute;
  currentStoryId: string | null;
  currentEntitySlug: string | null;
  searchQuery: string;
  selectedCategory: Category | 'All';
  selectedLanguage: string;
  selectedLocation: {
    country: string;
    state: string;
    district: string;
    city: string;
  };
  feedTab: 'top' | 'for-you' | 'trending' | 'following' | 'local' | 'latest';
  viewMode: 'grid' | 'list';
  sidebarCollapsed: boolean;
  
  // Modals & Panels
  isStoryAIOpen: boolean;
  activeStoryForAI: Story | null;
  isCommandPaletteOpen: boolean;
  isWhySeeingModalOpen: boolean;
  isReportModalOpen: boolean;
  isShareModalOpen: boolean;
  isKeyboardShortcutsOpen: boolean;
  modalTargetStory: Story | null;
  toastMessage: string | null;

  // User Profile & Activity
  user: UserProfile;
  notifications: NotificationItem[];
  // Feed Data
  feed: Story[];
}

const initialUserState: UserProfile = {
  id: 'usr-kaushal',
  name: 'Kaushal',
  email: 'kaushal80106@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
  location: {
    country: 'India',
    state: 'Maharashtra',
    district: 'Palghar',
    city: 'Virar'
  },
  followedTopics: ['Artificial Intelligence', 'OpenAI', 'Indian Economy', 'Virar', 'ISRO'],
  savedStoryIds: ['story-1', 'story-3'],
  savedFolders: [
    { id: 'f-all', name: 'All Saved', count: 2 },
    { id: 'f-tech', name: 'Technology & AI', count: 1 },
    { id: 'f-local', name: 'Local & Transit', count: 1 },
    { id: 'f-research', name: 'Research & Policy', count: 0 },
    { id: 'f-later', name: 'Read Later', count: 0 }
  ],
  readingHistory: [
    { storyId: 'story-1', readAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
    { storyId: 'story-2', readAt: new Date(Date.now() - 90 * 60 * 1000).toISOString() },
    { storyId: 'story-3', readAt: new Date(Date.now() - 180 * 60 * 1000).toISOString() },
    { storyId: 'story-4', readAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString() }
  ],
  preferences: {
    languages: ['English', 'Hindi', 'Marathi'],
    briefingTime: '07:30 AM',
    defaultFeed: 'for-you',
    notifications: {
      breaking: true,
      important: true,
      following: true,
      local: true,
      dailyBrief: true
    }
  },
  plan: 'Pro'
};

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'breaking',
    title: 'OpenAI Reasoning Engine Live',
    message: '18 sources now reporting on frontier verification architecture.',
    timestamp: '28m ago',
    isRead: false,
    storyId: 'story-1',
    category: 'Technology'
  },
  {
    id: 'notif-2',
    type: 'local',
    title: 'Virar-Dahanu 4-Track Upgrade Greenlit',
    message: '₹3,580 Cr civil work sanctioned for suburban transit line.',
    timestamp: '2h ago',
    isRead: false,
    storyId: 'story-3',
    category: 'Local'
  },
  {
    id: 'notif-3',
    type: 'brief',
    title: 'Your Morning Briefing is Ready',
    message: '5 key intelligence summaries curated for your topics.',
    timestamp: '5h ago',
    isRead: true,
    category: 'India'
  }
];

const initialChatHistory: ChatMessage[] = [
  {
    id: 'chat-init-1',
    role: 'assistant',
    content: "Welcome to NexVarta Intelligence. I synthesize news across dozens of verified sources, extract empirical claims, and analyze structural impacts. Ask me anything about current events, or click 'Ask AI' on any story to inspect its nuances.",
    timestamp: 'Just now'
  }
];

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('nexvarta_theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  }
  return 'dark';
};

const initialTheme = getInitialTheme();
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.classList.toggle('light', initialTheme === 'light');
}

let globalState: AppState = {
  theme: initialTheme,
  currentRoute: 'home',
  currentStoryId: 'story-1',
  currentEntitySlug: 'openai',
  searchQuery: '',
  selectedCategory: 'All',
  selectedLanguage: 'English',
  selectedLocation: {
    country: 'India',
    state: 'Maharashtra',
    district: 'Palghar',
    city: 'Virar'
  },
  feedTab: 'for-you',
  viewMode: 'grid',
  sidebarCollapsed: false,
  isStoryAIOpen: false,
  activeStoryForAI: null,
  isCommandPaletteOpen: false,
  isWhySeeingModalOpen: false,
  isReportModalOpen: false,
  isShareModalOpen: false,
  isKeyboardShortcutsOpen: false,
  modalTargetStory: null,
  toastMessage: null,
  user: initialUserState,
  notifications: initialNotifications,
  chatHistory: initialChatHistory,
  feed: []
};

const listeners = new Set<(state: AppState) => void>();

function notify() {
  listeners.forEach((l) => l(globalState));
}

export function setGlobalState(updater: Partial<AppState> | ((prev: AppState) => Partial<AppState>)) {
  const updates = typeof updater === 'function' ? updater(globalState) : updater;
  globalState = { ...globalState, ...updates };
  notify();
}

let toastTimer: any = null;
export function showToast(msg: string) {
  if (toastTimer) clearTimeout(toastTimer);
  setGlobalState({ toastMessage: msg });
  toastTimer = setTimeout(() => {
    setGlobalState({ toastMessage: null });
  }, 3500);
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const navigate = (route: ViewRoute, params?: { storyId?: string; entitySlug?: string }) => {
    setGlobalState((prev) => {
      const updates: Partial<AppState> = { currentRoute: route };
      if (params?.storyId) {
        updates.currentStoryId = params.storyId;
        // add to reading history
        const existingIdx = prev.user.readingHistory.findIndex((h) => h.storyId === params.storyId);
        const newHistory = [...prev.user.readingHistory];
        if (existingIdx >= 0) {
          newHistory[existingIdx] = { storyId: params.storyId, readAt: new Date().toISOString() };
        } else {
          newHistory.unshift({ storyId: params.storyId, readAt: new Date().toISOString() });
        }
        updates.user = { ...prev.user, readingHistory: newHistory };
      }
      if (params?.entitySlug) {
        updates.currentEntitySlug = params.entitySlug;
      }
      return updates;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveStory = (storyId: string) => {
    const isSaved = state.user.savedStoryIds.includes(storyId);
    const newSaved = isSaved 
      ? state.user.savedStoryIds.filter((id) => id !== storyId)
      : [...state.user.savedStoryIds, storyId];
    
    setGlobalState((prev) => ({
      user: {
        ...prev.user,
        savedStoryIds: newSaved,
        savedFolders: prev.user.savedFolders.map((f) => 
          f.id === 'f-all' ? { ...f, count: newSaved.length } : f
        )
      }
    }));
    showToast(isSaved ? 'Story removed from your library' : 'Saved to your library');
  };

  const toggleFollowEntity = (slugOrName: string) => {
    const isFollowing = state.user.followedTopics.includes(slugOrName);
    const newFollowed = isFollowing
      ? state.user.followedTopics.filter((t) => t !== slugOrName)
      : [...state.user.followedTopics, slugOrName];
    
    setGlobalState((prev) => ({
      user: {
        ...prev.user,
        followedTopics: newFollowed
      }
    }));
    showToast(isFollowing ? `Unfollowed "${slugOrName}"` : `Following "${slugOrName}"`);
  };

  const sendAssistantMessage = (prompt: string, contextStory?: Story | null) => {
    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: prompt,
      timestamp: 'Just now',
      contextStoryTitle: contextStory?.headline
    };

    // Synthesize contextual AI response
    let aiResponse = '';
    let sources: string[] = ['NexVarta Verification Engine', 'Multi-source Consensus Index'];

    if (contextStory) {
      sources.push(...contextStory.sources.map((s) => s.name));
      const p = prompt.toLowerCase();
      if (p.includes('why') || p.includes('care') || p.includes('important') || p.includes('affect') || p.includes('impact')) {
        aiResponse = `**Why This Matters:** ${contextStory.impact.whyItMatters}\n\n**Potential Impact Level:** ${contextStory.impact.potentialLevel} (${contextStory.impact.direction} trajectory with ${contextStory.impact.confidence}% empirical confidence).\n\n**Key Domains:** ${contextStory.impact.domains.map((d) => `\n- **${d.name} (${d.level})**: ${d.description}`).join('')}`;
      } else if (p.includes('simple') || p.includes('explain')) {
        aiResponse = `**In Simple Terms:**\n${contextStory.aiSummary.short}\n\n**The Crux:** ${contextStory.aiSummary.detailed.slice(0, 240)}...`;
      } else if (p.includes('india')) {
        aiResponse = `**Impact on India:**\nThis development directly influences India's strategic tech infrastructure and commercial enterprise modernization. Based on cross-referenced coverage across The Hindu and Indian Express, domestic stakeholders are positioning for localized adoption and capital deployment.`;
      } else if (p.includes('both sides') || p.includes('differ') || p.includes('perspective') || p.includes('risk')) {
        aiResponse = `**Comparative Perspectives & Risks:**\n\n- **Consensus:** ${contextStory.verification.consensus.join(' ')}\n- **Divergence:** ${contextStory.verification.differences.join(' ')}\n- **Unresolved:** ${contextStory.verification.unclear.join(' ')}`;
      } else if (p.includes('fact')) {
        aiResponse = `**Key Facts:**\n${contextStory.aiSummary.keyFacts.map((f) => `• ${f}`).join('\n')}\n\n**Uncertainty Note:** ${contextStory.impact.uncertaintyNotes}`;
      } else {
        aiResponse = `Based on synthesis across ${contextStory.sourceCount} verified outlets:\n\n${contextStory.aiSummary.detailed}\n\n**Verified Facts:**\n${contextStory.aiSummary.keyFacts.map((f) => `• ${f}`).join('\n')}\n\n**Uncertainty Note:** ${contextStory.impact.uncertaintyNotes}`;
      }
    } else {
      const p = prompt.toLowerCase();
      if (p.includes('dahanu-virar') || p.includes('quadrupling')) {
        aiResponse = `**Dahanu-Virar Quadrupling Project:**\nThis is a critical infrastructure upgrade by MRVC (Mumbai Railway Vikas Corporation) adding 2 new lines over 63 km. \n\n**Milestones:**\n- Earthwork & bridge construction: 45% complete.\n- Land acquisition: 98% completed.\n- Targeted completion: Dec 2026.\nThis will segregate suburban and long-distance traffic, drastically reducing commute times.`;
      } else if (p.includes('rbi') || p.includes('repo')) {
        aiResponse = `**RBI Repo Rate Pause:**\nThe RBI has maintained the repo rate at 6.5%. \n\n**Impact on Home Loans:**\n- Existing floating rate borrowers will see no immediate change in EMIs.\n- New borrowers might still secure slight discounts as banks compete during the festive season.\n- Rate cuts are now widely expected only in Q2 of the next fiscal year.`;
      } else if (p.includes('openai') || p.includes('test-time')) {
        aiResponse = `**OpenAI Test-Time Compute:**\nUnlike traditional LLMs that generate tokens immediately based on training weights (pre-compute), 'test-time reasoning' models allocate active compute to "think" during generation. This allows the model to internally plan, correct its own mistakes, and explore multiple solution paths before responding.`;
      } else if (p.includes('semiconductor') || p.includes('dholera')) {
        aiResponse = `**Dholera Semiconductor Facility:**\nTata Electronics is setting up India's first commercial semiconductor fab in Dholera, Gujarat. Groundbreaking has occurred, and the facility targets initial chip production by late 2026, focusing on 28nm nodes for automotive and consumer electronics.`;
      } else {
        aiResponse = `I've analyzed real-time reporting across global and regional wires. Currently tracking 5 core market and policy clusters including OpenAI's reasoning architecture, RBI monetary policy holds, and high-speed transit quadrupling in Western India. What specific angle would you like me to unpack?`;
      }
    }

    const aiMsg: ChatMessage = {
      id: 'ai-' + Date.now(),
      role: 'assistant',
      content: aiResponse,
      timestamp: 'Just now',
      sources: sources.slice(0, 4)
    };

    setGlobalState((prev) => ({
      chatHistory: [...prev.chatHistory, userMsg, aiMsg]
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setGlobalState((prev) => ({
      notifications: prev.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n)
    }));
  };

  const markAllNotificationsAsRead = () => {
    setGlobalState((prev) => ({
      notifications: prev.notifications.map((n) => ({ ...n, isRead: true }))
    }));
    showToast('All notifications marked as read');
  };

  const openWhySeeingModal = (story: Story) => {
    setGlobalState({ isWhySeeingModalOpen: true, modalTargetStory: story });
  };

  const openReportModal = (story: Story) => {
    setGlobalState({ isReportModalOpen: true, modalTargetStory: story });
  };

  const openShareModal = (story: Story) => {
    setGlobalState({ isShareModalOpen: true, modalTargetStory: story });
  };

  const openStoryAssistant = (story: Story) => {
    setGlobalState({ isStoryAIOpen: true, activeStoryForAI: story });
  };

  const closeModals = () => {
    setGlobalState({
      isWhySeeingModalOpen: false,
      isReportModalOpen: false,
      isShareModalOpen: false,
      isKeyboardShortcutsOpen: false,
      isCommandPaletteOpen: false,
      isStoryAIOpen: false
    });
  };

  return {
    ...state,
    currentRouteParams: {
      storyId: state.currentStoryId,
      entitySlug: state.currentEntitySlug
    },
    navigate,
    toggleSaveStory,
    toggleFollowEntity,
    sendAssistantMessage,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    openWhySeeingModal,
    openReportModal,
    openShareModal,
    openStoryAssistant,
    closeModals,
    setSearchQuery: (searchQuery: string) => setGlobalState({ searchQuery }),
    setSelectedCategory: (selectedCategory: Category | 'All') => setGlobalState({ selectedCategory }),
    setSelectedLanguage: (selectedLanguage: string) => setGlobalState({ selectedLanguage }),
    setSelectedLocation: (selectedLocation: AppState['selectedLocation']) => setGlobalState({ selectedLocation }),
    setFeedTab: (feedTab: AppState['feedTab']) => setGlobalState({ feedTab }),
    setViewMode: (viewMode: AppState['viewMode']) => setGlobalState({ viewMode }),
    toggleSidebar: () => setGlobalState((prev) => ({ sidebarCollapsed: !prev.sidebarCollapsed })),
    setCommandPaletteOpen: (isCommandPaletteOpen: boolean) => setGlobalState({ isCommandPaletteOpen }),
    setKeyboardShortcutsOpen: (isKeyboardShortcutsOpen: boolean) => setGlobalState({ isKeyboardShortcutsOpen }),
    toggleTheme: () => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('nexvarta_theme', next);
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.classList.toggle('light', next === 'light');
      }
      setGlobalState({ theme: next });
      showToast(next === 'light' ? 'Day Mode activated ☀️' : 'Night Mode activated 🌙');
    },
    setTheme: (theme: 'dark' | 'light') => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('nexvarta_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('light', theme === 'light');
      }
      setGlobalState({ theme });
    },
    fetchLiveFeed: async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        // Load 50 stories so all category filters work without extra API calls
        const res = await fetch(`${apiUrl}/api/v1/stories/feed?page=1&limit=50`);
        if (res.ok) {
          const data = await res.json();
          const stories = Array.isArray(data) ? data : (data.stories || []);
          setGlobalState({ feed: stories });
        }
      } catch (e) {
        console.error("Failed to fetch feed", e);
      }
    },
    loadMoreFeed: async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const currentPage = Math.floor(globalState.feed.length / 20) + 1;
        const res = await fetch(`${apiUrl}/api/v1/stories/feed?page=${currentPage}&limit=20`);
        if (res.ok) {
          const data = await res.json();
          const newStories = Array.isArray(data) ? data : (data.stories || []);
          setGlobalState({ feed: [...globalState.feed, ...newStories] });
        }
      } catch (e) {
        console.error("Failed to load more feed", e);
      }
    }
  };
}

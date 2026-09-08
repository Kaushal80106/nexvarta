/**
 * Core Type Definitions for NexVarta News Intelligence Platform
 */

export type Category = 
  | 'Politics' 
  | 'Business' 
  | 'Technology' 
  | 'Finance' 
  | 'Sports' 
  | 'Science' 
  | 'Entertainment' 
  | 'World' 
  | 'India'
  | 'Local';

export type ImpactLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ImpactDirection = 'Positive' | 'Neutral' | 'Negative' | 'Mixed';

export type VerificationStatus = 
  | 'Well corroborated' 
  | 'Partially corroborated' 
  | 'Conflicting reports' 
  | 'Insufficient evidence';

export interface Source {
  id: string;
  name: string;
  domain: string;
  logo: string;
  headline: string;
  publishedAt: string;
  summary: string;
  perspective: 'Factual / Analytical' | 'Policy-focused' | 'Industry / Commercial' | 'Critical / Skeptical' | 'Regional Impact';
  originalUrl: string;
  credibilityScore: number;
}

export interface Claim {
  id: string;
  text: string;
  status: 'Supported' | 'Disputed' | 'Unverified';
  confidence: number;
  supportingSources: string[];
  contradictingSources?: string[];
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  timeLabel: string;
  title: string;
  description: string;
  sourceName: string;
  badge?: string;
}

export interface DomainImpactItem {
  name: string;
  level: ImpactLevel;
  description: string;
}

export interface StoryImpact {
  potentialLevel: ImpactLevel;
  direction: ImpactDirection;
  confidence: number; // 0 - 100
  timeHorizon: 'Immediate (0–7 days)' | 'Short Term (1–3 months)' | 'Medium Term (3–12 months)' | 'Long Term (1+ years)';
  domains: DomainImpactItem[];
  whyItMatters: string;
  uncertaintyNotes: string;
}

export interface StoryVerification {
  status: VerificationStatus;
  confidence: number;
  lastCheckedAt: string;
  claims: Claim[];
  consensus: string[];
  differences: string[];
  unclear: string[];
}

export interface Story {
  id: string;
  slug: string;
  category: Category;
  headline: string;
  subheadline?: string;
  publishedAt: string;
  updatedAt: string;
  sourceCount: number;
  sources: Source[];
  aiSummary: {
    short: string;
    detailed: string;
    keyFacts: string[];
  };
  impact: StoryImpact;
  verification: StoryVerification;
  timeline: TimelineEvent[];
  relatedEntities: {
    id: string;
    name: string;
    type: 'Topic' | 'Company' | 'Person' | 'Location';
    slug: string;
  }[];
  location?: {
    country: string;
    state?: string;
    district?: string;
    city?: string;
  };
  isTrending?: boolean;
  trendingScore?: number;
  growthRate?: string;
  readTimeMinutes: number;
  originalArticle: {
    publisher: string;
    url: string;
    note: string;
  };
}

export interface Entity {
  id: string;
  slug: string;
  name: string;
  type: 'Topic' | 'Company' | 'Person' | 'Location' | 'Publisher';
  category: Category;
  followersCount: number;
  isFollowing: boolean;
  bio: string;
  description?: string;
  stats: {
    storiesThisMonth: number;
    sentimentScore: number;
    impactLevel: ImpactLevel;
  };
  relatedStoryIds: string[];
  relatedEntities?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: {
    country: string;
    state: string;
    district: string;
    city: string;
  };
  followedTopics: string[];
  savedStoryIds: string[];
  savedFolders: {
    id: string;
    name: string;
    count: number;
  }[];
  readingHistory: {
    storyId: string;
    readAt: string;
  }[];
  preferences: {
    languages: string[];
    briefingTime: string;
    defaultFeed: 'for-you' | 'top' | 'latest' | 'local';
    notifications: {
      breaking: boolean;
      important: boolean;
      following: boolean;
      local: boolean;
      dailyBrief: boolean;
    };
  };
  plan: 'Free' | 'Pro' | 'Enterprise';
}

export interface NotificationItem {
  id: string;
  type: 'breaking' | 'development' | 'followed' | 'local' | 'brief' | 'update';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  storyId?: string;
  category?: Category;
}

export interface DailyBriefItem {
  id: string;
  order: number;
  storyId: string;
  headline: string;
  whatHappened: string;
  whyItMatters: string;
  potentialImpact: string;
  category: Category;
  sourcesCount: number;
}

export interface AdminSourceItem {
  id: string;
  publisher: string;
  category: Category;
  country: string;
  language: string;
  reliability: number; // 0-100
  status: 'Healthy' | 'Warning' | 'Failed';
  lastFetch: string;
  articlesCount: number;
}

export interface AdminReportItem {
  id: string;
  storyId: string;
  storyHeadline: string;
  reason: 'Misleading' | 'Incorrect information' | 'Duplicate' | 'Inappropriate' | 'Broken link' | 'Other';
  reportedBy: string;
  timestamp: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  notes?: string;
}

export type ViewRoute = 
  | 'landing'
  | 'home'
  | 'discover'
  | 'trending'
  | 'following'
  | 'local'
  | 'daily-brief'
  | 'saved'
  | 'history'
  | 'personalization'
  | 'story'
  | 'entity'
  | 'assistant'
  | 'notifications'
  | 'settings'
  | 'pricing'
  | 'help'
  | 'admin'
  | 'auth'
  | 'onboarding'
  | '404';

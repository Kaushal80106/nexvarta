import { AdminSourceItem, AdminReportItem } from '../types';

export const mockAdminSources: AdminSourceItem[] = [
  {
    id: 'src-adm-1',
    publisher: 'Reuters Wire',
    category: 'World',
    country: 'United Kingdom',
    language: 'English',
    reliability: 98,
    status: 'Healthy',
    lastFetch: '2m ago',
    articlesCount: 1420
  },
  {
    id: 'src-adm-2',
    publisher: 'The Hindu',
    category: 'India',
    country: 'India',
    language: 'English',
    reliability: 95,
    status: 'Healthy',
    lastFetch: '5m ago',
    articlesCount: 980
  },
  {
    id: 'src-adm-3',
    publisher: 'BBC World Service',
    category: 'World',
    country: 'United Kingdom',
    language: 'English',
    reliability: 96,
    status: 'Healthy',
    lastFetch: '8m ago',
    articlesCount: 1120
  },
  {
    id: 'src-adm-4',
    publisher: 'Livemint & Wall Street Journal',
    category: 'Finance',
    country: 'India',
    language: 'English',
    reliability: 94,
    status: 'Healthy',
    lastFetch: '12m ago',
    articlesCount: 760
  },
  {
    id: 'src-adm-5',
    publisher: 'TechCrunch',
    category: 'Technology',
    country: 'United States',
    language: 'English',
    reliability: 91,
    status: 'Healthy',
    lastFetch: '14m ago',
    articlesCount: 640
  },
  {
    id: 'src-adm-6',
    publisher: 'Loksatta (Regional Marathi)',
    category: 'Local',
    country: 'India',
    language: 'Marathi',
    reliability: 92,
    status: 'Healthy',
    lastFetch: '18m ago',
    articlesCount: 410
  },
  {
    id: 'src-adm-7',
    publisher: 'Mumbai Mirror Civic Desk',
    category: 'Local',
    country: 'India',
    language: 'English',
    reliability: 89,
    status: 'Warning',
    lastFetch: '45m ago',
    articlesCount: 230
  }
];

export const mockAdminReports: AdminReportItem[] = [
  {
    id: 'rep-1',
    storyId: 'story-1',
    storyHeadline: 'OpenAI Unveils Next-Gen Autonomous Reasoning Engine',
    reason: 'Incorrect information',
    reportedBy: 'user_4821@example.com',
    timestamp: '2 hours ago',
    status: 'Resolved',
    notes: 'Verified against OpenAI API pricing tiers. Disputed claim regarding consumer price hike was already flagged by automated verifier.'
  },
  {
    id: 'rep-2',
    storyId: 'story-3',
    storyHeadline: 'Western Railway Approves Quadrupling of Dahanu-Virar Corridor',
    reason: 'Duplicate',
    reportedBy: 'commuter_99@palghar.in',
    timestamp: '5 hours ago',
    status: 'Pending',
    notes: 'Check if early morning MRVC announcement can be auto-merged into current story cluster.'
  }
];

export interface PipelineSource {
  id: string;
  name: string;
  tier: number;
  reliability: number;
  articlesIngestedToday: number;
  disputeRate: number;
  status: 'ACTIVE' | 'PAUSED';
}

export const mockPipelineSources: PipelineSource[] = [
  { id: 'src-1', name: 'Reuters Wire Service', tier: 1, reliability: 98, articlesIngestedToday: 4120, disputeRate: 0.4, status: 'ACTIVE' },
  { id: 'src-2', name: 'The Hindu & BusinessLine', tier: 1, reliability: 96, articlesIngestedToday: 2840, disputeRate: 0.8, status: 'ACTIVE' },
  { id: 'src-3', name: 'Bloomberg Financial Terminal Feed', tier: 1, reliability: 97, articlesIngestedToday: 3450, disputeRate: 0.5, status: 'ACTIVE' },
  { id: 'src-4', name: 'Indian Express National Desk', tier: 2, reliability: 93, articlesIngestedToday: 1980, disputeRate: 1.2, status: 'ACTIVE' },
  { id: 'src-5', name: 'TechCrunch & VentureBeat AI Desk', tier: 2, reliability: 91, articlesIngestedToday: 1240, disputeRate: 1.8, status: 'ACTIVE' },
  { id: 'src-6', name: 'Maharashtra Regional Civic Gazette (VVCMC)', tier: 1, reliability: 99, articlesIngestedToday: 450, disputeRate: 0.1, status: 'ACTIVE' },
  { id: 'src-7', name: 'Press Information Bureau (PIB India)', tier: 1, reliability: 99, articlesIngestedToday: 1680, disputeRate: 0.2, status: 'ACTIVE' },
];

export const mockAdminMetrics = {
  activeWires: 1842,
  processed24h: 24190,
  consensusRatio: '18.4 : 1',
  modelLatency: '320ms'
};

export interface PipelineStageMetric {
  stage: string;
  processedPerMin: number;
  avgLatencyMs: number;
  successRate: number;
  status: 'optimal' | 'busy' | 'degraded';
}

export const mockPipelineMetrics: PipelineStageMetric[] = [
  { stage: 'INGEST', processedPerMin: 1840, avgLatencyMs: 140, successRate: 99.8, status: 'optimal' },
  { stage: 'NORMALIZE', processedPerMin: 1810, avgLatencyMs: 85, successRate: 99.6, status: 'optimal' },
  { stage: 'CLUSTER', processedPerMin: 1750, avgLatencyMs: 320, successRate: 98.9, status: 'optimal' },
  { stage: 'SUMMARIZE', processedPerMin: 420, avgLatencyMs: 1250, successRate: 99.2, status: 'optimal' },
  { stage: 'VERIFY', processedPerMin: 390, avgLatencyMs: 880, successRate: 97.4, status: 'optimal' },
  { stage: 'IMPACT', processedPerMin: 390, avgLatencyMs: 740, successRate: 98.1, status: 'optimal' },
  { stage: 'PERSONALIZE', processedPerMin: 1650, avgLatencyMs: 110, successRate: 99.9, status: 'optimal' },
];

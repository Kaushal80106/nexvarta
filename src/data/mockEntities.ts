import { Entity } from '../types';

export const mockEntities: Entity[] = [
  {
    id: 'ent-openai',
    slug: 'openai',
    name: 'OpenAI',
    type: 'Company',
    category: 'Technology',
    followersCount: 842000,
    isFollowing: true,
    bio: 'American artificial intelligence research organization dedicated to developing safe and beneficial frontier cognitive systems.',
    stats: {
      storiesThisMonth: 64,
      sentimentScore: 78,
      impactLevel: 'HIGH'
    },
    relatedStoryIds: ['story-1'],
    relatedEntities: ['Artificial Intelligence', 'Sam Altman', 'Microsoft', 'NVIDIA']
  },
  {
    id: 'ent-ai',
    slug: 'ai',
    name: 'Artificial Intelligence',
    type: 'Topic',
    category: 'Technology',
    followersCount: 1420000,
    isFollowing: true,
    bio: 'The science and engineering of developing autonomous computational systems capable of perceptual, reasoning, and synthesis capabilities.',
    stats: {
      storiesThisMonth: 184,
      sentimentScore: 82,
      impactLevel: 'CRITICAL'
    },
    relatedStoryIds: ['story-1', 'story-6'],
    relatedEntities: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Semiconductors']
  },
  {
    id: 'ent-rbi',
    slug: 'rbi',
    name: 'Reserve Bank of India',
    type: 'Company',
    category: 'Finance',
    followersCount: 610000,
    isFollowing: true,
    bio: 'India’s central banking institution and statutory monetary authority regulating currency issue, banking reserves, and credit management.',
    stats: {
      storiesThisMonth: 42,
      sentimentScore: 88,
      impactLevel: 'HIGH'
    },
    relatedStoryIds: ['story-2'],
    relatedEntities: ['Indian Economy', 'Shaktikanta Das', 'State Bank of India', 'HDFC Bank']
  },
  {
    id: 'ent-isro',
    slug: 'isro',
    name: 'ISRO',
    type: 'Company',
    category: 'Science',
    followersCount: 1980000,
    isFollowing: true,
    bio: 'The national space agency of India, operating satellite launch vehicles, planetary probes, and human spaceflight missions.',
    stats: {
      storiesThisMonth: 31,
      sentimentScore: 96,
      impactLevel: 'HIGH'
    },
    relatedStoryIds: ['story-4'],
    relatedEntities: ['Gaganyaan Mission', 'Space Exploration', 'NASA', 'HAL']
  },
  {
    id: 'ent-mumbai',
    slug: 'mumbai',
    name: 'Mumbai MMR',
    type: 'Location',
    category: 'Local',
    followersCount: 520000,
    isFollowing: true,
    bio: 'The financial capital of India and its sprawling metropolitan region encompassing Mumbai, Thane, Navi Mumbai, and Palghar.',
    stats: {
      storiesThisMonth: 128,
      sentimentScore: 74,
      impactLevel: 'HIGH'
    },
    relatedStoryIds: ['story-2', 'story-3'],
    relatedEntities: ['Virar', 'Palghar', 'Western Railway', 'Maharashtra']
  },
  {
    id: 'ent-virar',
    slug: 'virar',
    name: 'Virar',
    type: 'Location',
    category: 'Local',
    followersCount: 94000,
    isFollowing: true,
    bio: 'Key northern suburban nexus and terminal hub in Palghar district, Maharashtra, undergoing rapid civic and transit expansion.',
    stats: {
      storiesThisMonth: 19,
      sentimentScore: 81,
      impactLevel: 'HIGH'
    },
    relatedStoryIds: ['story-3'],
    relatedEntities: ['Palghar', 'Western Railway', 'Vasai', 'Mumbai MMR']
  }
];

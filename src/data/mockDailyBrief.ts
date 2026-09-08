import { DailyBriefItem } from '../types';

export const mockDailyBriefs: DailyBriefItem[] = [
  {
    id: 'brief-1',
    order: 1,
    storyId: 'story-1',
    headline: 'OpenAI Releases Frontier Autonomous Reasoning Architecture',
    whatHappened: 'Unveiled dynamic test-time computation that validates mathematical and programming logic prior to emitting tokens, reducing hallucinations by 40%.',
    whyItMatters: 'Transitions generative AI from speculative conversational text toward verifiable enterprise task execution.',
    potentialImpact: 'Accelerates developer productivity while raising inferencing compute requirements across global cloud data centers.',
    category: 'Technology',
    sourcesCount: 18
  },
  {
    id: 'brief-2',
    order: 2,
    storyId: 'story-2',
    headline: 'RBI Maintains Benchmark Rate at 6.5%, Projects 7.2% GDP Expansion',
    whatHappened: 'Monetary Policy Committee voted 5-1 to hold policy rates steady, citing food inflation vigil amidst buoyant domestic manufacturing.',
    whyItMatters: 'Keeps commercial borrowing and home loan repayments predictable through the upcoming fiscal quarters.',
    potentialImpact: 'Supports record domestic capital expenditure and cushions rupee stability against global FX headwinds.',
    category: 'Finance',
    sourcesCount: 24
  },
  {
    id: 'brief-3',
    order: 3,
    storyId: 'story-3',
    headline: '₹3,580 Cr Quadrupling Approved for Virar-Dahanu Suburban Rail Corridor',
    whatHappened: 'Western Railway and MRVC cleared civil engineering tenders to lay 2 dedicated suburban lines separate from heavy mainline freight.',
    whyItMatters: 'Eliminates acute peak-hour bottleneck delays for over 450,000 daily commuters connecting Palghar to Mumbai.',
    potentialImpact: 'Doubles air-conditioned train frequencies and accelerates housing infrastructure development across the northern suburban belt.',
    category: 'Local',
    sourcesCount: 7
  },
  {
    id: 'brief-4',
    order: 4,
    storyId: 'story-4',
    headline: 'ISRO Qualifies Human-Rated Cryogenic CE-20 Engine for Gaganyaan',
    whatHappened: 'Completed flawless 720-second hot-fire test at Mahendragiri propulsion test bench, beating human-rating safety margin criteria.',
    whyItMatters: 'Clears the primary propulsion technological hurdle for upcoming uncrewed G1 orbital trials later this year.',
    potentialImpact: 'Solidifies India as the fourth sovereign nation with qualified indigenous human spaceflight launch capability.',
    category: 'Science',
    sourcesCount: 16
  },
  {
    id: 'brief-5',
    order: 5,
    storyId: 'story-5',
    headline: '$45B Transnational Semiconductor Packaging Consortium Finalized',
    whatHappened: 'Multinational chip alliance inked binding pacts to erect 3D chiplet packaging and wafer-level substrate fabs in Western India.',
    whyItMatters: 'Creates an indispensable alternative hub to East Asian packaging corridors for global AI hardware companies.',
    potentialImpact: 'Generates ~35,000 advanced precision engineering roles and spurs domestic electronics ancillary ecosystems.',
    category: 'Business',
    sourcesCount: 22
  }
];

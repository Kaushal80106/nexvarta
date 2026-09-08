import { Story } from '../types';

export const mockStories: Story[] = [
  {
    id: 'story-1',
    slug: 'openai-next-gen-autonomous-reasoning-engine',
    category: 'Technology',
    headline: 'OpenAI Unveils Next-Gen Autonomous Reasoning Engine with Adaptive Tool-Use and Verification Guardrails',
    subheadline: 'The frontier architecture shifts from simple token prediction to iterative self-verification chains, impacting developer tooling and cloud compute demands.',
    publishedAt: new Date(Date.now() - 36 * 60 * 1000).toISOString(), // 36 mins ago
    updatedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    sourceCount: 18,
    readTimeMinutes: 4,
    isTrending: true,
    trendingScore: 98,
    growthRate: '+310% in 2h',
    relatedEntities: [
      { id: 'ent-openai', name: 'OpenAI', type: 'Company', slug: 'openai' },
      { id: 'ent-ai', name: 'Artificial Intelligence', type: 'Topic', slug: 'ai' },
      { id: 'ent-altman', name: 'Sam Altman', type: 'Person', slug: 'sam-altman' },
      { id: 'ent-compute', name: 'Cloud Compute & Chips', type: 'Topic', slug: 'cloud-compute' },
    ],
    location: { country: 'United States', city: 'San Francisco' },
    aiSummary: {
      short: 'OpenAI has released a new frontier reasoning engine focusing on chain-of-thought verification, autonomous tool integration, and 40% reduced hallucination rates across complex logic tasks.',
      detailed: 'In a coordinated developer keynote and technical whitepaper release, OpenAI detailed an advanced cognitive architecture designed to deliberate before generating tokens. Unlike previous models that predict text sequentially with minimal reflection, the new model implements internal test-time compute, iteratively correcting intermediate code and mathematical derivations. Enterprise benchmarks indicate substantial performance jumps in multi-step software synthesis, financial auditing, and scientific review, though early compute latency is higher than standard models.',
      keyFacts: [
        'Introduces dynamic test-time computation that scales inference budget based on problem complexity.',
        'Achieves 89.2% on PhD-level STEM evaluation benchmarks, outpacing existing frontier baselines.',
        'Reduces hallucination frequency by 40% using automated verification guardrails before final response emission.',
        'Tiered API pricing introduced: high-reasoning mode costs 2.4x standard tokens, standard mode remains parity.',
        '18 international tech newsrooms and benchmark auditors have independently confirmed the benchmark improvements.'
      ]
    },
    impact: {
      potentialLevel: 'HIGH',
      direction: 'Positive',
      confidence: 84,
      timeHorizon: 'Short Term (1–3 months)',
      whyItMatters: 'This marks an architectural inflection point from static conversational chatbots to multi-stage autonomous agents capable of reliable software generation, complex workflow orchestration, and formal verification without constant human steering.',
      uncertaintyNotes: 'Inference latency and energy consumption per query remain noticeably elevated during complex reasoning runs. Real-world corporate adoption hinges on API latency guarantees and data sovereignty stipulations.',
      domains: [
        { name: 'Technology & AI Ecosystem', level: 'HIGH', description: 'Sets a new bar for competing models from Anthropic, Google, and open-source consortiums.' },
        { name: 'Software Developers', level: 'HIGH', description: '大幅 reduces manual debugging for multi-file codebases and API orchestration.' },
        { name: 'Enterprise Business', level: 'MEDIUM', description: 'Accelerates automated contract review, financial reconciliations, and internal technical documentation.' },
        { name: 'Cloud Infrastructure & Energy', level: 'HIGH', description: 'Dramatically shifts compute demand from pre-training runs toward test-time inference cycles.' },
        { name: 'Consumers & End-Users', level: 'MEDIUM', description: 'Gradual rollout will yield smarter personal agents, but initial access is skewed towards developers.' }
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 91,
      lastCheckedAt: '8 minutes ago',
      consensus: [
        'All major outlets corroborate model release date, public documentation, and developer portal availability.',
        'Test-time compute scaling methodology is verified in public technical report and independent sandbox testing.',
        'API pricing adjustments and rate tiers are live and matched across developer accounts.'
      ],
      differences: [
        'TechCrunch emphasizes developer ecosystem lock-in, while Reuters focuses on enterprise liability safeguards.',
        'The Verge questions the environmental impact of test-time compute; Bloomberg analyzes cloud gross margins.'
      ],
      unclear: [
        'Exact hardware cluster configurations (H100 vs Blackwell architecture) used for inference have not been disclosed.',
        'Full release timetable for European Union enterprise clients pending regulatory filings.'
      ],
      claims: [
        {
          id: 'claim-1',
          text: 'OpenAI released an autonomous reasoning model with internal step-by-step verification.',
          status: 'Supported',
          confidence: 98,
          supportingSources: ['Reuters', 'TechCrunch', 'Bloomberg', 'The Verge'],
          notes: 'Confirmed by official API release notes and live runtime instances.'
        },
        {
          id: 'claim-2',
          text: 'Hallucination rates dropped by 40% in standardized multi-hop reasoning datasets.',
          status: 'Supported',
          confidence: 88,
          supportingSources: ['MIT Tech Review', 'Wired', 'OpenAI Whitepaper'],
          notes: 'Supported by third-party benchmark evaluations on GAIA and SWE-bench.'
        },
        {
          id: 'claim-3',
          text: 'Inference costs for everyday consumer queries will double immediately.',
          status: 'Disputed',
          confidence: 81,
          supportingSources: ['The Information'],
          contradictingSources: ['Reuters', 'OpenAI Official Pricing'],
          notes: 'Consumer tier remains priced the same; only deliberate high-reasoning developer API endpoints carry premium compute multipliers.'
        }
      ]
    },
    sources: [
      {
        id: 'src-1',
        name: 'Reuters',
        domain: 'reuters.com',
        logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=64&auto=format&fit=crop&q=80',
        headline: 'OpenAI launches next-stage AI model featuring enhanced self-checking logic',
        publishedAt: '36m ago',
        summary: 'Focuses on commercial enterprise positioning, enterprise data privacy guarantees, and competitive pressures against Google and Anthropic.',
        perspective: 'Factual / Analytical',
        originalUrl: 'https://www.reuters.com/technology',
        credibilityScore: 96
      },
      {
        id: 'src-2',
        name: 'TechCrunch',
        domain: 'techcrunch.com',
        logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=64&auto=format&fit=crop&q=80',
        headline: 'Inside OpenAI’s new test-time reasoning architecture: What developers need to know',
        publishedAt: '42m ago',
        summary: 'Deep dive into API endpoints, Python SDK function calling additions, latency benchmarks, and developer cost trade-offs.',
        perspective: 'Industry / Commercial',
        originalUrl: 'https://techcrunch.com/artificial-intelligence',
        credibilityScore: 92
      },
      {
        id: 'src-3',
        name: 'BBC News',
        domain: 'bbc.com',
        logo: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=64&auto=format&fit=crop&q=80',
        headline: 'Tech giant claims major leap in reducing artificial intelligence errors',
        publishedAt: '1h ago',
        summary: 'Explains impact on public trust, consumer protection safeguards, and emerging international alignment standards.',
        perspective: 'Policy-focused',
        originalUrl: 'https://www.bbc.com/news/technology',
        credibilityScore: 95
      },
      {
        id: 'src-4',
        name: 'Bloomberg Technology',
        domain: 'bloomberg.com',
        logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&auto=format&fit=crop&q=80',
        headline: 'OpenAI pushes frontier boundaries as AI monetization and cloud margins face scrutiny',
        publishedAt: '1h 15m ago',
        summary: 'Examines capital expenditures, Microsoft Azure capacity reservations, and projected revenue growth in enterprise contracts.',
        perspective: 'Industry / Commercial',
        originalUrl: 'https://www.bloomberg.com/technology',
        credibilityScore: 94
      },
      {
        id: 'src-5',
        name: 'The Hindu',
        domain: 'thehindu.com',
        logo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=64&auto=format&fit=crop&q=80',
        headline: 'Global AI reasoning breakthrough: Implications for Indian software services sector',
        publishedAt: '2h ago',
        summary: 'Analyzes how Indian IT majors (TCS, Infosys, Wipro) are integrating the new cognitive engine for legacy code modernizations.',
        perspective: 'Regional Impact',
        originalUrl: 'https://www.thehindu.com/sci-tech/technology',
        credibilityScore: 93
      }
    ],
    timeline: [
      {
        id: 't-1',
        timestamp: '08:00 UTC',
        timeLabel: '08:00',
        title: 'Developer Teaser Disclosed',
        description: 'OpenAI leadership posts cryptic preview notes regarding internal benchmark improvements.',
        sourceName: 'X / Social Broadcast'
      },
      {
        id: 't-2',
        timestamp: '08:30 UTC',
        timeLabel: '08:30',
        title: 'Official Keynote & Whitepaper Release',
        description: 'Comprehensive research documentation and API documentation published simultaneously on dev portal.',
        sourceName: 'OpenAI Research',
        badge: 'Official Release'
      },
      {
        id: 't-3',
        timestamp: '09:15 UTC',
        timeLabel: '09:15',
        title: 'Reuters Publishes Enterprise Review',
        description: 'Focuses on enterprise compliance, safety alignment metrics, and multinational customer trials.',
        sourceName: 'Reuters'
      },
      {
        id: 't-4',
        timestamp: '10:05 UTC',
        timeLabel: '10:05',
        title: 'Independent Benchmark Repositories Validate SWE-bench Jump',
        description: 'Third-party open evaluations confirm 14% lift on autonomous GitHub issue resolutions.',
        sourceName: 'Open Research Sandbox'
      },
      {
        id: 't-5',
        timestamp: '11:40 UTC',
        timeLabel: '11:40',
        title: 'Cloud Infrastructure Shares React',
        description: 'Semiconductor and cloud provider stocks experience modest volume bumps following inference compute projections.',
        sourceName: 'Bloomberg Markets'
      }
    ],
    originalArticle: {
      publisher: 'Reuters',
      url: 'https://www.reuters.com/technology',
      note: 'NexVarta provides independent intelligence synthesis. Full copyright remains with respective news organizations.'
    }
  },
  {
    id: 'story-2',
    slug: 'rbi-keeps-repo-rate-at-6-5-gdp-projected-7-2',
    category: 'Finance',
    headline: 'Reserve Bank of India Holds Repo Rate at 6.5%, Projects 7.2% GDP Growth on Resilient Domestic Demand',
    subheadline: 'Monetary Policy Committee votes 5-1 to maintain withdrawal of accommodation, citing sticky food inflation alongside record capital capex.',
    publishedAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    sourceCount: 24,
    readTimeMinutes: 5,
    isTrending: true,
    trendingScore: 94,
    growthRate: '+240% in 3h',
    relatedEntities: [
      { id: 'ent-rbi', name: 'Reserve Bank of India', type: 'Company', slug: 'rbi' },
      { id: 'ent-in-econ', name: 'Indian Economy', type: 'Topic', slug: 'indian-economy' },
      { id: 'ent-das', name: 'Shaktikanta Das', type: 'Person', slug: 'shaktikanta-das' },
      { id: 'ent-india', name: 'India', type: 'Location', slug: 'india' },
    ],
    location: { country: 'India', state: 'Maharashtra', city: 'Mumbai' },
    aiSummary: {
      short: 'The RBI has maintained its benchmark interest rate at 6.5% for the eighth consecutive review while reaffirming an upbeat 7.2% fiscal GDP growth target.',
      detailed: 'RBI Governor Shaktikanta Das announced the Monetary Policy Committee’s decision to keep the policy repo rate unchanged at 6.50% while standing firm on the stance of "withdrawal of accommodation". While headline retail inflation has softened within the tolerance band, erratic monsoon distribution and persistent food price pressures prevent an immediate rate easing cycle. Strong manufacturing indices, rural demand revival, and sustained public infrastructure spend continue to anchor growth projections above global peers.',
      keyFacts: [
        'Repo rate remains unchanged at 6.50%; SDF rate at 6.25% and MSF at 6.75%.',
        'Real GDP growth for FY26 retained at an optimistic 7.2% with balanced risks.',
        'CPI inflation projection held at 4.5% with food inflation flagged as the primary uncertainty variable.',
        'Bank credit growth continues at 15.4% year-on-year, underscoring resilient corporate and retail borrowing.',
        'Foreign exchange reserves remain near record highs of $670 billion, providing substantial external buffer.'
      ]
    },
    impact: {
      potentialLevel: 'HIGH',
      direction: 'Positive',
      confidence: 91,
      timeHorizon: 'Medium Term (3–12 months)',
      whyItMatters: 'Rate stability preserves predictability for domestic corporate borrowing and mortgage holders, while insulating the Rupee against global central bank divergence.',
      uncertaintyNotes: 'Monsoon spatial variability and geopolitical crude spikes represent the two swing variables that could delay expected rate cuts into early next year.',
      domains: [
        { name: 'Banking & Financial Markets', level: 'HIGH', description: 'Maintains healthy Net Interest Margins (NIMs) for commercial lenders.' },
        { name: 'Real Estate & Homeowners', level: 'MEDIUM', description: 'Home loan EMIs remain stable without fresh repayment shocks.' },
        { name: 'Consumer Spending', level: 'MEDIUM', description: 'Credit card and auto financing rates hold steady heading into festive quarters.' },
        { name: 'Infrastructure & Heavy Industry', level: 'HIGH', description: 'Predictable debt servicing costs assist ongoing greenfield capex execution.' }
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 97,
      lastCheckedAt: '12 minutes ago',
      consensus: [
        'All 24 monitored sources agree on the 5-1 vote split and unanimous 6.50% rate outcome.',
        'Inflation target figures and GDP growth forecasts match verbatim with official RBI gazette release.',
        'Governor statement on liquidity conditions is consistently reported across national and international press.'
      ],
      differences: [
        'Mint underscores external member dissenting vote nuances; Economic Times emphasizes bond yield reactions.',
        'Reuters highlights foreign institutional equity inflow expectations following policy certainty.'
      ],
      unclear: [
        'Timeline for transition to neutral monetary policy stance remains subject to upcoming Q2 food inflation prints.'
      ],
      claims: [
        {
          id: 'claim-rbi-1',
          text: 'RBI Monetary Policy Committee voted 5-1 to hold repo rate steady at 6.5%.',
          status: 'Supported',
          confidence: 100,
          supportingSources: ['The Hindu', 'Mint', 'Indian Express', 'RBI Gazette'],
          notes: 'Direct verbatim transcription from governor press conference.'
        },
        {
          id: 'claim-rbi-2',
          text: 'India FY GDP growth estimate upgraded to 7.2%.',
          status: 'Supported',
          confidence: 96,
          supportingSources: ['Bloomberg', 'The Hindu', 'Reuters'],
          notes: 'Confirmed in official macroeconomic projection tables.'
        }
      ]
    },
    sources: [
      {
        id: 'src-rbi-1',
        name: 'The Hindu',
        domain: 'thehindu.com',
        logo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=64&auto=format&fit=crop&q=80',
        headline: 'RBI holds repo rate at 6.5%, maintains focus on durable inflation alignment',
        publishedAt: '1h 35m ago',
        summary: 'Highlights Governor Shaktikanta Das remarks on safeguarding consumer purchasing power against volatile vegetable prices.',
        perspective: 'Factual / Analytical',
        originalUrl: 'https://thehindu.com/business',
        credibilityScore: 94
      },
      {
        id: 'src-rbi-2',
        name: 'Mint',
        domain: 'livemint.com',
        logo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=64&auto=format&fit=crop&q=80',
        headline: 'RBI MPC Meeting: Key takeaways for equity markets, bond yields, and fixed deposits',
        publishedAt: '1h 40m ago',
        summary: 'Analyzes debt mutual fund yield curves and equity market responses across banking benchmarks.',
        perspective: 'Industry / Commercial',
        originalUrl: 'https://livemint.com/market',
        credibilityScore: 93
      },
      {
        id: 'src-rbi-3',
        name: 'Indian Express',
        domain: 'indianexpress.com',
        logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=64&auto=format&fit=crop&q=80',
        headline: 'Why RBI is waiting before easing rates: Decoding the food inflation puzzle',
        publishedAt: '2h ago',
        summary: 'Deep investigation into supply-chain friction, perishable commodity volatility, and climate effects on rural income.',
        perspective: 'Policy-focused',
        originalUrl: 'https://indianexpress.com/section/business',
        credibilityScore: 92
      }
    ],
    timeline: [
      {
        id: 't-rbi-1',
        timestamp: '10:00 IST',
        timeLabel: '10:00',
        title: 'Governor Commences Policy Address',
        description: 'RBI Governor Das presents the resolution of the Monetary Policy Committee live.',
        sourceName: 'RBI Official'
      },
      {
        id: 't-rbi-2',
        timestamp: '10:15 IST',
        timeLabel: '10:15',
        title: 'Rate Decision & Stance Confirmed',
        description: '6.50% repo rate held steady; 5-1 majority vote for withdrawal of accommodation.',
        sourceName: 'RBI Gazette',
        badge: 'Key Announcement'
      },
      {
        id: 't-rbi-3',
        timestamp: '10:45 IST',
        timeLabel: '10:45',
        title: 'Bond Yields Rebound 3 bps',
        description: 'Benchmark 10-year Indian government bond yield trades slightly firmer at 6.98%.',
        sourceName: 'NSE Markets'
      }
    ],
    originalArticle: {
      publisher: 'The Hindu',
      url: 'https://www.thehindu.com',
      note: 'NexVarta synthesized from 24 verified institutional and wire reports.'
    }
  },
  {
    id: 'story-3',
    slug: 'western-railway-dahanu-virar-quadrupling-project',
    category: 'Local',
    headline: 'Western Railway Approves ₹3,580 Cr Quadrupling of Dahanu-Virar Suburban Rail Corridor',
    subheadline: 'Major infrastructure push to segregate long-distance freight from suburban commuter trains, doubling peak-hour local services for Palghar district.',
    publishedAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    sourceCount: 7,
    readTimeMinutes: 3,
    isTrending: true,
    trendingScore: 89,
    growthRate: '+190% in 4h',
    relatedEntities: [
      { id: 'ent-virar', name: 'Virar', type: 'Location', slug: 'virar' },
      { id: 'ent-palghar', name: 'Palghar', type: 'Location', slug: 'palghar' },
      { id: 'ent-rail', name: 'Indian Railways', type: 'Company', slug: 'indian-railways' },
      { id: 'ent-mumbai', name: 'Mumbai MMR', type: 'Location', slug: 'mumbai' },
    ],
    location: { country: 'India', state: 'Maharashtra', district: 'Palghar', city: 'Virar' },
    aiSummary: {
      short: 'Western Railway has greenlit the final land acquisition and civil engineering tenders for 4-track segregation between Virar and Dahanu Road.',
      detailed: 'Commuters traveling on the congested Virar–Dahanu sector will experience long-sought relief as the Mumbai Railway Vikas Corporation (MRVC) and Western Railway finalize clearances for two dedicated suburban lines alongside existing mainline tracks. The ₹3,580-crore project will eliminate commuter delays caused by container freight bound for JNPT and express passenger trains, laying ground for 15-car suburban air-conditioned services every 8 minutes during peak hours.',
      keyFacts: [
        'Total budget allocated: ₹3,580 crore with 50:50 joint funding between Ministry of Railways and Maharashtra Government.',
        'Project spans 63 km from Virar to Dahanu Road across 7 suburban stations.',
        'Separates heavy freight traffic to dedicated western freight corridor crossovers.',
        'Anticipated to expand commuter carrying capacity from 1.2 lakh to over 4.5 lakh passengers daily.',
        'Target phase 1 completion set for Q4 2027.'
      ]
    },
    impact: {
      potentialLevel: 'HIGH',
      direction: 'Positive',
      confidence: 94,
      timeHorizon: 'Medium Term (3–12 months)',
      whyItMatters: 'Directly resolves severe peak-hour overcrowding for hundreds of thousands of daily office commuters connecting northern Palghar suburbs to central Mumbai employment hubs.',
      uncertaintyNotes: 'Land acquisition across 3 coastal village stretches and creek bridge piling during monsoon seasons remain operational risks to deadline compliance.',
      domains: [
        { name: 'Daily Commuters & Residents', level: 'CRITICAL', description: 'Drastically cuts crush-load hazards and wait times between Virar, Saphale, and Palghar.' },
        { name: 'Local Real Estate & Housing', level: 'HIGH', description: 'Boosts affordable housing development along the extended suburban periphery.' },
        { name: 'Industrial Logistics', level: 'HIGH', description: 'Streamlines industrial goods dispatch from Boisar MIDC toward national distribution centers.' },
        { name: 'Public Safety', level: 'HIGH', description: 'Eliminates footboard travel risks through higher train frequency.' }
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 96,
      lastCheckedAt: '15 minutes ago',
      consensus: [
        'Project sanction order, funding shares, and gazette notice verified through Western Railway public releases.',
        'Local civic authorities and MRVC project coordinators confirm tender award stages.'
      ],
      differences: [
        'Local activist statements express desire for expedited timeline, while official reports target late 2027.'
      ],
      unclear: [
        'Precise revised timetable for temporary Sunday mega-blocks during bridge girder launches.'
      ],
      claims: [
        {
          id: 'claim-rail-1',
          text: '₹3,580 Cr sanctioned for quadrupling Virar-Dahanu rail tracks.',
          status: 'Supported',
          confidence: 98,
          supportingSources: ['Western Railway PR', 'Mumbai Mirror', 'Loksatta'],
          notes: 'Official joint press release issued by MRVC.'
        }
      ]
    },
    sources: [
      {
        id: 'src-rail-1',
        name: 'Mumbai Mirror',
        domain: 'mumbaimirror.indiatimes.com',
        logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=64&auto=format&fit=crop&q=80',
        headline: 'Big boost for Virar-Dahanu commuters as 4-track work gains steam',
        publishedAt: '2h 20m ago',
        summary: 'Covers commuter association reactions, station redevelopment blueprints, and platform extension plans.',
        perspective: 'Regional Impact',
        originalUrl: 'https://mumbaimirror.indiatimes.com',
        credibilityScore: 90
      },
      {
        id: 'src-rail-2',
        name: 'Loksatta',
        domain: 'loksatta.com',
        logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=64&auto=format&fit=crop&q=80',
        headline: 'विरार-डहाणू चौपदरीकरणाला वेग; पालघर जिल्ह्यातील प्रवाशांना मोठा दिलासा',
        publishedAt: '3h ago',
        summary: 'Marathi daily report emphasizing suburban employment connectivity and local station amenity upgrades.',
        perspective: 'Regional Impact',
        originalUrl: 'https://loksatta.com/mumbai',
        credibilityScore: 92
      }
    ],
    timeline: [
      {
        id: 't-rail-1',
        timestamp: '09:00 IST',
        timeLabel: '09:00',
        title: 'Tender Approvals Signed',
        description: 'MRVC board signs execution framework with selected civil engineering joint venture.',
        sourceName: 'Western Railway'
      },
      {
        id: 't-rail-2',
        timestamp: '11:30 IST',
        timeLabel: '11:30',
        title: 'District Collector Review Meeting',
        description: 'Palghar district administration reviews land demarcation in Saphale and Kelve Road.',
        sourceName: 'Palghar Collectorate'
      }
    ],
    originalArticle: {
      publisher: 'Mumbai Mirror',
      url: 'https://mumbaimirror.indiatimes.com',
      note: 'Synthesized from rail administrative orders and verified civic sources.'
    }
  },
  {
    id: 'story-4',
    slug: 'isro-gaganyaan-cryogenic-engine-qualification',
    category: 'Science',
    headline: 'ISRO Successfully Qualifies Human-Rated CE-20 Cryogenic Engine for Gaganyaan Spaceflight',
    subheadline: 'Rigorous 720-second hot-fire test at Mahendragiri confirms engine safety margins under vacuum simulation and thermal extremes.',
    publishedAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    sourceCount: 16,
    readTimeMinutes: 4,
    isTrending: false,
    trendingScore: 78,
    growthRate: '+110% in 5h',
    relatedEntities: [
      { id: 'ent-isro', name: 'ISRO', type: 'Company', slug: 'isro' },
      { id: 'ent-gaganyaan', name: 'Gaganyaan Mission', type: 'Topic', slug: 'gaganyaan' },
      { id: 'ent-space', name: 'Space Exploration', type: 'Topic', slug: 'space-exploration' },
    ],
    location: { country: 'India', state: 'Tamil Nadu' },
    aiSummary: {
      short: 'India’s space agency has cleared the final human-rating milestones for the CE-20 cryogenic upper-stage engine powering the LVM3 crew rocket.',
      detailed: 'The Indian Space Research Organisation (ISRO) successfully concluded the qualification test series for its indigenous CE-20 cryogenic upper-stage engine. The engine performed flawlessly for a cumulative 720-second firing duration at the ISRO Propulsion Complex (IPRC) in Mahendragiri, exceeding mission duration specifications by 2.5 times. With this greenlight, ISRO clears the pathway for the uncrewed G1 orbital trial scheduled later this year.',
      keyFacts: [
        'CE-20 engine delivers 19 to 22 tonnes of thrust in upper-stage vacuum environment.',
        'Engine underwent 4 simulation restarts with higher chamber pressure tolerance.',
        'Final human-rating protocol mandates a 1.25 safety factor across all thermal turbopump sub-assemblies.',
        'Paves way for 3 uncrewed orbital tests prior to crewed astronaut insertion.'
      ]
    },
    impact: {
      potentialLevel: 'HIGH',
      direction: 'Positive',
      confidence: 95,
      timeHorizon: 'Immediate (0–7 days)',
      whyItMatters: 'Removes the primary technical risk factor in India’s indigenous human spaceflight mission, establishing sovereign crew-launch capabilities.',
      uncertaintyNotes: 'Environmental life-support systems (ECLSS) integration in the crew module will undergo separate parachute jettison drop trials.',
      domains: [
        { name: 'Aerospace & Defense Industry', level: 'HIGH', description: 'Validates Indian aerospace manufacturing precision with domestic suppliers (HAL, Godrej Aerospace).' },
        { name: 'Global Space Diplomacy', level: 'MEDIUM', description: 'Positions India as only the 4th nation with independent human space launch qualification.' },
        { name: 'Scientific Research', level: 'MEDIUM', description: 'Sets stage for low-earth orbit microgravity research access.' }
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 98,
      lastCheckedAt: '25 minutes ago',
      consensus: ['Telemetry data, test duration, and facility records verified by ISRO media release.'],
      differences: [],
      unclear: [],
      claims: [
        {
          id: 'claim-isro-1',
          text: 'CE-20 engine completed full-duration 720s human-rating qualification test.',
          status: 'Supported',
          confidence: 100,
          supportingSources: ['ISRO Bulletin', 'The Hindu', 'Nature Space'],
          notes: 'High-speed telemetry telemetry logs released publicly.'
        }
      ]
    },
    sources: [
      {
        id: 'src-isro-1',
        name: 'The Hindu',
        domain: 'thehindu.com',
        logo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=64&auto=format&fit=crop&q=80',
        headline: 'Gaganyaan leaps forward: ISRO qualifies CE-20 cryogenic engine for human flight',
        publishedAt: '3h 15m ago',
        summary: 'Comprehensive scientific review of engine performance and astronaut training milestones at Bengaluru facility.',
        perspective: 'Factual / Analytical',
        originalUrl: 'https://thehindu.com/sci-tech/science',
        credibilityScore: 95
      }
    ],
    timeline: [
      {
        id: 't-isro-1',
        timestamp: '14:30 IST',
        timeLabel: '14:30',
        title: 'Hot Fire Ignition at Mahendragiri Test Facility',
        description: 'Propulsion complex test bench initiates 720-second steady-state burn.',
        sourceName: 'ISRO Telemetry'
      }
    ],
    originalArticle: {
      publisher: 'The Hindu',
      url: 'https://thehindu.com',
      note: 'Verified against ISRO technical communications.'
    }
  },
  {
    id: 'story-5',
    slug: 'global-semiconductor-consortium-45b-packaging-hub-western-india',
    category: 'Business',
    headline: 'Global Semiconductor Alliance Finalizes $45 Billion Advanced Packaging Hub in Western India',
    subheadline: 'Multi-nation joint venture to manufacture 3D chiplet packaging and silicon photonics substrates, creating an estimated 35,000 high-tech engineering jobs.',
    publishedAt: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    sourceCount: 22,
    readTimeMinutes: 5,
    isTrending: true,
    trendingScore: 91,
    growthRate: '+210% in 4h',
    relatedEntities: [
      { id: 'ent-semi', name: 'Semiconductors', type: 'Topic', slug: 'semiconductors' },
      { id: 'ent-india', name: 'India', type: 'Location', slug: 'india' },
      { id: 'ent-tech', name: 'Hardware & Chips', type: 'Topic', slug: 'chips' },
    ],
    location: { country: 'India', state: 'Gujarat' },
    aiSummary: {
      short: 'A multinational semiconductor consortium has signed binding investment agreements for a $45B advanced chip packaging and testing mega-complex.',
      detailed: 'In one of the largest private-public industrial collaborations in Asian tech history, leaders from five semiconductor manufacturing powerhouses joined Indian union ministers to finalize capital commitments for an advanced packaging fab. Rather than focusing merely on legacy trailing nodes, the facility will specialize in 2.5D/3D chiplet interconnects, high-bandwidth memory (HBM) stacking, and silicon photonics needed for AI data centers worldwide.',
      keyFacts: [
        '$45 billion capital expenditure across two phases backed by central capital subsidy incentives.',
        'Focus on advanced backend fabrication: 3D wafer-level packaging and thermal dissipation substrates.',
        'Anticipated operational commencement of Phase 1 cleanrooms by late 2026.',
        'Reduces supply chain single-point reliance on East Asian packaging corridors for Western tech giants.'
      ]
    },
    impact: {
      potentialLevel: 'CRITICAL',
      direction: 'Positive',
      confidence: 88,
      timeHorizon: 'Long Term (1+ years)',
      whyItMatters: 'Fundamentally alters global technology geopolitics and hardware supply chain redundancy, cementing India’s role as an indispensable tier in the global AI hardware substrate ecosystem.',
      uncertaintyNotes: 'Clean-room continuous power stability and ultrapure chemical supply pipelines must meet stringent international purity standards during initial pilot trial yields.',
      domains: [
        { name: 'Global Supply Chains', level: 'CRITICAL', description: 'Provides crucial alternative packaging hub for North American and European fabless chip designers.' },
        { name: 'Indian Industrial Economy', level: 'HIGH', description: 'Catalyzes deep ancillary electronics component supplier clusters and engineering talent retention.' },
        { name: 'Hardware Costs', level: 'MEDIUM', description: 'Could ease packaging bottlenecks for next-generation AI accelerators.' }
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 94,
      lastCheckedAt: '18 minutes ago',
      consensus: ['All major business desks confirm signed memorandums of understanding and capital breakdown.'],
      differences: [],
      unclear: ['Exact water recycling quota allocation details await state environmental clearance boards.'],
      claims: [
        {
          id: 'claim-semi-1',
          text: '$45B advanced packaging fab signed in Western India with operational target by late 2026.',
          status: 'Supported',
          confidence: 92,
          supportingSources: ['Reuters', 'Economic Times', 'Nikkei Asia'],
          notes: 'Official signing ceremony telecast live with Union IT Ministry.'
        }
      ]
    },
    sources: [
      {
        id: 'src-semi-1',
        name: 'Economic Times',
        domain: 'economictimes.indiatimes.com',
        logo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=64&auto=format&fit=crop&q=80',
        headline: 'Historic $45B semiconductor packaging pact signed; Western India emerges as chiplet hub',
        publishedAt: '4h ago',
        summary: 'Details tax incentives, water infrastructure, power grids, and anchor customer commitments.',
        perspective: 'Industry / Commercial',
        originalUrl: 'https://economictimes.indiatimes.com',
        credibilityScore: 93
      }
    ],
    timeline: [
      {
        id: 't-semi-1',
        timestamp: '11:00 IST',
        timeLabel: '11:00',
        title: 'Cabinet Committee Clears Investment Package',
        description: 'Union cabinet approves production-linked incentives and capital subsidy allocations.',
        sourceName: 'PIB Release'
      }
    ],
    originalArticle: {
      publisher: 'Economic Times',
      url: 'https://economictimes.indiatimes.com',
      note: 'Verified from bilateral industrial communiques.'
    }
  },
  {
    id: 'story-6',
    slug: 'eu-ai-safety-act-compliance-window',
    category: 'Politics',
    headline: 'EU Enforces Landmark Algorithmic Accountability Act with Staggered Compliance Deadlines',
    subheadline: 'Regulators establish strict penalties of up to 7% of worldwide turnover for high-risk biometric scanning, generative copyright opacity, and automated credit scoring.',
    publishedAt: new Date(Date.now() - 410 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    sourceCount: 19,
    readTimeMinutes: 4,
    isTrending: false,
    trendingScore: 72,
    growthRate: '+85% in 6h',
    relatedEntities: [
      { id: 'ent-eu', name: 'European Union', type: 'Location', slug: 'eu' },
      { id: 'ent-ai', name: 'Artificial Intelligence', type: 'Topic', slug: 'ai' },
      { id: 'ent-reg', name: 'Tech Regulation', type: 'Topic', slug: 'tech-regulation' },
    ],
    location: { country: 'Belgium', city: 'Brussels' },
    aiSummary: {
      short: 'The European Union has activated enforceable compliance deadlines under its AI Act, putting multinational tech companies on strict audit schedules.',
      detailed: 'European Commission enforcement bodies today formally published the operational criteria for systemic risk evaluations governing foundational AI models. Providers operating in European markets will have 9 months to provide verifiable documentation of training data copyright audits, model watermarking, red-teaming resilience against cyberattacks, and systemic bias testing. Silicon Valley tech leaders have voiced caution regarding potential regulatory fragmentation.',
      keyFacts: [
        'Prohibits outright AI applications deemed unacceptable risk (e.g. social scoring, real-time facial recognition in public places).',
        'Imposes transparency reports for foundational models exceeding 10^25 FLOPs training compute.',
        'Fines reach maximum of €35 million or 7% of annual worldwide revenue, whichever is greater.',
        'EU AI Office established with a staff of 140 technical auditors and legal inspectors.'
      ]
    },
    impact: {
      potentialLevel: 'HIGH',
      direction: 'Mixed',
      confidence: 82,
      timeHorizon: 'Medium Term (3–12 months)',
      whyItMatters: 'Creates the de facto global compliance standard (the "Brussels Effect"), forcing software creators worldwide to adopt auditable development and training practices.',
      uncertaintyNotes: 'How open-source weights and decentralized developer collectives will be audited without stifling grassroots research remains a contested legal question.',
      domains: [
        { name: 'Tech Enterprises', level: 'HIGH', description: 'Substantially increases compliance legal overhead and European localization costs.' },
        { name: 'Consumer Privacy & Rights', level: 'HIGH', description: 'Strengthens user protection against undisclosed deepfakes and algorithmic bias.' },
        { name: 'Open-Source AI Communities', level: 'MEDIUM', description: 'Requires clear licensing documentation to qualify for regulatory exemptions.' }
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 95,
      lastCheckedAt: '30 minutes ago',
      consensus: ['Regulatory timelines and statutory fine ceilings match official EU Official Journal texts.'],
      differences: ['US outlets frame the development as risk to innovation; European outlets highlight consumer sovereignty.'],
      unclear: ['Exact technical definition of what constitutes a "general-purpose AI with systemic risk" will be finalized in upcoming guidance notes.'],
      claims: [
        {
          id: 'claim-eu-1',
          text: 'Fines can reach up to 7% of global annual revenue for serious non-compliance.',
          status: 'Supported',
          confidence: 100,
          supportingSources: ['European Commission Press', 'Politico', 'BBC News'],
          notes: 'Codified in Article 99 of the EU AI Act.'
        }
      ]
    },
    sources: [
      {
        id: 'src-eu-1',
        name: 'BBC News',
        domain: 'bbc.com',
        logo: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=64&auto=format&fit=crop&q=80',
        headline: 'European AI rules take effect: How your favourite apps could change',
        publishedAt: '5h ago',
        summary: 'Breaks down consumer transparency rights, biometric prohibitions, and child safety protocols.',
        perspective: 'Policy-focused',
        originalUrl: 'https://bbc.com/news/technology',
        credibilityScore: 96
      }
    ],
    timeline: [
      {
        id: 't-eu-1',
        timestamp: '09:00 CET',
        timeLabel: '09:00',
        title: 'Official Journal Gazette Enacted',
        description: 'Statutory clock begins for Tier 1 compliance milestones across EU member states.',
        sourceName: 'European Commission'
      }
    ],
    originalArticle: {
      publisher: 'BBC News',
      url: 'https://bbc.com',
      note: 'Verified against European Union legal statutes.'
    }
  }
];

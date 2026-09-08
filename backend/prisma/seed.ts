import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Clear existing data (optional but good for clean start)
  await prisma.readingHistory.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.userEntityFollow.deleteMany();
  await prisma.storyEntity.deleteMany();
  await prisma.entity.deleteMany();
  await prisma.claim.deleteMany();
  await prisma.storyVerification.deleteMany();
  await prisma.impactDomain.deleteMany();
  await prisma.storyImpact.deleteMany();
  await prisma.aiSummary.deleteMany();
  await prisma.storyTimelineEvent.deleteMany();
  await prisma.storySource.deleteMany();
  await prisma.story.deleteMany();
  await prisma.article.deleteMany();
  await prisma.source.deleteMany();
  await prisma.notificationPreference.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create User
  const user = await prisma.user.create({
    data: {
      id: 'usr-kaushal',
      email: 'kaushal80106@gmail.com',
      name: 'Kaushal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
      plan: 'Pro',
      profile: {
        create: {
          country: 'India',
          state: 'Maharashtra',
          district: 'Palghar',
          city: 'Virar',
const stories = [
  {
    category: 'Technology',
    headline: 'Quantum Supremacy Achieved by New Scalable Qubit Architecture',
    subheadline: 'Researchers have successfully stabilized 1,000 logical qubits at room temperature, shattering previous computational limits.',
    aiSummary: {
      short: 'A major breakthrough in quantum computing allows room-temperature stabilization of logical qubits.',
      detailed: 'A consortium of global research institutes has published a peer-reviewed paper detailing a novel diamond-lattice architecture. This allows quantum states to remain coherent without extreme cryogenic cooling. The development is expected to accelerate cryptography research and complex molecular simulations by a factor of 10,000 compared to classical supercomputers.',
      keyFacts: [
        '1,000 logical qubits stabilized for over 3 hours.',
        'Operates at room temperature (22°C).',
        'Bypasses the need for expensive liquid helium cooling infrastructure.'
      ]
    },
    verification: {
      status: 'Well corroborated',
      confidence: 95,
      consensus: [
        'The underlying physics paper has been validated by independent peer review.',
        'Initial benchmark tests have been reproduced by three separate laboratories.'
      ],
      differences: [
        'Some sources dispute the timeline for commercialization (estimates range from 3 to 10 years).'
      ],
      unclear: [
        'The exact manufacturing cost of the synthetic diamond lattice is currently unverified.'
      ]
    },
    impact: {
      potentialLevel: 'CRITICAL',
      direction: 'Positive',
      confidence: 90,
      timeHorizon: 'Long-term',
      whyItMatters: 'This fundamentally changes the economics of quantum computing, moving it from specialized billion-dollar facilities to commercially viable server racks within a decade.',
      domains: [
        {
          name: 'Cybersecurity',
          level: 'CRITICAL',
          description: 'Current RSA encryption methods will become obsolete much faster than initially projected.'
        },
        {
          name: 'Pharmaceuticals',
          level: 'HIGH',
          description: 'Drug discovery pipelines will experience massive acceleration via accurate protein folding simulations.'
        }
      },
      preferences: {
        create: {
          languages: ['English', 'Hindi', 'Marathi'],
          briefingTime: '07:30 AM',
          defaultFeed: 'for-you',
      ]
    }
  },
  {
    category: 'Finance',
    headline: 'Global Central Banks Announce Coordinated Digital Currency Framework',
    subheadline: 'The new "Inter-CBDC" protocol will allow instant, zero-fee cross-border settlements between 12 major economies.',
    aiSummary: {
      short: 'A coalition of 12 central banks has agreed on a unified framework for cross-border digital currency settlements.',
      detailed: 'In a landmark agreement at the Geneva Economic Summit, representatives from 12 major central banks unveiled a standardized protocol for Central Bank Digital Currencies (CBDCs). The framework bypasses traditional SWIFT networks, promising instant clearing and settlement times with zero transaction fees for enterprise trade.',
      keyFacts: [
        '12 countries, representing 60% of global GDP, are participating.',
        'Target launch for the pilot program is Q3 next year.',
        'Bypasses SWIFT, drastically reducing corporate settlement costs.'
      ]
    },
    verification: {
      status: 'Partially corroborated',
      confidence: 82,
      consensus: [
        'The technical framework documentation has been published.',
        'Signatories have confirmed their participation in the pilot program.'
      ],
      differences: [
        'Disagreements exist regarding the exact privacy controls and transaction monitoring thresholds.'
      ],
      unclear: [
        'Participation of several emerging market economies remains under negotiation.'
      ]
    },
    impact: {
      potentialLevel: 'HIGH',
      direction: 'Mixed',
      confidence: 88,
      timeHorizon: 'Short-term',
      whyItMatters: 'This represents the largest shift in international trade finance since the creation of the SWIFT network in the 1970s.',
      domains: [
        {
          name: 'International Trade',
          level: 'HIGH',
          description: 'Drastically lowers overhead costs for multinational corporations.'
        },
        {
          name: 'Traditional Banking',
          level: 'MEDIUM',
          description: 'Commercial banks may lose significant revenue streams from wire transfer fees.'
        }
      },
      notificationPrefs: {
        create: {
          breaking: true,
          important: true,
          following: true,
          local: true,
          dailyBrief: true,
        }
      }
      ]
    }
  });
  }
];

  // 3. Create Sources
  const srcReuters = await prisma.source.create({
    data: {
      id: 'src-1',
      name: 'Reuters',
      domain: 'reuters.com',
      logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=64&auto=format&fit=crop&q=80',
      credibilityScore: 96,
      status: 'Healthy'
    }
  });

  // 4. Create Entity
  const openaiEntity = await prisma.entity.create({
    data: {
      id: 'ent-openai',
      slug: 'openai',
      name: 'OpenAI',
      type: 'Company',
      followersCount: 15400,
    }
  });

  // 5. Create Story
  const story = await prisma.story.create({
    data: {
      id: 'story-1',
      slug: 'openai-next-gen-autonomous-reasoning-engine',
      category: 'Technology',
      headline: 'OpenAI Unveils Next-Gen Autonomous Reasoning Engine',
      subheadline: 'The frontier architecture shifts from simple token prediction to iterative self-verification chains.',
      publishedAt: new Date(),
      readTimeMinutes: 4,
      isTrending: true,
      trendingScore: 98,
      aiSummary: {
        create: {
          short: 'OpenAI has released a new frontier reasoning engine.',
          detailed: 'In a coordinated developer keynote and technical whitepaper release, OpenAI detailed an advanced cognitive architecture designed to deliberate before generating tokens.',
          keyFacts: [
            'Introduces dynamic test-time computation.',
            'Reduces hallucination frequency by 40%.'
          ]
        }
      },
      impact: {
        create: {
          potentialLevel: 'HIGH',
          direction: 'Positive',
          confidence: 84,
          timeHorizon: 'Short Term (1-3 months)',
          whyItMatters: 'This marks an architectural inflection point from static conversational chatbots to multi-stage autonomous agents.',
          domains: {
            create: [
              { name: 'Software Developers', level: 'HIGH', description: 'Reduces manual debugging for multi-file codebases.' }
            ]
async function main() {
  console.log('Seeding new stories...');
  for (const s of stories) {
    await prisma.story.create({
      data: {
        slug: `story-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        category: s.category,
        headline: s.headline,
        subheadline: s.subheadline,
        publishedAt: new Date(),
        isTrending: true,
        trendingScore: Math.floor(Math.random() * 20) + 80,
        
        aiSummary: {
          create: {
            short: s.aiSummary.short,
            detailed: s.aiSummary.detailed,
            keyFacts: s.aiSummary.keyFacts
          }
        }
      },
      verification: {
        create: {
          status: 'Well corroborated',
          confidence: 91,
          consensus: ['All major outlets corroborate model release date.'],
          differences: ['TechCrunch emphasizes developer ecosystem lock-in.'],
          unclear: ['Exact hardware cluster configurations.'],
          claims: {
            create: [
              {
                text: 'OpenAI released an autonomous reasoning model.',
                status: 'Supported',
                confidence: 98,
                supportingSources: ['Reuters', 'TechCrunch']
              }
            ]
        },
        impact: {
          create: {
            potentialLevel: s.impact.potentialLevel,
            direction: s.impact.direction,
            confidence: s.impact.confidence,
            timeHorizon: s.impact.timeHorizon,
            whyItMatters: s.impact.whyItMatters,
            domains: {
              create: s.impact.domains
            }
          }
        },
        verification: {
          create: {
            status: s.verification.status,
            confidence: s.verification.confidence,
            consensus: s.verification.consensus,
            differences: s.verification.differences,
            unclear: s.verification.unclear
          }
        }
      },
      timeline: {
        create: [
          {
            timestamp: '08:00 UTC',
            timeLabel: '08:00',
            title: 'Developer Teaser Disclosed',
            description: 'OpenAI leadership posts cryptic preview notes.',
            sourceName: 'X / Social Broadcast'
          }
        ]
      }
    }
  });

  // Link story and source
  await prisma.storySource.create({
    data: { storyId: story.id, sourceId: srcReuters.id }
  });

  // Link story and entity
  await prisma.storyEntity.create({
    data: { storyId: story.id, entityId: openaiEntity.id }
  });

  console.log('Seeding completed successfully!');
    });
  }
  
  console.log('Database seeded perfectly!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


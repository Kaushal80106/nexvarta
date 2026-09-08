import { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Search, 
  Bot, 
  ChevronRight,
  Sun,
  Filter,
  Check
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PipelineAnimation } from '../intelligence/PipelineAnimation';
import { TrustBadge } from '../intelligence/TrustBadge';

const languages = [
  { name: 'English', native: 'English' },
  { name: 'Hindi', native: 'हिन्दी' },
  { name: 'Marathi', native: 'मराठी' },
  { name: 'Gujarati', native: 'ગુજરાતી' },
  { name: 'Tamil', native: 'தமிழ்' },
  { name: 'Telugu', native: 'తెలుగు' },
  { name: 'Bengali', native: 'বাংলা' },
  { name: 'Kannada', native: 'ಕನ್ನಡ' },
  { name: 'Malayalam', native: 'മലയാളം' },
  { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export function LandingView() {
  const { navigate, setSelectedLanguage, selectedLanguage } = useAppStore();
  const [activeTabSummary, setActiveTabSummary] = useState<'after' | 'before'>('after');
  const [testPrompt, setTestPrompt] = useState('Why is this important?');
  const [testResponse, setTestResponse] = useState(
    'This development marks a structural shift: rather than predicting the next likely word, autonomous self-verification eliminates 40% of reasoning errors, shifting AI from casual chat into accountable enterprise code and financial workflows.'
  );

  const handlePromptSelect = (prompt: string) => {
    setTestPrompt(prompt);
    if (prompt.includes('important')) {
      setTestResponse('This development marks a structural shift: rather than predicting the next likely word, autonomous self-verification eliminates 40% of reasoning errors, shifting AI from casual chat into accountable enterprise workflows.');
    } else if (prompt.includes('simply')) {
      setTestResponse('Imagine an AI that "double-checks its math on scratch paper" before giving you the final answer. That is test-time compute.');
    } else if (prompt.includes('India')) {
      setTestResponse('Indian IT consulting firms (TCS, Infosys, Wipro) are initiating pilot programs to deploy self-verifying code generation across legacy banking modernizations.');
    } else {
      setTestResponse('Tech outlets laud benchmark performance; economic analysts highlight the 2.4x higher compute cost and data center grid demands.');
    }
  };

  return (
    <div className="bg-[#080B12] text-[#F8FAFC] min-h-screen">
      {/* Top Marketing Nav */}
      <nav className="border-b border-[#252B38] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#080B12]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#7C5CFF] flex items-center justify-center font-mono font-bold text-white shadow-[0_0_20px_rgba(124,92,255,0.4)]">
            N
          </div>
          <span className="font-mono font-extrabold text-base tracking-wider text-white">
            NEXVARTA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#verification" className="hover:text-white transition-colors">Verification</a>
          <a href="#impact" className="hover:text-white transition-colors">Impact AI</a>
          <a href="#hyperlocal" className="hover:text-white transition-colors">Hyperlocal</a>
          <button onClick={() => navigate('pricing')} className="hover:text-white transition-colors">Pricing</button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('auth')}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('home')}
            className="px-4 py-2 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(124,92,255,0.3)] flex items-center gap-1.5"
          >
            <span>Open Intelligence Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-16 sm:pt-24 pb-20 max-w-6xl mx-auto text-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7C5CFF]/10 blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10141D] border border-[#7C5CFF]/40 text-[#A78BFA] text-xs font-mono mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Perplexity × Bloomberg × Linear Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
          Thousands of stories.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            One intelligent view.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          NexVarta aggregates hundreds of global and local news wires, clusters duplicate coverage into unified stories, extracts empirical claims, and predicts real-world impact.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={() => navigate('onboarding')}
            className="px-6 py-3.5 rounded-xl bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(124,92,255,0.4)] flex items-center gap-2"
          >
            <span>Explore NexVarta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#how-it-works"
            className="px-6 py-3.5 rounded-xl bg-[#10141D] hover:bg-[#171C27] border border-[#252B38] text-slate-200 font-semibold text-sm transition-colors"
          >
            See How It Works
          </a>
        </div>

        {/* 7-Stage Intelligence Engine Pipeline Component */}
        <div id="how-it-works" className="mt-8 text-left">
          <PipelineAnimation />
        </div>
      </section>

      {/* Section 1: Problem */}
      <section className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#080B12]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] mb-2 font-semibold">
            THE INFORMATIONAL CRISIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            "News is everywhere. Understanding it is not."
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Readers drown in repetitive headlines, partisan spin, clickbait incentives, and fragmented bulletins. Traditional news shows you what happened 5 minutes ago—NexVarta explains why it matters, who it affects, and what will happen next.
          </p>
        </div>
      </section>

      {/* Section 2: How NexVarta Works */}
      <section className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#10141D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C5CFF] mb-2 font-semibold">
              CORE PARADIGM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              DISCOVER → UNDERSTAND → VERIFY → PREDICT → DECIDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: '1. DISCOVER', desc: '1,800+ wires ingested per minute across Reuters, BBC, The Hindu, local civic notices.' },
              { title: '2. UNDERSTAND', desc: 'Clusters 20+ duplicate articles into 1 coherent, multi-tier executive brief.' },
              { title: '3. VERIFY', desc: 'Extracts empirical claims and tags evidence: Well-corroborated vs Disputed.' },
              { title: '4. PREDICT', desc: 'Probabilistic modeling across sectors: Immediate, short-term, and 1+ year horizons.' },
              { title: '5. DECIDE', desc: 'Empowers investors, engineers, and citizens to act on signal rather than noise.' },
            ].map((step, i) => (
              <div key={i} className="bg-[#171C27] border border-[#252B38] rounded-xl p-5">
                <div className="text-sm font-mono font-bold text-[#7C5CFF] mb-2">{step.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 & 4: AI Summaries & Story Clustering */}
      <section className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#080B12]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] mb-2 font-semibold">
                STORY CLUSTERING & DISTILLATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                20 repetitive articles collapsed into 1 structured dossier.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Stop reading the same press release rewrites across seven different websites. NexVarta identifies duplicate reporting, cross-references quotes, and generates a structured summary with verifiable facts.
              </p>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTabSummary('after')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    activeTabSummary === 'after'
                      ? 'bg-[#7C5CFF] text-white'
                      : 'bg-[#171C27] text-slate-400 hover:text-white'
                  }`}
                >
                  NexVarta AI View (After)
                </button>
                <button
                  onClick={() => setActiveTabSummary('before')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    activeTabSummary === 'before'
                      ? 'bg-[#7C5CFF] text-white'
                      : 'bg-[#171C27] text-slate-400 hover:text-white'
                  }`}
                >
                  Standard Feed Noise (Before)
                </button>
              </div>
            </div>

            {/* Interactive Before/After Card */}
            <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-6 shadow-xl relative">
              {activeTabSummary === 'after' ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <TrustBadge type="AI_SUMMARY" subtext="Distilled from 18 sources" />
                    <span className="text-xs font-mono text-emerald-400">91% Confidence</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    OpenAI Unveils Next-Gen Autonomous Reasoning Engine
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3 bg-[#171C27] p-3 rounded-lg border border-[#252B38]">
                    Dynamic test-time compute validates intermediate steps, reducing hallucination by 40% across STEM and software benchmarks.
                  </p>
                  <div className="text-[11px] font-mono text-[#22D3EE] space-y-1">
                    <div>✓ Corroborated by Reuters, Bloomberg, TechCrunch</div>
                    <div>✓ Impact: HIGH on Developers & Cloud Data Centers</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 opacity-75">
                  <div className="bg-[#171C27] p-3 rounded border border-rose-500/20 text-xs">
                    <div className="text-slate-400 font-mono text-[10px]">Article 1 (Wire A)</div>
                    <div className="text-slate-200">"BREAKING: AI company launches shocking new product..."</div>
                  </div>
                  <div className="bg-[#171C27] p-3 rounded border border-rose-500/20 text-xs">
                    <div className="text-slate-400 font-mono text-[10px]">Article 2 (Wire B)</div>
                    <div className="text-slate-200">"Is this the end of coders? Everything we know about the announcement..."</div>
                  </div>
                  <div className="bg-[#171C27] p-3 rounded border border-rose-500/20 text-xs">
                    <div className="text-slate-400 font-mono text-[10px]">Article 3 (Wire C)</div>
                    <div className="text-slate-200">"Sam Altman tweets mysterious symbol ahead of keynote..."</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 & 6: Source Verification & Impact Intelligence Preview */}
      <section id="verification" className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#10141D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C5CFF] mb-2 font-semibold">
              PREDICTIVE RISK & OPPORTUNITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ✦ IMPACT INTELLIGENCE
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Every major story contains an empirical model of who is affected, directionality, and temporal horizon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#171C27] border border-[#252B38] rounded-xl p-5 text-center">
              <div className="text-xs font-mono text-slate-400 mb-1">POTENTIAL IMPACT</div>
              <div className="text-2xl font-mono font-bold text-rose-400">HIGH</div>
              <div className="text-[11px] text-slate-400 mt-1">Structural shift</div>
            </div>

            <div className="bg-[#171C27] border border-[#252B38] rounded-xl p-5 text-center">
              <div className="text-xs font-mono text-slate-400 mb-1">DIRECTION</div>
              <div className="text-2xl font-mono font-bold text-emerald-400">Positive</div>
              <div className="text-[11px] text-slate-400 mt-1">Net ecosystem benefit</div>
            </div>

            <div className="bg-[#171C27] border border-[#252B38] rounded-xl p-5 text-center">
              <div className="text-xs font-mono text-slate-400 mb-1">EMPIRICAL CONFIDENCE</div>
              <div className="text-2xl font-mono font-bold text-[#22D3EE]">82%</div>
              <div className="text-[11px] text-slate-400 mt-1">18 verified sources</div>
            </div>

            <div className="bg-[#171C27] border border-[#252B38] rounded-xl p-5 text-center">
              <div className="text-xs font-mono text-slate-400 mb-1">TIME HORIZON</div>
              <div className="text-2xl font-mono font-bold text-amber-400">1–3 Months</div>
              <div className="text-[11px] text-slate-400 mt-1">Short-term integration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 & 8: Personalized & Hyperlocal News */}
      <section id="hyperlocal" className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#080B12]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] mb-2 font-semibold">
                PRECISION GEOGRAPHY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Country → State → District → City
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Global macro moves only tell half the story. NexVarta isolates local administrative decisions, municipal transit expansions (like the Virar-Dahanu 4-track project in Palghar), and environmental advisories down to your municipal ward.
              </p>

              <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#22D3EE]" />
                  <span>Configured Location Stack:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-white">
                  <span className="bg-[#171C27] px-2.5 py-1 rounded border border-[#252B38]">India</span>
                  <span className="text-slate-500">→</span>
                  <span className="bg-[#171C27] px-2.5 py-1 rounded border border-[#252B38]">Maharashtra</span>
                  <span className="text-slate-500">→</span>
                  <span className="bg-[#171C27] px-2.5 py-1 rounded border border-[#252B38]">Palghar</span>
                  <span className="text-slate-500">→</span>
                  <span className="bg-[#7C5CFF]/20 text-[#7C5CFF] font-bold px-2.5 py-1 rounded border border-[#7C5CFF]/40">Virar</span>
                </div>
              </div>
            </div>

            <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#252B38] pb-2">
                <span className="text-[#22D3EE] font-bold">HYPERLOCAL DISPATCH (PALGHAR / VIRAR)</span>
                <span className="text-slate-400">2h ago</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Western Railway Approves ₹3,580 Cr Quadrupling of Dahanu-Virar Suburban Rail Corridor
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated suburban lines will decouple freight from passenger trains, doubling peak-hour frequencies for 450,000 daily commuters.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-[#252B38]">
                ✓ Verified via Western Railway PR & Mumbai Mirror
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: AI News Assistant Showcase */}
      <section className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#10141D]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C5CFF] mb-2 font-semibold">
              CONVERSATIONAL RESEARCH
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              AI News Assistant
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Ask deep questions about any story in your feed.
            </p>
          </div>

          <div className="bg-[#171C27] border border-[#252B38] rounded-xl p-5 shadow-2xl">
            {/* Suggested Prompt Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                'Why is this important?',
                'Explain this simply.',
                'What does this mean for India?',
                'What are both sides saying?'
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePromptSelect(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    testPrompt === p
                      ? 'bg-[#7C5CFF] text-white font-semibold'
                      : 'bg-[#10141D] text-slate-300 hover:text-white border border-[#252B38]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Simulated chat container */}
            <div className="space-y-3 text-xs">
              <div className="bg-[#10141D] p-3 rounded-lg border border-[#252B38] text-slate-200">
                <span className="font-mono text-[10px] text-slate-500 block mb-1">USER QUERY:</span>
                "{testPrompt}"
              </div>

              <div className="bg-[#10141D] p-4 rounded-lg border border-[#7C5CFF]/30 text-slate-200">
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#A78BFA] mb-2">
                  <Bot className="w-3.5 h-3.5 text-[#7C5CFF]" />
                  <span>NEXVARTA AI SYNTHESIS (GROUNDED IN 18 OUTLETS):</span>
                </div>
                <p className="leading-relaxed text-slate-100">{testResponse}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 & 11: Multilingual News */}
      <section className="border-t border-[#252B38] py-20 px-4 sm:px-6 bg-[#080B12]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] mb-2 font-semibold">
            INCLUSIVE INTELLIGENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Multilingual News Across 10 Languages
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
            Access synthesized intelligence in your mother tongue without losing nuance, technical accuracy, or context.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {languages.map((l) => (
              <button
                key={l.name}
                onClick={() => {
                  setSelectedLanguage(l.name);
                  navigate('home');
                }}
                className={`p-3 rounded-lg border transition-all text-center ${
                  selectedLanguage === l.name
                    ? 'bg-[#7C5CFF]/20 border-[#7C5CFF] text-white'
                    : 'bg-[#10141D] border-[#252B38] text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="font-bold text-sm">{l.name}</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{l.native}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Final Call To Action */}
      <section className="border-t border-[#252B38] py-24 px-4 sm:px-6 bg-gradient-to-b from-[#10141D] to-[#080B12] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Stop scrolling through news.<br />
            <span className="text-[#7C5CFF]">Start understanding it.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
            Join thousands of analysts, founders, executives, and curious minds who experience news through intelligence, not noise.
          </p>
          <button
            onClick={() => navigate('home')}
            className="px-8 py-4 rounded-xl bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(124,92,255,0.4)] inline-flex items-center gap-2"
          >
            <span>Launch NexVarta Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Global Marketing Footer */}
      <footer className="border-t border-[#252B38] py-12 px-6 bg-[#080B12] text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#7C5CFF] flex items-center justify-center text-white font-bold text-xs">
              N
            </div>
            <span className="font-bold text-white">NEXVARTA</span>
            <span>— AI News Intelligence Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => navigate('pricing')} className="hover:text-white">Pricing</button>
            <button onClick={() => navigate('help')} className="hover:text-white">Help Center</button>
            <button onClick={() => navigate('admin')} className="hover:text-white">Admin</button>
            <button onClick={() => navigate('settings')} className="hover:text-white">Privacy & Terms</button>
          </div>

          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} NexVarta Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

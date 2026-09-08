import { useState } from 'react';
import { Check, Sparkles, Shield, Zap, HelpCircle, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { showToast } from '../../store/useAppStore';

export function PricingView() {
  const { user, navigate } = useAppStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const handleSelectPlan = (planName: string) => {
    showToast(`Subscribed to NexVarta ${planName} Plan!`);
    navigate('home');
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#A78BFA] text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>TRANSPARENT, SIGNAL-FIRST INTELLIGENCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Invest in Clarity, Not Clickbait
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Choose the tier that powers your strategic decisions, research workflows, and market awareness.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className={`text-xs font-mono ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-11 h-6 bg-[#171C27] border border-[#252B38] rounded-full p-1 transition-colors relative"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#7C5CFF] transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-mono flex items-center gap-1 ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-slate-400'}`}>
            <span>Yearly</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-500/20">20% OFF</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Free */}
        <div className="bg-[#10141D] border border-[#252B38] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
              FREE TIER
            </div>
            <div className="text-3xl font-extrabold text-white mb-2">₹0</div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Essential news aggregation, basic clustering, and daily top stories.
            </p>

            <ul className="space-y-3 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Basic AI Story Summaries</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>3 Clustered Sources per story</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Hyperlocal city news feed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Standard Daily Briefing</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Free')}
            className="w-full mt-8 py-2.5 rounded-xl bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-xs font-semibold text-white transition-colors"
          >
            Current Plan
          </button>
        </div>

        {/* Tier 2: Pro Intelligence */}
        <div className="bg-[#10141D] border-2 border-[#7C5CFF] rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(124,92,255,0.2)]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7C5CFF] text-[10px] font-mono font-bold text-white uppercase tracking-wider">
            Most Popular
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#7C5CFF] font-bold mb-1">
              PRO INTELLIGENCE
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">
              {billingCycle === 'yearly' ? '₹799' : '₹999'}
              <span className="text-xs font-normal text-slate-400 font-mono"> / month</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Full access to predictive impact modeling, claim audit, and conversational assistant.
            </p>

            <ul className="space-y-3 text-xs font-mono text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C5CFF]" />
                <span><strong>Impact Intelligence</strong> (Severity, Horizon, Confidence)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C5CFF]" />
                <span><strong>Source Verification & Claim Audit</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C5CFF]" />
                <span>Unlimited <strong>Ask NexVarta AI</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C5CFF]" />
                <span>AI Neural Audio Daily Briefings</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C5CFF]" />
                <span>Ad-free, zero-tracker guarantee</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Pro')}
            className="w-full mt-8 py-3 rounded-xl bg-[#7C5CFF] hover:bg-[#6D4AEF] text-xs font-bold text-white transition-all shadow-[0_0_20px_rgba(124,92,255,0.4)]"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="bg-[#10141D] border border-[#252B38] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#22D3EE] font-bold mb-1">
              ENTERPRISE & DESK
            </div>
            <div className="text-3xl font-extrabold text-white mb-2">₹4,999<span className="text-xs font-normal text-slate-400 font-mono"> / seat</span></div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              API webhooks, custom RSS feeds, enterprise compliance, and export tools for research desks.
            </p>

            <ul className="space-y-3 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22D3EE]" />
                <span>Webhook stream for Bloomberg/Refinitiv</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22D3EE]" />
                <span>Custom company dossier exports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22D3EE]" />
                <span>Dedicated SLA & editorial auditor access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Enterprise')}
            className="w-full mt-8 py-2.5 rounded-xl bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-xs font-semibold text-white transition-colors"
          >
            Contact Desk Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export function HelpCenterView() {
  const { setKeyboardShortcutsOpen } = useAppStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does NexVarta verify news stories?',
      a: 'NexVarta uses a multi-source consensus algorithm. We ingest reporting from over 1,800 registered wires, isolate factual assertions, cross-reference them against government gazettes, regulatory filings (like RBI circulars), and peer reporting. If claims diverge, we flag them as "Disputed".'
    },
    {
      q: 'Does NexVarta replace original journalism?',
      a: 'No. NexVarta produces synthetic intelligence briefs, timelines, and impact projections. We explicitly link back to original publishers (Reuters, The Hindu, Indian Express, BBC) and do not republish copyrighted full-text articles.'
    },
    {
      q: 'How does the Hyperlocal geography hierarchy work?',
      a: 'You can configure your location down to Country → State → District → City (e.g. India → Maharashtra → Palghar → Virar). Our engine filters municipal notices, local transport updates, and regional infrastructure projects.'
    },
    {
      q: 'Can I change the languages of the stories?',
      a: 'Yes! NexVarta supports 10 languages: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali, Kannada, Malayalam, and Punjabi. Switch your language anytime using the globe icon in the top header.'
    }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="border-b border-[#252B38] pb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#22D3EE]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Help & Platform Transparency
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Everything you need to know about our verification models, shortcuts, and editorial principles.
        </p>
      </div>

      {/* Keyboard Shortcuts Trigger Card */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-mono font-bold text-white">KEYBOARD SHORTCUTS CHEATSHEET</h4>
          <p className="text-xs text-slate-400 mt-0.5">Press '?' or 'Ctrl+K' anytime to navigate at lightning speed.</p>
        </div>
        <button
          onClick={() => setKeyboardShortcutsOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-xs font-mono text-white transition-colors"
        >
          View Shortcuts
        </button>
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          FREQUENTLY ASKED QUESTIONS
        </h3>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 cursor-pointer"
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
          >
            <div className="text-sm font-semibold text-white flex items-center justify-between">
              <span>{faq.q}</span>
              <span className="font-mono text-slate-400">{openFaq === idx ? '−' : '+'}</span>
            </div>
            {openFaq === idx && (
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed pt-2.5 border-t border-[#252B38]">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

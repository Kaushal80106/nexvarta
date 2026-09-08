import { ExternalLink, CheckCircle2, AlertCircle, HelpCircle, Layers } from 'lucide-react';
import { Source, StoryVerification } from '../../types';

interface SourceComparisonProps {
  sources: Source[];
  verification: StoryVerification;
}

export function SourceComparison({ sources, verification }: SourceComparisonProps) {
  return (
    <section className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#252B38]">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#22D3EE]" />
          <h3 className="text-lg font-bold font-mono tracking-tight text-white">
            SOURCE COMPARISON & MULTI-ANGLE COVERAGE
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-[#171C27] px-2.5 py-1 rounded border border-[#252B38]">
          {sources.length} Independent Newsrooms Compared
        </span>
      </div>

      {/* Consensus, Differences, Unclear Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Consensus */}
        <div className="bg-[#171C27]/70 border border-emerald-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>What All Sources Agree On</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {verification.consensus.map((point, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Differences */}
        <div className="bg-[#171C27]/70 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Where Perspectives Differ</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {verification.differences.map((point, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What is still unclear */}
        <div className="bg-[#171C27]/70 border border-[#252B38] rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#22D3EE] uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-4 h-4 text-[#22D3EE]" />
            <span>What is Still Unclear / Pending</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {verification.unclear.length > 0 ? (
              verification.unclear.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#22D3EE] font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">No significant factual ambiguities remain unresolved at this time.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Individual Source Breakdown Cards */}
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
        Clustered Coverage Outlets
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {sources.map((src) => (
          <div 
            key={src.id}
            className="bg-[#171C27] border border-[#252B38] hover:border-slate-600 rounded-lg p-4 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{src.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">({src.domain})</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {src.credibilityScore}/100 Trust
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-200 mb-2 line-clamp-2">
                "{src.headline}"
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {src.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-[#252B38] text-[11px] font-mono">
              <span className="text-[#A78BFA] bg-[#7C5CFF]/10 px-2 py-0.5 rounded border border-[#7C5CFF]/20">
                Angle: {src.perspective}
              </span>
              <a
                href={src.originalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#22D3EE] hover:underline inline-flex items-center gap-1"
              >
                <span>Read Original</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

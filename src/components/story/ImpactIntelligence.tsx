import { StoryImpact } from '../../types';
import { Sparkles, Clock, AlertTriangle } from 'lucide-react';

export function ImpactIntelligence({ impact }: { impact: StoryImpact }) {
  const getLevelColor = (lvl: string) => {
    switch (lvl) {
      case 'CRITICAL':
      case 'HIGH':
        return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      case 'MEDIUM':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
    }
  };

  const getBarPercent = (lvl: string) => {
    switch (lvl) {
      case 'CRITICAL': return 100;
      case 'HIGH': return 80;
      case 'MEDIUM': return 50;
      default: return 25;
    }
  };

  const getBarColor = (lvl: string) => {
    switch (lvl) {
      case 'CRITICAL':
      case 'HIGH': return 'bg-rose-400';
      case 'MEDIUM': return 'bg-amber-400';
      default: return 'bg-emerald-400';
    }
  };

  return (
    <section className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-48 h-24 bg-[#7C5CFF]/5 blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#252B38]">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-4 h-4 text-[#7C5CFF] shrink-0" />
          <h3 className="text-sm font-bold font-mono tracking-tight text-white truncate">
            IMPACT INTELLIGENCE
          </h3>
          <span className="shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-[#7C5CFF]/40 text-[#A78BFA] bg-[#7C5CFF]/10">
            PREDICTION
          </span>
        </div>
      </div>

      {/* Horizon */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-4">
        <Clock className="w-3 h-3 text-[#22D3EE] shrink-0" />
        <span>Horizon: <strong className="text-slate-200">{impact.timeHorizon}</strong></span>
      </div>

      {/* 3 Metrics — stacked vertically so they never overflow */}
      <div className="space-y-2 mb-5">
        {/* Potential Impact */}
        <div className="bg-[#171C27] border border-[#252B38] rounded-lg px-3 py-2.5 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Impact</span>
          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${getLevelColor(impact.potentialLevel)}`}>
            {impact.potentialLevel}
          </span>
        </div>

        {/* Directionality */}
        <div className="bg-[#171C27] border border-[#252B38] rounded-lg px-3 py-2.5 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Direction</span>
          <span className="text-xs font-bold font-mono text-emerald-400">{impact.direction}</span>
        </div>

        {/* Confidence */}
        <div className="bg-[#171C27] border border-[#252B38] rounded-lg px-3 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Confidence</span>
            <span className="text-xs font-bold font-mono text-[#22D3EE]">{impact.confidence}%</span>
          </div>
          <div className="w-full bg-[#252B38] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#22D3EE] h-full rounded-full transition-all duration-500"
              style={{ width: `${impact.confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Domain Impact Matrix */}
      <div className="mb-4">
        <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
          Domain Impact
        </h4>
        <div className="space-y-2">
          {impact.domains.map((domain) => (
            <div
              key={domain.name}
              className="bg-[#171C27]/70 border border-[#252B38] rounded-lg p-3"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-white truncate">{domain.name}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${getLevelColor(domain.level)}`}>
                  {domain.level}
                </span>
              </div>
              <div className="w-full bg-[#252B38] h-1 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${getBarColor(domain.level)}`}
                  style={{ width: `${getBarPercent(domain.level)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Matters */}
      <div className="bg-[#171C27]/90 border border-[#7C5CFF]/30 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A78BFA] mb-1.5">
          <Sparkles className="w-3 h-3 text-[#7C5CFF] shrink-0" />
          <span>Why This Matters</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {impact.whyItMatters}
        </p>
      </div>

      {/* Uncertainty Note */}
      {impact.uncertaintyNotes && (
        <div className="bg-[#080B12] border border-[#252B38] rounded-lg p-3 flex items-start gap-2 text-[11px] text-slate-400">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300 font-mono">Uncertainty: </strong>
            {impact.uncertaintyNotes}
          </p>
        </div>
      )}
    </section>
  );
}

import { useState, useEffect } from 'react';
import { Layers, Filter, Network, FileText, CheckCircle2, TrendingUp, UserCheck, Play, Pause } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  sub: string;
  icon: any;
  metric: string;
}

const stages: Stage[] = [
  { id: 'ingest', name: 'INGEST', sub: '1,840/min from 500+ wires', icon: Layers, metric: '99.8% reach' },
  { id: 'normalize', name: 'NORMALIZE', sub: 'Format & metadata clean', icon: Filter, metric: '85ms avg' },
  { id: 'cluster', name: 'CLUSTER', sub: 'Duplicate stories merged', icon: Network, metric: '20 → 1 story' },
  { id: 'summarize', name: 'SUMMARIZE', sub: 'Frontier AI distillation', icon: FileText, metric: '3-tier depth' },
  { id: 'verify', name: 'VERIFY', sub: 'Cross-claim validation', icon: CheckCircle2, metric: 'Multi-outlet check' },
  { id: 'impact', name: 'IMPACT', sub: 'Probabilistic modeling', icon: TrendingUp, metric: 'Confidence index' },
  { id: 'personalize', name: 'PERSONALIZE', sub: 'Hyperlocal & topic routing', icon: UserCheck, metric: '1:1 feed match' },
];

export function PipelineAnimation({ compact = false }: { compact?: boolean }) {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full bg-[#10141D] border border-[#252B38] rounded-xl p-4 sm:p-5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-[#7C5CFF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-32 bg-[#22D3EE]/5 blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 border-b border-[#252B38] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-ping" />
          <span className="text-xs font-mono tracking-wider font-semibold uppercase text-slate-300">
            NexVarta Intelligence Engine (7-Stage Live Pipeline)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded border border-[#22D3EE]/20 hidden sm:inline-block">
            ACTIVE STAGE: {stages[activeStage].name}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded bg-[#171C27] hover:bg-[#252B38] text-slate-400 hover:text-white transition-colors"
            title={isPlaying ? 'Pause pipeline simulation' : 'Play pipeline simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Grid or Horizontal flow */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 relative`}>
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeStage;
          const isPassed = idx < activeStage;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`cursor-pointer rounded-lg p-3 transition-all duration-300 border relative ${
                isActive
                  ? 'bg-[#171C27] border-[#7C5CFF] shadow-[0_0_15px_rgba(124,92,255,0.2)]'
                  : isPassed
                  ? 'bg-[#10141D] border-[#252B38]/80 text-slate-400'
                  : 'bg-[#080B12]/60 border-[#252B38]/40 text-slate-500'
              }`}
            >
              {/* Connector dot for desktop */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-[#252B38]" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#7C5CFF]' : 'text-slate-500'}`}>
                  0{idx + 1}
                </span>
                <div className={`p-1.5 rounded ${isActive ? 'bg-[#7C5CFF]/20 text-[#7C5CFF]' : 'bg-[#171C27] text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="text-xs font-bold font-mono tracking-wide text-[#F8FAFC]">
                {stage.name}
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-tight mt-1 line-clamp-2">
                {stage.sub}
              </p>

              <div className="mt-2.5 pt-2 border-t border-[#252B38]/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">Stat</span>
                <span className={isActive ? 'text-[#22D3EE]' : 'text-slate-400'}>{stage.metric}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

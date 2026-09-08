export type TrustType = 'FACT' | 'AI_SUMMARY' | 'VERIFIED' | 'ANALYSIS' | 'PREDICTION';

interface TrustBadgeProps {
  type: TrustType;
  className?: string;
  subtext?: string;
}

export function TrustBadge({ type, className = '', subtext }: TrustBadgeProps) {
  const configs = {
    FACT: {
      label: 'FACT',
      style: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-400'
    },
    AI_SUMMARY: {
      label: 'AI SUMMARY',
      style: 'bg-[#7C5CFF]/15 text-[#A78BFA] border-[#7C5CFF]/30',
      dot: 'bg-[#7C5CFF]'
    },
    VERIFIED: {
      label: 'VERIFIED',
      style: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      dot: 'bg-cyan-400'
    },
    ANALYSIS: {
      label: 'ANALYSIS',
      style: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
      dot: 'bg-blue-400'
    },
    PREDICTION: {
      label: 'PREDICTION',
      style: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-400'
    }
  };

  const config = configs[type];

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold border ${config.style} ${className}`}
      title={subtext || `NexVarta categorization: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
      {subtext && <span className="opacity-75 text-[9px] font-sans font-normal border-l border-white/20 pl-1">{subtext}</span>}
    </span>
  );
}

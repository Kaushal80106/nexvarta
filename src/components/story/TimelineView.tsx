import { Clock, Radio } from 'lucide-react';
import { TimelineEvent } from '../../types';

export function TimelineView({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <section className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#252B38]">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#22D3EE]" />
          <h3 className="text-lg font-bold font-mono tracking-tight text-white">
            CHRONOLOGICAL EVENT TIMELINE
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {timeline.length} Sequenced Milestones
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#252B38]">
        {timeline.map((event, idx) => (
          <div key={event.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full bg-[#10141D] border-2 border-[#7C5CFF] group-hover:bg-[#7C5CFF] transition-colors flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100" />
            </div>

            <div className="bg-[#171C27] border border-[#252B38] hover:border-slate-600 rounded-lg p-3.5 sm:p-4 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded border border-[#22D3EE]/20">
                    {event.timeLabel}
                  </span>
                  <span className="text-sm font-bold text-white">{event.title}</span>
                </div>
                {event.badge && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C5CFF] bg-[#7C5CFF]/15 px-2 py-0.5 rounded border border-[#7C5CFF]/30">
                    {event.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                {event.description}
              </p>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-slate-500" />
                <span>Source: <span className="text-slate-300">{event.sourceName}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

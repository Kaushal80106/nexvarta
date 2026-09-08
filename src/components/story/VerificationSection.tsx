import { CheckCircle2, AlertTriangle, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import { StoryVerification, Claim } from '../../types';
import { TrustBadge } from '../intelligence/TrustBadge';

export function VerificationSection({ verification }: { verification: StoryVerification }) {
  const getStatusBadge = (status: StoryVerification['status']) => {
    switch (status) {
      case 'Well corroborated':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            WELL CORROBORATED
          </span>
        );
      case 'Partially corroborated':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            PARTIALLY CORROBORATED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/60 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            {status.toUpperCase()}
          </span>
        );
    }
  };

  return (
    <section className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 sm:p-6">
      <div className="flex flex-col gap-2 mb-5 pb-4 border-b border-[#252B38]">
        <div className="flex items-center gap-2 flex-wrap">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <h3 className="text-sm font-bold font-mono tracking-tight text-white">
            SOURCE VERIFICATION & CLAIM AUDIT
          </h3>
          <TrustBadge type="VERIFIED" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {getStatusBadge(verification.status)}
        </div>
      </div>

      {/* Verification Confidence Banner */}
      <div className="bg-[#171C27] border border-[#252B38] rounded-lg p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white mb-1">
            Automated Cross-Publisher Fact Extraction
          </div>
          <p className="text-xs text-slate-400">
            Claims are isolated via Natural Language Assertion parsing and corroborated across registered wire feeds.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#080B12] px-3 py-1.5 rounded border border-[#252B38] shrink-0">
          <FileCheck className="w-4 h-4 text-[#22D3EE]" />
          <span className="text-xs font-mono text-slate-300">
            Aggregate Index: <strong className="text-emerald-400">{verification.confidence}%</strong>
          </span>
        </div>
      </div>

      {/* Claims List */}
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
        Extracted Empirical Claims
      </h4>
      <div className="space-y-3">
        {(verification.claims || []).map((claim: Claim) => (
          <div
            key={claim.id}
            className={`rounded-lg p-3 border ${
              claim.status === 'Supported'
                ? 'bg-[#171C27]/80 border-emerald-500/30'
                : 'bg-[#171C27]/80 border-amber-500/30'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[12px] font-medium text-white leading-snug flex-1">
                "{claim.text}"
              </p>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                claim.status === 'Supported'
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
              }`}>
                {claim.status.toUpperCase()}
              </span>
            </div>

            <div className="text-[10px] font-mono text-slate-400 space-y-1 pt-2 border-t border-[#252B38]/60">
              <div>
                <span className="text-emerald-400 font-semibold">Supporting: </span>
                <span className="text-slate-300">{claim.supportingSources?.join(', ')}</span>
              </div>
              {claim.contradictingSources && claim.contradictingSources.length > 0 && (
                <div>
                  <span className="text-amber-400 font-semibold">Contradicting: </span>
                  <span className="text-slate-300">{claim.contradictingSources.join(', ')}</span>
                </div>
              )}
              {claim.notes && (
                <p className="text-[10px] text-slate-400 italic mt-1">{claim.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

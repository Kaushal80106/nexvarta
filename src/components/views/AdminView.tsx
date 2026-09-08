import { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Database, 
  AlertCircle, 
  CheckCircle2, 
  RotateCw, 
  Layers, 
  Server, 
  Sliders, 
  FileCheck 
} from 'lucide-react';
import { mockAdminMetrics, mockPipelineSources } from '../../data/mockAdmin';
import { showToast } from '../../store/useAppStore';

export function AdminView() {
  const [sources, setSources] = useState(mockPipelineSources);
  const [isReprocessing, setIsReprocessing] = useState(false);

  const toggleSourceStatus = (id: string) => {
    setSources(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        showToast(`Source ${s.name} changed to ${newStatus}`);
        return { ...s, status: newStatus as any };
      }
      return s;
    }));
  };

  const handleManualIngest = () => {
    setIsReprocessing(true);
    setTimeout(() => {
      setIsReprocessing(false);
      showToast('Manual cluster & verification sweep completed across 1,842 endpoints');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252B38] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#7C5CFF]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              NexVarta Operational & Ingestion Suite
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time pipeline monitoring, consensus engine health, and source reliability scoring.
          </p>
        </div>

        <button
          onClick={handleManualIngest}
          disabled={isReprocessing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white text-xs font-mono font-semibold transition-all disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isReprocessing ? 'animate-spin' : ''}`} />
          <span>{isReprocessing ? 'Re-clustering...' : 'Trigger Pipeline Sweep'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase">ACTIVE WIRES & FEEDS</div>
          <div className="text-xl font-bold text-white mt-1">1,842</div>
          <div className="text-emerald-400 text-[10px] mt-0.5">99.8% Online</div>
        </div>

        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase">PROCESSED (24H)</div>
          <div className="text-xl font-bold text-white mt-1">24,190</div>
          <div className="text-[#22D3EE] text-[10px] mt-0.5">380 articles / min peak</div>
        </div>

        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase">CONSENSUS CLUSTER RATIO</div>
          <div className="text-xl font-bold text-white mt-1">18.4 : 1</div>
          <div className="text-[#7C5CFF] text-[10px] mt-0.5">Reduced redundancy by 94%</div>
        </div>

        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5">
          <div className="text-[10px] text-slate-500 uppercase">MODEL LATENCY</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">320ms</div>
          <div className="text-slate-500 text-[10px] mt-0.5">P99 Inference</div>
        </div>
      </div>

      {/* Pipeline Status Banner */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h4 className="text-xs font-mono font-bold text-white">7-STAGE INGESTION ENGINE: HEALTHY</h4>
            <p className="text-[11px] text-slate-400">All stages (Clustering, Claim Extraction, Disputed Analysis, Multilingual Gen) operational.</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-500/20">
          ZERO ANOMALIES
        </span>
      </div>

      {/* Sources Management Table */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#252B38]">
          <h3 className="text-xs font-mono font-bold uppercase text-white">
            REGISTERED SOURCES & RELIABILITY SCORING
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            Automated fact-checking weighting
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-[#252B38] pb-2 text-[10px] uppercase">
                <th className="pb-2">Source Outlet</th>
                <th className="pb-2">Tier</th>
                <th className="pb-2">Reliability</th>
                <th className="pb-2">Articles (24h)</th>
                <th className="pb-2">Dispute Rate</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B38]/50 text-slate-300">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-[#171C27]/50">
                  <td className="py-3 font-semibold text-white">{s.name}</td>
                  <td className="py-3">
                    <span className="text-[10px] text-slate-400 bg-[#171C27] px-2 py-0.5 rounded border border-[#252B38]">
                      Tier {s.tier}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-emerald-400 font-bold">{s.reliability}%</span>
                  </td>
                  <td className="py-3">{s.articlesIngestedToday.toLocaleString()}</td>
                  <td className="py-3 text-slate-400">{s.disputeRate}%</td>
                  <td className="py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      s.status === 'ACTIVE'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleSourceStatus(s.id)}
                      className="text-xs text-[#7C5CFF] hover:underline"
                    >
                      {s.status === 'ACTIVE' ? 'Pause' : 'Resume'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

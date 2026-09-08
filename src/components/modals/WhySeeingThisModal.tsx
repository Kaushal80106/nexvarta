import { useState, type FormEvent } from 'react';
import { X, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { showToast } from '../../store/useAppStore';

export function WhySeeingThisModal() {
  const { isWhySeeingModalOpen, modalTargetStory, closeModals } = useAppStore();

  if (!isWhySeeingModalOpen || !modalTargetStory) return null;

  const handleTune = () => {
    closeModals();
    showToast('Preference saved: We will show fewer stories of this type');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#10141D] border border-[#252B38] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="p-4 border-b border-[#252B38] flex items-center justify-between bg-[#171C27]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
            <h4 className="text-sm font-bold font-mono text-white">
              WHY AM I SEEING THIS STORY?
            </h4>
          </div>
          <button
            onClick={closeModals}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="bg-[#171C27] rounded-lg p-3 border border-[#252B38]">
            <div className="font-semibold text-white text-sm line-clamp-1 mb-1">
              {modalTargetStory.headline}
            </div>
            <div className="text-[11px] font-mono text-[#7C5CFF]">
              Relevance Algorithm Score: 94% match
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="text-slate-400 font-mono uppercase text-[10px] tracking-wider font-semibold">
              Algorithmic Factors:
            </div>

            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>You follow the <strong>{modalTargetStory.category}</strong> category and related entities.</span>
            </div>

            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>You frequently read high-impact stories with <strong>{modalTargetStory.impact.potentialLevel}</strong> disruption levels.</span>
            </div>

            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>This development has clustered <strong>{modalTargetStory.sourceCount} verified outlets</strong> with strong agreement.</span>
            </div>

            {modalTargetStory.location && (
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Geographic proximity: Relevant to your selected region ({modalTargetStory.location.city || modalTargetStory.location.country}).</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#252B38] flex items-center justify-between">
            <button
              onClick={handleTune}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Show fewer stories like this
            </button>
            <button
              onClick={closeModals}
              className="px-4 py-1.5 rounded-lg bg-[#7C5CFF] text-white font-semibold text-xs"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportStoryModal() {
  const { isReportModalOpen, modalTargetStory, closeModals } = useAppStore();
  const [selectedReason, setSelectedReason] = useState('Misleading');
  const [notes, setNotes] = useState('');

  if (!isReportModalOpen || !modalTargetStory) return null;

  const reasons = [
    'Misleading',
    'Incorrect information',
    'Duplicate',
    'Inappropriate',
    'Broken link',
    'Other'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    closeModals();
    showToast('Report submitted for editorial review. Thank you for keeping NexVarta accurate.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#10141D] border border-[#252B38] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="p-4 border-b border-[#252B38] flex items-center justify-between bg-[#171C27]">
          <h4 className="text-sm font-bold font-mono text-white">
            REPORT STORY OR DATA INACCURACY
          </h4>
          <button onClick={closeModals} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
              Reason for report
            </label>
            <div className="grid grid-cols-2 gap-2">
              {reasons.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setSelectedReason(r)}
                  className={`px-3 py-2 rounded-lg border text-left font-sans transition-colors ${
                    selectedReason === r
                      ? 'bg-[#7C5CFF]/20 border-[#7C5CFF] text-white font-semibold'
                      : 'bg-[#171C27] border-[#252B38] text-slate-300 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
              Additional Details / Correction Links
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste supporting source links or specific claim discrepancies..."
              className="w-full bg-[#171C27] border border-[#252B38] focus:border-[#7C5CFF] rounded-lg p-2.5 text-xs text-white placeholder-slate-500 outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModals}
              className="px-3 py-1.5 rounded-lg border border-[#252B38] text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

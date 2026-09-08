import { useState } from 'react';
import { X, Copy, Check, Share2, Send } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { showToast } from '../../store/useAppStore';

export function ShareModal() {
  const { isShareModalOpen, modalTargetStory, closeModals } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !modalTargetStory) return null;

  const shareUrl = window.location.origin + '/story/' + modalTargetStory.slug;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Story intelligence link copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSocialShare = (platform: string) => {
    const text = `Read AI-verified intelligence on: "${modalTargetStory.headline}" via NexVarta`;
    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    }
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#10141D] border border-[#252B38] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="p-4 border-b border-[#252B38] flex items-center justify-between bg-[#171C27]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#7C5CFF]" />
            <h4 className="text-sm font-bold font-mono text-white">
              SHARE INTELLIGENCE SUMMARY
            </h4>
          </div>
          <button onClick={closeModals} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Generated Card Preview */}
          <div className="bg-[#080B12] border border-[#252B38] rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
                <span className="font-mono font-extrabold text-xs tracking-wider text-white">NEXVARTA</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-[#171C27] px-2 py-0.5 rounded border border-[#252B38]">
                {modalTargetStory.sourceCount} Sources Clustered
              </span>
            </div>

            <h5 className="font-bold text-sm text-white mb-2 line-clamp-2">
              {modalTargetStory.headline}
            </h5>

            <p className="text-xs text-slate-300 line-clamp-3 mb-3 bg-[#171C27]/80 p-2.5 rounded border border-[#252B38]/60">
              {modalTargetStory.aiSummary.short}
            </p>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-[#252B38]">
              <span>Impact: <strong className="text-rose-400">{modalTargetStory.impact.potentialLevel}</strong></span>
              <span>Confidence: <strong className="text-emerald-400">{modalTargetStory.impact.confidence}%</strong></span>
            </div>
          </div>

          {/* Share Actions */}
          <div className="grid grid-cols-3 gap-2 text-xs font-medium">
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="py-2.5 rounded-lg bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => handleSocialShare('twitter')}
              className="py-2.5 rounded-lg bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>X / Twitter</span>
            </button>
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="py-2.5 rounded-lg bg-[#171C27] hover:bg-[#252B38] border border-[#252B38] text-blue-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>LinkedIn</span>
            </button>
          </div>

          {/* Copy link bar */}
          <div className="flex items-center gap-2 bg-[#171C27] p-2 rounded-lg border border-[#252B38]">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs text-slate-300 font-mono outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-md bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KeyboardShortcutsModal() {
  const { isKeyboardShortcutsOpen, setKeyboardShortcutsOpen } = useAppStore();

  if (!isKeyboardShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Ctrl/Cmd + K', desc: 'Open Command Palette & Global Search' },
    { key: 'G', desc: 'Go to Personalized Feed (Home)' },
    { key: 'T', desc: 'Go to Trending Stories' },
    { key: 'S', desc: 'Go to Saved Library' },
    { key: 'A', desc: 'Open AI News Assistant' },
    { key: 'L', desc: 'Go to Hyperlocal News' },
    { key: 'D', desc: 'Toggle Day / Night Mode' },
    { key: '?', desc: 'Open this Keyboard Shortcuts Dialog' },
    { key: 'Esc', desc: 'Close any open modal or side drawer' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#10141D] border border-[#252B38] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="p-4 border-b border-[#252B38] flex items-center justify-between bg-[#171C27]">
          <h4 className="text-sm font-bold font-mono text-white">
            KEYBOARD SHORTCUTS
          </h4>
          <button onClick={() => setKeyboardShortcutsOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 font-mono text-xs">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between py-1 border-b border-[#252B38]/50">
              <span className="text-slate-300 font-sans">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-[#171C27] border border-[#252B38] text-slate-200 font-mono text-[11px]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

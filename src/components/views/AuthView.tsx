import { ShieldCheck } from 'lucide-react';
import { SignIn } from '@clerk/clerk-react';
import { useAppStore } from '../../store/useAppStore';

export function AuthView() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white font-mono font-extrabold text-xl shadow-[0_0_20px_rgba(109,74,255,0.4)] mb-4">
          N
        </div>
        <h2 className="text-[24px] sm:text-[28px] font-[650] text-text-primary tracking-tight leading-tight">
          Welcome to NexVarta
        </h2>
        <p className="text-[14px] text-text-secondary mt-2">
          Discover, verify, and understand news that matters.
        </p>
      </div>

      <SignIn 
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "w-full bg-surface border border-border rounded-2xl card-shadow p-6 sm:p-8",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "bg-surface-secondary border border-border text-text-primary hover:bg-surface transition-colors",
            socialButtonsBlockButtonText: "text-text-primary font-medium",
            formButtonPrimary: "w-full flex items-center justify-center py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-colors mt-2",
            formFieldInput: "w-full bg-surface-secondary border border-border focus:border-primary rounded-xl px-4 py-2.5 text-text-primary outline-none transition-colors",
            formFieldLabel: "text-text-secondary font-medium block mb-1.5",
            footerActionLink: "text-primary hover:text-primary-hover font-semibold",
            dividerLine: "bg-border",
            dividerText: "text-text-muted",
          }
        }}
      />
      
      {/* Footer minimal info */}
      <div className="mt-8 text-center">
        <p className="text-[12px] text-text-muted flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure verification standard
        </p>
      </div>
    </div>
  );
}

export function NotFoundView() {
  const { navigate } = useAppStore();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-[#171C27] border border-[#252B38] flex items-center justify-center text-slate-400 mb-4 font-mono font-bold text-xl">
        404
      </div>
      <h2 className="text-2xl font-extrabold text-white mb-2">
        Looks like this story disappeared.
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        The requested intelligence cluster may have been merged into a broader breaking story or archived.
      </p>
      <button
        onClick={() => navigate('home')}
        className="px-6 py-2.5 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white text-xs font-mono font-semibold transition-colors"
      >
        Return to Home Feed
      </button>
    </div>
  );
}

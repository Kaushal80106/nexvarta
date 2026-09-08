import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  MapPin, 
  Globe, 
  Bell, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockEntities } from '../../data/mockEntities';
import { showToast } from '../../store/useAppStore';

const categoriesList = [
  'Technology', 'Finance', 'Business', 'Politics', 'Science', 'Sports', 'World', 'India', 'Local'
];

const languagesList = [
  'English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Bengali', 'Kannada', 'Malayalam', 'Punjabi'
];

export function OnboardingView() {
  const { navigate, user, toggleFollowEntity, setSelectedLocation, setSelectedLanguage } = useAppStore();
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  const [selectedCats, setSelectedCats] = useState<string[]>(['Technology', 'Finance', 'Local']);
  const [briefTime, setBriefTime] = useState('07:30');
  const [lang, setLang] = useState('English');
  const [locationCity, setLocationCity] = useState('Virar');

  const toggleCat = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleFinish = () => {
    setSelectedLanguage(lang);
    setSelectedLocation({
      country: 'India',
      state: 'Maharashtra',
      district: 'Palghar',
      city: locationCity,
    });
    showToast('Onboarding complete! Welcome to NexVarta.');
    navigate('home');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#10141D] border border-[#252B38] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
        {/* Step progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span>STEP {step} OF {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% COMPLETE</span>
          </div>
          <div className="h-1.5 w-full bg-[#171C27] rounded-full overflow-hidden border border-[#252B38]">
            <div
              className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="py-2 min-h-[340px]">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-4 pt-6">
              <div className="w-14 h-14 rounded-2xl bg-[#7C5CFF] mx-auto flex items-center justify-center text-white font-mono font-extrabold text-2xl shadow-[0_0_25px_rgba(124,92,255,0.4)]">
                N
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Welcome to NexVarta
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                The AI-powered news intelligence platform that clusters duplicates, audits claims, and predicts real-world impact.
              </p>
              <div className="pt-4 text-xs font-mono text-slate-400">
                Let's calibrate your intelligence feed in 60 seconds.
              </div>
            </div>
          )}

          {/* Step 2: Broad Categories */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Select your primary areas of interest
              </h3>
              <p className="text-xs text-slate-400">
                Choose the domains where you need deep signal and empirical summaries.
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCat(cat)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedCats.includes(cat)
                        ? 'bg-[#7C5CFF]/20 border-[#7C5CFF] text-white font-bold'
                        : 'bg-[#171C27] border-[#252B38] text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Follow Core Entities */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Track strategic entities & organizations
              </h3>
              <p className="text-xs text-slate-400">
                We'll cluster any reporting or regulatory updates involving them into unified dossiers.
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockEntities.map((ent) => {
                  const isFollowed = user.followedTopics.includes(ent.name);
                  return (
                    <div
                      key={ent.id}
                      className="p-3 bg-[#171C27] border border-[#252B38] rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{ent.name}</div>
                        <div className="text-[10px] font-mono text-[#22D3EE]">{ent.type}</div>
                      </div>
                      <button
                        onClick={() => toggleFollowEntity(ent.name)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono ${
                          isFollowed
                            ? 'bg-[#7C5CFF] text-white'
                            : 'bg-[#10141D] text-slate-300 border border-[#252B38]'
                        }`}
                      >
                        {isFollowed ? 'Tracking' : '+ Track'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Hyperlocal Location */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Set your municipal & civic location
              </h3>
              <p className="text-xs text-slate-400">
                Receive civic notices, transport corridor updates, and municipal water/power advisories.
              </p>
              <div className="p-4 bg-[#171C27] border border-[#252B38] rounded-xl space-y-3 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">State & District</label>
                  <input
                    type="text"
                    disabled
                    value="Maharashtra • Palghar District"
                    className="w-full bg-[#10141D] border border-[#252B38] rounded-lg p-2 text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">City / Municipal Ward</label>
                  <select
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    className="w-full bg-[#10141D] border border-[#252B38] rounded-lg p-2 text-white outline-none"
                  >
                    <option value="Virar">Virar (VVCMC)</option>
                    <option value="Palghar">Palghar (HQ)</option>
                    <option value="Vasai">Vasai (VVCMC)</option>
                    <option value="Dahanu">Dahanu</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Choose Languages */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Choose primary reading language
              </h3>
              <p className="text-xs text-slate-400">
                Our synthesis engine generates fluent summaries across 10 official languages.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {languagesList.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between ${
                      lang === l
                        ? 'bg-[#7C5CFF]/20 border-[#7C5CFF] text-white font-bold'
                        : 'bg-[#171C27] border-[#252B38] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{l}</span>
                    {lang === l && <Check className="w-3.5 h-3.5 text-[#7C5CFF]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Reader Archetype */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                What best describes how you consume news?
              </h3>
              <div className="space-y-2 text-xs font-mono">
                {[
                  { title: 'Executive / Founder', desc: 'Focus on strategic disruption, market velocity, and macro regulatory shifts.' },
                  { title: 'Engineer / Technologist', desc: 'Focus on AI architecture, open-source benchmarks, and semiconductor developments.' },
                  { title: 'Investor / Trader', desc: 'Focus on central bank repo rates, earnings consensus, and sector headwinds.' },
                  { title: 'Informed Citizen', desc: 'Balanced view of civic transit, national policies, and local municipal infrastructure.' }
                ].map((arch) => (
                  <div
                    key={arch.title}
                    className="p-3.5 bg-[#171C27] border border-[#252B38] hover:border-[#7C5CFF] rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-white mb-0.5">{arch.title}</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">{arch.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Daily Briefing Schedule */}
          {step === 7 && (
            <div className="space-y-4 text-center pt-6">
              <Clock className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">
                When do you want your morning brief?
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We'll prepare a 5-story executive summary with audio synthesis by this time.
              </p>
              <input
                type="time"
                value={briefTime}
                onChange={(e) => setBriefTime(e.target.value)}
                className="bg-[#171C27] border border-[#252B38] text-xl font-mono text-white px-6 py-3 rounded-xl mx-auto block outline-none"
              />
            </div>
          )}

          {/* Step 8: Notifications Filtering */}
          {step === 8 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Set notification sensitivity threshold
              </h3>
              <p className="text-xs text-slate-400">
                NexVarta filters out clickbait and non-consequential headlines by default.
              </p>
              <div className="p-4 bg-[#171C27] border border-[#252B38] rounded-xl space-y-3 text-xs font-mono">
                <label className="flex items-center justify-between">
                  <span className="text-white">Alert on High & Critical impact events only</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#7C5CFF]" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-white">Alert on followed entity regulatory actions</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#7C5CFF]" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-white">Local civic & transit advisories (Palghar / Virar)</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#7C5CFF]" />
                </label>
              </div>
            </div>
          )}

          {/* Step 9: Ready to Launch */}
          {step === 9 && (
            <div className="text-center space-y-4 pt-6">
              <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Intelligence Engine Configured
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your feed is calibrated for <strong>{selectedCats.join(', ')}</strong>, localized to <strong>{locationCity}</strong>, in <strong>{lang}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-[#252B38] mt-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-[#171C27] border border-[#252B38] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#7C5CFF] hover:bg-[#6D4AEF] text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(124,92,255,0.3)]"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-[#7C5CFF] hover:bg-[#6D4AEF] text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-colors shadow-[0_0_20px_rgba(124,92,255,0.4)]"
            >
              <span>Launch Feed</span>
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

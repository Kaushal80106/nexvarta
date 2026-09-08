import { useState } from 'react';
import { MapPin, AlertTriangle, Wind, Train, Droplet, ChevronDown, Check, Compass } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockLocalHierarchy, mockLocalAlerts } from '../../data/mockLocal';
import { mockStories } from '../../data/mockStories';
import { LocalStoryCard } from '../cards/LocalStoryCard';
import { showToast } from '../../store/useAppStore';

export function LocalNewsView() {
  const { selectedLocation, setSelectedLocation } = useAppStore();
  const [isChangingLocation, setIsChangingLocation] = useState(false);

  // Filter local stories
  const localStories = mockStories.filter(
    (s) => s.category === 'Local' || (s.location && s.location.country === 'India')
  );

  const handleSelectCity = (stateName: string, districtName: string, cityName: string) => {
    setSelectedLocation({
      country: 'India',
      state: stateName,
      district: districtName,
      city: cityName,
    });
    setIsChangingLocation(false);
    showToast(`Location set to ${cityName}, ${districtName}`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header with location selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252B38] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#22D3EE]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Hyperlocal Civic & Regional News
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Precision journalism scoped to your immediate municipal jurisdiction and transport corridors.
          </p>
        </div>

        {/* Current Location Pill & Change Button */}
        <div className="relative">
          <button
            onClick={() => setIsChangingLocation(!isChangingLocation)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#10141D] hover:bg-[#171C27] border border-[#252B38] text-xs font-mono text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>{selectedLocation.city}, {selectedLocation.district}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isChangingLocation && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-[#171C27] border border-[#252B38] rounded-xl shadow-2xl p-3 z-30 text-xs font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Select Indian Region
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {mockLocalHierarchy.states.map((st) => (
                  <div key={st.name} className="space-y-1">
                    <div className="text-[#7C5CFF] font-bold text-[11px]">{st.name}</div>
                    {st.districts.map((d) => (
                      <div key={d.name} className="pl-2 space-y-0.5">
                        <div className="text-slate-400 text-[10px]">• {d.name}</div>
                        {d.cities.map((city) => (
                          <button
                            key={city}
                            onClick={() => handleSelectCity(st.name, d.name, city)}
                            className={`w-full text-left pl-3 py-1 rounded hover:bg-[#252B38] flex items-center justify-between ${
                              selectedLocation.city === city ? 'text-[#22D3EE] font-bold bg-[#252B38]/50' : 'text-slate-300'
                            }`}
                          >
                            <span>{city}</span>
                            {selectedLocation.city === city && <Check className="w-3 h-3 text-[#22D3EE]" />}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Local Live Pulse Banner (AQI & Transit) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/20">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">AIR QUALITY (AQI)</div>
            <div className="text-sm font-bold text-emerald-400">68 • Satisfactory</div>
            <div className="text-[10px] text-slate-500">Coastal breeze index</div>
          </div>
        </div>

        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30">
            <Train className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">SUBURBAN TRANSIT</div>
            <div className="text-sm font-bold text-white">Normal Frequency</div>
            <div className="text-[10px] text-slate-500">Western line on schedule</div>
          </div>
        </div>

        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
            <Droplet className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">CIVIC RESERVOIR</div>
            <div className="text-sm font-bold text-white">92% Capacity</div>
            <div className="text-[10px] text-slate-500">Surya River Waterworks</div>
          </div>
        </div>
      </div>

      {/* Active Local Bulletins & Alerts */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-amber-400">
          <AlertTriangle className="w-4 h-4" />
          <span>MUNICIPAL & COMMUTER ADVISORIES ({mockLocalAlerts.length})</span>
        </div>
        <div className="space-y-2">
          {mockLocalAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-[#171C27] border border-[#252B38] rounded-lg p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded mr-2 ${
                  alert.severity === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {alert.type}
                </span>
                <span className="font-semibold text-white">{alert.title}</span>
                <p className="text-slate-300 text-xs mt-1">{alert.description}</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                {alert.location} • {alert.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Local Stories */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
          VERIFIED LOCAL DEVELOPMENTS ({localStories.length})
        </h3>
        <div className="space-y-3">
          {localStories.map((story) => (
            <LocalStoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DailyBriefView() {
  const { navigate } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="border-b border-[#252B38] pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider mb-1">
              MORNING EXECUTIVE DIGEST
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Today's Daily Briefing
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              5 essential developments synthesized from 1,200 wires across your topics.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400 bg-[#10141D] px-3 py-1.5 rounded-lg border border-[#252B38] hidden sm:block">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Synthetic Audio Player Bar */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                  : 'bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white shadow-[0_0_15px_rgba(124,92,255,0.4)]'
              }`}
            >
              {isPlaying ? <span className="font-mono font-bold text-xs">PAUSE</span> : <span className="font-mono font-bold text-xs">PLAY</span>}
            </button>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">
                AI Audio Synthesis (2m 45s)
              </h4>
              <p className="text-xs text-slate-400">
                Natural-sounding neural voice summary of today's key five stories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:w-64">
            <div className="flex-1 bg-[#171C27] h-2 rounded-full overflow-hidden border border-[#252B38]">
              <div 
                className="bg-amber-400 h-full transition-all"
                style={{ width: isPlaying ? '68%' : '35%' }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400">01:12 / 02:45</span>
          </div>
        </div>
      </div>

      {/* 5-Story Curated Sequence */}
      <div className="space-y-4">
        {mockStories.slice(0, 5).map((story, idx) => (
          <div
            key={story.id}
            className="bg-[#10141D] border border-[#252B38] hover:border-slate-600 rounded-xl p-5 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7C5CFF]/20 border border-[#7C5CFF]/40 text-[#7C5CFF] font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold text-[#7C5CFF] bg-[#7C5CFF]/15 px-2 py-0.5 rounded">
                  {story.category}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {story.sourceCount} verified sources
              </span>
            </div>

            <h3 
              onClick={() => navigate('story', { storyId: story.id })}
              className="text-base font-bold text-white hover:text-[#7C5CFF] cursor-pointer mb-2 leading-snug"
            >
              {story.headline}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {story.aiSummary.short}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#252B38] text-[11px] font-mono">
              <span className="text-slate-400">
                Key Impact: <strong className="text-amber-400">{story.impact.potentialLevel}</strong>
              </span>
              <button
                onClick={() => navigate('story', { storyId: story.id })}
                className="text-[#22D3EE] hover:underline font-semibold"
              >
                Read Full Synthesis & Claims →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

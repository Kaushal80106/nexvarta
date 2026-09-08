import { useState, type FormEvent } from 'react';
import { Bell, CheckCheck, Flame, Users, MapPin, Sun, Moon, Sparkles, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { formatRelativeTime } from '../../lib/utils';
import { showToast } from '../../store/useAppStore';

export function NotificationsView() {
  const { notifications, markAllNotificationsRead, clearNotification, navigate } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'breaking' | 'following' | 'local'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'breaking': return <Flame className="w-4 h-4 text-rose-400" />;
      case 'following': return <Users className="w-4 h-4 text-[#7C5CFF]" />;
      case 'local': return <MapPin className="w-4 h-4 text-[#22D3EE]" />;
      default: return <Sun className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleClickItem = (storyId?: string) => {
    if (storyId) {
      navigate('story', { storyId });
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252B38] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#7C5CFF]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Intelligence Notifications
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Breaking alerts, topic updates, and daily briefing digests.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10141D] hover:bg-[#171C27] border border-[#252B38] text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-mono">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'breaking', label: 'Breaking' },
          { id: 'following', label: 'Followed Topics' },
          { id: 'local', label: 'Local (Palghar / Virar)' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              filter === t.id
                ? 'bg-[#171C27] border-[#7C5CFF] text-white font-semibold'
                : 'bg-[#10141D] border-[#252B38] text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-12 text-center max-w-md mx-auto">
          <Bell className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No alerts in this category</h3>
          <p className="text-xs text-slate-400">
            You're all caught up with your intelligence notifications.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-[#10141D] border rounded-xl p-4 flex items-start justify-between gap-3 transition-colors ${
                item.isRead ? 'border-[#252B38] opacity-75' : 'border-[#7C5CFF]/40 shadow-sm'
              }`}
            >
              <div 
                onClick={() => handleClickItem(item.storyId)}
                className="flex items-start gap-3 cursor-pointer flex-1"
              >
                <div className="p-2 rounded-lg bg-[#171C27] border border-[#252B38] shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {item.message}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => clearNotification(item.id)}
                className="p-1.5 rounded text-slate-500 hover:text-rose-400 transition-colors"
                title="Dismiss"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SettingsView() {
  const { user, selectedLanguage, setSelectedLanguage, showToast, theme, setTheme } = useAppStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [briefTime, setBriefTime] = useState(user.briefingTime);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    showToast('Settings saved successfully');
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="border-b border-[#252B38] pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Account & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Manage your identity, appearance theme, notification schedule, and regional preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Appearance & Theme Mode Card */}
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Appearance & Theme Mode
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Toggle between Day Mode (high-contrast editorial light) and Night Mode (deep obsidian dark).
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#171C27] border border-[#252B38] text-[#7C5CFF] font-semibold">
              {theme === 'light' ? '☀️ Day Mode Active' : '🌙 Night Mode Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-600 shadow-sm ring-1 ring-amber-500/30 font-bold'
                  : 'bg-[#171C27] border-[#252B38] text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Day Mode (Editorial Light)</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#7C5CFF]/15 border-[#7C5CFF]/50 text-[#7C5CFF] shadow-sm ring-1 ring-[#7C5CFF]/30 font-bold'
                  : 'bg-[#171C27] border-[#252B38] text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              <Moon className="w-4 h-4 text-[#7C5CFF]" />
              <span>Night Mode (Obsidian Dark)</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Reader Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#171C27] border border-[#252B38] rounded-lg p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171C27] border border-[#252B38] rounded-lg p-2.5 text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Daily Briefing Schedule */}
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Daily Intelligence Briefing Time
          </h3>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Morning Delivery Window</label>
              <input
                type="time"
                value={briefTime}
                onChange={(e) => setBriefTime(e.target.value)}
                className="bg-[#171C27] border border-[#252B38] rounded-lg p-2.5 text-white outline-none"
              />
            </div>
            <div className="text-[11px] text-slate-400 self-end mb-2">
              Synthesized audio & text digest will be prepared by this time each morning.
            </div>
          </div>
        </div>

        {/* Delivery Channels */}
        <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 space-y-3 text-xs font-mono">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Notification Delivery
          </h3>

          <label className="flex items-center justify-between p-3 rounded-lg bg-[#171C27] border border-[#252B38] cursor-pointer">
            <div>
              <div className="text-white font-semibold">Breaking News Push Notifications</div>
              <div className="text-[11px] text-slate-400">Only trigger for verified High and Critical impact stories.</div>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#7C5CFF]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-[#171C27] border border-[#252B38] cursor-pointer">
            <div>
              <div className="text-white font-semibold">Daily Digest Email</div>
              <div className="text-[11px] text-slate-400">Receive executive 5-story briefing directly in your inbox.</div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#7C5CFF]"
            />
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#7C5CFF] hover:bg-[#6D4AEF] text-white font-semibold text-xs font-mono transition-colors"
        >
          Save All Changes
        </button>
      </form>
    </div>
  );
}

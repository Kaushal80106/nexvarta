import { 
  Home, 
  Compass, 
  TrendingUp, 
  Users, 
  MapPin, 
  Sun, 
  Bookmark, 
  Clock, 
  Sparkles, 
  Bell, 
  HelpCircle, 
  Settings, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  CreditCard,
  Moon
} from 'lucide-react';
import { ViewRoute, Category } from '../../types';
import { useAppStore } from '../../store/useAppStore';

const navGroups = [
  {
    label: 'Discover',
    items: [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'discover', label: 'Discover', icon: Compass },
      { id: 'trending', label: 'Trending', icon: TrendingUp },
      { id: 'following', label: 'Following', icon: Users },
      { id: 'local', label: 'Local News', icon: MapPin },
    ]
  },
  {
    label: 'Your Intelligence',
    items: [
      { id: 'daily-brief', label: 'Daily Brief', icon: Sun },
      { id: 'saved', label: 'Saved Library', icon: Bookmark },
      { id: 'history', label: 'Reading History', icon: Clock },
    ]
  }
];

export function Sidebar() {
  const { 
    currentRoute, 
    navigate, 
    sidebarCollapsed, 
    toggleSidebar, 
    user,
    notifications,
    theme,
    toggleTheme 
  } = useAppStore();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-border bg-background transition-all duration-200 shrink-0 sticky top-0 h-screen z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-mono font-bold text-sm">
            N
          </div>
          {!sidebarCollapsed && (
            <div>
              <div className="font-[650] text-[15px] tracking-tight text-text-primary group-hover:text-primary transition-colors">
                NEXVARTA
              </div>
              <div className="text-[10px] text-text-muted -mt-0.5 tracking-tight font-medium">
                News That Matters to You
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-2">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as ViewRoute)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="p-4 border-t border-border space-y-1 bg-background">
        {!sidebarCollapsed && (
          <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-2">
            Tools
          </div>
        )}
        
        <button
          onClick={() => navigate('assistant')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-text-primary border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all group ${
            sidebarCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Sparkles className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
          {!sidebarCollapsed && <span>Ask NexVarta</span>}
        </button>

        <button
          onClick={() => navigate('notifications')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors relative ${
            sidebarCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Bell className="w-4 h-4 shrink-0 text-text-muted" />
          {!sidebarCollapsed && <span>Notifications</span>}
          {unreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-primary absolute top-2 right-2" />
          )}
        </button>

        {!sidebarCollapsed && (
          <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted mt-4 mb-2 pt-2">
            Workspace
          </div>
        )}

        <button
          onClick={() => navigate('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors ${
            sidebarCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Settings className="w-4 h-4 shrink-0 text-text-muted" />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>

        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer ${
            sidebarCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 shrink-0 text-text-muted" />
          ) : (
            <Sun className="w-4 h-4 shrink-0 text-text-muted" />
          )}
          {!sidebarCollapsed && (
            <span className="flex items-center justify-between flex-1">
              <span>{theme === 'light' ? 'Night Mode' : 'Day Mode'}</span>
            </span>
          )}
        </button>

        {user.role === 'admin' && (
          <button
            onClick={() => navigate('admin')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <Shield className="w-4 h-4 shrink-0 text-text-muted" />
            {!sidebarCollapsed && <span>Admin Suite</span>}
          </button>
        )}

        {/* User Card */}
        <div 
          onClick={() => navigate('settings')}
          className={`pt-3 mt-2 border-t border-border flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity ${
            sidebarCollapsed ? 'justify-center' : 'px-2'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-surface-secondary border border-border flex items-center justify-center text-[12px] font-bold text-text-primary shrink-0">
            {user.name.charAt(0)}
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-text-primary truncate">{user.name}</div>
              <div className="text-[11px] font-medium text-text-muted">{user.plan} Plan</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

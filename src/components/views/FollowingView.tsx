import { useState } from 'react';
import { Users, Plus, Check, Search, Bell, Sliders } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { mockEntities } from '../../data/mockEntities';
import { mockStories } from '../../data/mockStories';
import { StandardStoryCard } from '../cards/StandardStoryCard';

export function FollowingView() {
  const { user, toggleFollowEntity, navigate } = useAppStore();
  const [activeTab, setActiveTab] = useState<'feed' | 'manage'>('feed');
  const [search, setSearch] = useState('');

  const followedStories = mockStories.filter((s) => 
    s.relatedEntities.some((ent) => user.followedTopics.includes(ent.name))
  );

  const filteredEntities = mockEntities.filter((e) => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252B38] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#7C5CFF]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Followed Topics & Entities
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            You are actively tracking {user.followedTopics.length} entities across global & Indian intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#10141D] p-1 rounded-lg border border-[#252B38] text-xs font-mono">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'feed'
                ? 'bg-[#171C27] text-white font-semibold border border-[#252B38]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Following Feed ({followedStories.length})
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'manage'
                ? 'bg-[#171C27] text-white font-semibold border border-[#252B38]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manage Entities ({user.followedTopics.length})
          </button>
        </div>
      </div>

      {activeTab === 'feed' ? (
        <div>
          {followedStories.length === 0 ? (
            <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-12 text-center max-w-md mx-auto">
              <Users className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No followed stories yet</h3>
              <p className="text-xs text-slate-400 mb-4">
                Switch to 'Manage Entities' to follow more companies, topics, or leaders.
              </p>
              <button
                onClick={() => setActiveTab('manage')}
                className="px-4 py-2 rounded-lg bg-[#7C5CFF] text-white font-semibold text-xs"
              >
                Browse Entities
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followedStories.map((story) => (
                <StandardStoryCard key={story.id} story={story} layout="grid" />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics, companies, people..."
                className="w-full bg-[#10141D] border border-[#252B38] focus:border-[#7C5CFF] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredEntities.map((ent) => {
              const isFollowing = user.followedTopics.includes(ent.name);
              return (
                <div
                  key={ent.id}
                  className="bg-[#10141D] border border-[#252B38] hover:border-slate-600 rounded-xl p-4 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded border border-[#22D3EE]/20">
                        {ent.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {ent.followersCount.toLocaleString()} followers
                      </span>
                    </div>

                    <h4 
                      onClick={() => navigate('entity', { entitySlug: ent.slug })}
                      className="font-bold text-white text-sm hover:text-[#7C5CFF] cursor-pointer transition-colors"
                    >
                      {ent.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {ent.bio || ent.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#252B38] flex items-center justify-between">
                    <button
                      onClick={() => navigate('entity', { entitySlug: ent.slug })}
                      className="text-xs font-mono text-slate-400 hover:text-white"
                    >
                      View Dossier →
                    </button>
                    <button
                      onClick={() => toggleFollowEntity(ent.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        isFollowing
                          ? 'bg-[#171C27] border border-[#7C5CFF] text-[#7C5CFF]'
                          : 'bg-[#7C5CFF] text-white hover:bg-[#6D4AEF]'
                      }`}
                    >
                      {isFollowing ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      <span>{isFollowing ? 'Following' : 'Follow'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function EntityDetailView() {
  const { currentRouteParams, navigate, user, toggleFollowEntity } = useAppStore();
  const slug = currentRouteParams?.entitySlug || 'openai';

  const entity = mockEntities.find(e => e.slug === slug) || mockEntities[0];
  const isFollowing = user.followedTopics.includes(entity.name);

  const connectedStories = mockStories.filter(s => 
    s.relatedEntities.some(ent => ent.id === entity.id || ent.name === entity.name)
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Back button */}
      <button
        onClick={() => navigate('following')}
        className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
      >
        <span>← Back to Following</span>
      </button>

      {/* Entity Profile Card */}
      <div className="bg-[#10141D] border border-[#252B38] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#22D3EE] bg-[#22D3EE]/10 px-2.5 py-0.5 rounded border border-[#22D3EE]/20 uppercase">
                {entity.type}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {entity.followersCount.toLocaleString()} tracked followers
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{entity.name}</h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {entity.bio || entity.description}
            </p>
          </div>

          <button
            onClick={() => toggleFollowEntity(entity.name)}
            className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-1.5 shrink-0 transition-colors ${
              isFollowing
                ? 'bg-[#171C27] border border-[#7C5CFF] text-[#7C5CFF]'
                : 'bg-[#7C5CFF] text-white hover:bg-[#6D4AEF]'
            }`}
          >
            {isFollowing ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isFollowing ? 'Following' : 'Follow Entity'}</span>
          </button>
        </div>

        {/* Entity Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#252B38] font-mono text-xs">
          <div className="bg-[#171C27] p-3 rounded-lg border border-[#252B38]">
            <div className="text-[10px] text-slate-500">NEWS FREQUENCY</div>
            <div className="text-base font-bold text-white mt-0.5">High (Daily)</div>
          </div>
          <div className="bg-[#171C27] p-3 rounded-lg border border-[#252B38]">
            <div className="text-[10px] text-slate-500">COVERAGE CONSENSUS</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">88% Verified</div>
          </div>
          <div className="bg-[#171C27] p-3 rounded-lg border border-[#252B38]">
            <div className="text-[10px] text-slate-500">SECTOR BIAS</div>
            <div className="text-base font-bold text-[#22D3EE] mt-0.5">Balanced</div>
          </div>
          <div className="bg-[#171C27] p-3 rounded-lg border border-[#252B38]">
            <div className="text-[10px] text-slate-500">ACTIVE STORIES</div>
            <div className="text-base font-bold text-[#7C5CFF] mt-0.5">{connectedStories.length} Clustered</div>
          </div>
        </div>
      </div>

      {/* Connected Stories */}
      <div>
        <h3 className="text-sm font-mono font-bold uppercase text-slate-300 mb-3">
          CLUSTERED STORIES INVOLVING {entity.name.toUpperCase()} ({connectedStories.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectedStories.map((story) => (
            <StandardStoryCard key={story.id} story={story} layout="grid" />
          ))}
        </div>
      </div>
    </div>
  );
}

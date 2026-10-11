import React, { useState } from 'react';
import { SQUAD_MEMBERS, SquadMemberHealth } from '../../data/mobileMockData';
import { 
  ChevronRight, 
  Search, 
  AlertTriangle 
} from 'lucide-react';

interface SquadTabProps {
  onSelectPlayer: (player: SquadMemberHealth) => void;
}

export const SquadTab: React.FC<SquadTabProps> = ({ onSelectPlayer }) => {
  const [filterGroup, setFilterGroup] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredMembers = SQUAD_MEMBERS.filter((player) => {
    const matchesGroup = filterGroup === 'All' || player.positionGroup === filterGroup;
    const matchesSearch = 
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      player.position.toLowerCase().includes(search.toLowerCase()) ||
      player.number.toString().includes(search);
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="w-full px-4 space-y-3 pb-24">
      
      {/* Search & Minimal Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search squad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#1F291E] border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00] transition-colors"
          />
        </div>

        {/* Minimal Position Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {['All', 'FW', 'MF', 'DF'].map((group) => (
            <button
              key={group}
              onClick={() => setFilterGroup(group)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer ${
                filterGroup === group
                  ? 'bg-[#CCFF00] text-[#131A12] font-black'
                  : 'bg-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              {group === 'All' ? 'ALL' : group}
            </button>
          ))}
        </div>
      </div>

      {/* Sleek Minimal Roster List */}
      <div className="space-y-2">
        {filteredMembers.map((player) => {
          const hasWarning = player.imu.deviationPct > 8 || player.fatigueStatus === 'Substitution Recommended';

          return (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08] hover:border-[#CCFF00]/40 transition-all cursor-pointer group active:scale-[0.99] shadow-sm flex items-center justify-between gap-3"
            >
              {/* Left: Jersey # & Player Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-xl font-mono font-black text-xs flex items-center justify-center shrink-0 ${
                  hasWarning 
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                    : 'bg-white text-[#131A12]'
                }`}>
                  #{player.number}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white truncate">
                      {player.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#CCFF00] font-bold">
                      {player.position}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5 font-mono">
                    <span>{player.distanceCoveredKm} km</span>
                    <span className="text-zinc-600">·</span>
                    <span>{player.sprintCount} sprints</span>
                    {hasWarning && (
                      <>
                        <span className="text-zinc-600">·</span>
                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          +{player.imu.deviationPct}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Score & Arrow */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-[#CCFF00]">
                    {player.supaRating.overallScore}
                  </span>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">
                    SUPA
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

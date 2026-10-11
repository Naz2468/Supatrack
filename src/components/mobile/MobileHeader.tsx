import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  User, 
  Users, 
  ChevronDown, 
  Camera, 
  Download,
  Activity,
  Sparkles,
  Search,
  X,
  ArrowUpRight
} from 'lucide-react';
import { SquadMemberHealth, SQUAD_MEMBERS } from '../../data/mobileMockData';

export type RoleMode = 'coach' | 'player';

interface MobileHeaderProps {
  onBack: () => void;
  onOpenNotifications: () => void;
  onOpenSnapshots: () => void;
  onExport?: () => void;
  onLiveFeed?: () => void;
  unreadCount: number;
  roleMode: RoleMode;
  onToggleRole: (mode: RoleMode) => void;
  selectedPlayer: SquadMemberHealth;
  onSelectPlayer: (player: SquadMemberHealth) => void;
  onInspectPlayer?: (player: SquadMemberHealth) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onBack,
  onOpenNotifications,
  onOpenSnapshots,
  onExport,
  onLiveFeed,
  unreadCount,
  roleMode,
  onToggleRole,
  selectedPlayer,
  onSelectPlayer,
  onInspectPlayer,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.trim()
    ? SQUAD_MEMBERS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.number.toString().includes(searchQuery) ||
          p.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full space-y-2.5 px-4 pt-1">
      {/* 1. Sleek Minimal Top Navigation Bar */}
      <div className="flex items-center justify-between h-11">
        {/* Left: Brand Identity with Live Pulse */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-8 h-8 rounded-full bg-white text-[#131A12] flex items-center justify-center font-bold shadow-sm hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-1.5 ml-0.5">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00] animate-pulse"></span>
            <span className="text-sm font-black tracking-tight text-white uppercase font-sans">
              SupaTrack
            </span>
          </div>
        </div>

        {/* Right: Clean Minimal Circular Icon Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isSearchOpen 
                ? 'bg-[#CCFF00] text-[#131A12] shadow-[0_0_10px_rgba(204,255,0,0.4)]' 
                : 'bg-white text-[#131A12] hover:bg-zinc-100 shadow-sm'
            }`}
          >
            <Search className="w-3.5 h-3.5 stroke-[2.4]" />
          </button>

          <button
            onClick={onOpenSnapshots}
            aria-label="Snapshots"
            className="w-8 h-8 rounded-full bg-white text-[#131A12] flex items-center justify-center shadow-sm hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 stroke-[2.4]" />
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Alerts"
            className="w-8 h-8 rounded-full bg-white text-[#131A12] flex items-center justify-center shadow-sm hover:bg-zinc-100 active:scale-95 transition-all relative cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 stroke-[2.4]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#CCFF00] text-[#131A12] font-mono font-black text-[8px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Quick Search Bar */}
      {isSearchOpen && (
        <div className="p-2.5 bg-[#1F291E] border border-[#CCFF00]/40 rounded-2xl shadow-xl animate-in fade-in duration-150">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search player..."
              className="w-full bg-[#131A12] text-white text-xs pl-8 pr-7 py-1.5 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#CCFF00] font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-2 max-h-36 overflow-y-auto space-y-1 pt-1 border-t border-white/[0.06]">
              {searchResults.length > 0 ? (
                searchResults.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPlayer(p);
                      onToggleRole('player');
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-[#CCFF00]/15 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-[#CCFF00]">#{p.number}</span>
                      <span className="text-xs font-bold text-white">{p.name}</span>
                      <span className="text-[10px] font-mono text-zinc-400">{p.position}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#CCFF00]">
                      {p.supaRating.overallScore}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-[10px] text-zinc-400 text-center py-1.5">No player found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. Minimal Segmented Mode Pill Switch (Coach vs Player) */}
      <div className="p-0.5 bg-white/[0.06] rounded-xl border border-white/[0.08] grid grid-cols-2 gap-1">
        <button
          onClick={() => onToggleRole('coach')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            roleMode === 'coach'
              ? 'bg-[#CCFF00] text-[#131A12] font-black shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Users className="w-3 h-3" />
          <span>Coach</span>
        </button>

        <button
          onClick={() => onToggleRole('player')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            roleMode === 'player'
              ? 'bg-[#CCFF00] text-[#131A12] font-black shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <User className="w-3 h-3" />
          <span>Player</span>
        </button>
      </div>

      {/* 3. Streamlined Minimal Overview Strip */}
      <div className="rounded-2xl bg-[#1F291E] border border-white/[0.08] p-3 shadow-md">
        {roleMode === 'coach' ? (
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
                <span className="text-xs font-black text-white">MD24 · 76' Live</span>
                <span className="text-[10px] font-mono text-zinc-400">1-0 vs City</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">11 synced · 100Hz RTK</p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onLiveFeed}
                className="py-1 px-2.5 rounded-full bg-[#CCFF00] text-[#131A12] font-black text-[10px] font-mono hover:bg-[#B8F400] active:scale-95 transition-all cursor-pointer"
              >
                LIVE FEED
              </button>
              <button
                type="button"
                onClick={onExport}
                className="py-1 px-2.5 rounded-full bg-white text-[#131A12] font-bold text-[10px] font-mono hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
              >
                EXPORT
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div 
              onClick={() => onInspectPlayer?.(selectedPlayer)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all"
              title="View Player Passport & Telemetry Breakdown"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#131A12] font-black font-mono text-xs flex items-center justify-center shrink-0 shadow-sm">
                #{selectedPlayer.number}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-xs font-black text-white truncate">
                  <span>{selectedPlayer.name}</span>
                  <span className="text-[10px] font-mono text-[#CCFF00]">({selectedPlayer.position})</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-400" />
                </div>
                <p className="text-[10px] text-zinc-400 font-mono truncate">{selectedPlayer.supaRating.roleTitle}</p>
              </div>
            </div>

            <div className="relative shrink-0">
              <select
                aria-label="Select Player"
                value={selectedPlayer.id}
                onChange={(e) => {
                  const p = SQUAD_MEMBERS.find((m) => m.id === e.target.value);
                  if (p) onSelectPlayer(p);
                }}
                className="bg-[#243023] text-[10px] font-mono font-bold text-white border border-white/[0.12] rounded-lg px-2 py-1 pr-5 appearance-none focus:outline-none focus:border-[#CCFF00] cursor-pointer"
              >
                {SQUAD_MEMBERS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#1F291E] text-white">
                    #{m.number} {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-zinc-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

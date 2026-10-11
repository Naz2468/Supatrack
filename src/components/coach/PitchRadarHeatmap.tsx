/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Radar, 
  Flame, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Zap,
  Activity,
  Compass
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface PitchRadarHeatmapProps {
  players: SquadMemberHealth[];
  selectedPlayer: SquadMemberHealth;
  onSelectPlayer: (player: SquadMemberHealth) => void;
  onInspectPlayer: (player: SquadMemberHealth) => void;
  onFlagSub: (player: SquadMemberHealth) => void;
  flaggedPlayerIds: string[];
}

export const PitchRadarHeatmap: React.FC<PitchRadarHeatmapProps> = ({
  players,
  selectedPlayer,
  onSelectPlayer,
  onInspectPlayer,
  onFlagSub,
  flaggedPlayerIds,
}) => {
  const [viewMode, setViewMode] = useState<'radar' | 'heatmap'>('radar');

  return (
    <div className="w-full px-5 space-y-3">
      {/* Pitch Header & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Live Pitch Radar · 4-3-3 Grid
          </h2>
        </div>

        {/* Radar / Heatmap Mode Tabs */}
        <div className="p-1 bg-[#F5FAF6] rounded-full border border-[#DEEEDE] flex items-center">
          <button
            onClick={() => setViewMode('radar')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'radar'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Tactical Nodes
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'heatmap'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Workload Heat
          </button>
        </div>
      </div>

      {/* Clean Retrowaves Green Pitch Surface */}
      <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#EBF7EE] border border-[#DCF0DF] overflow-hidden p-4 shadow-xs select-none">
        {/* Pitch Tactical Markings (Crisp white lines with soft green turf) */}
        <div className="absolute inset-3 border-2 border-[#C9E7CE] rounded-xl pointer-events-none">
          {/* Halfway line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C9E7CE]" />
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#C9E7CE]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C9E7CE]" />

          {/* Left Penalty Box (Defense) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-14 h-28 border-2 border-l-0 border-[#C9E7CE]" />
          {/* Left Goal Area */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-6 h-14 border-2 border-l-0 border-[#C9E7CE]" />

          {/* Right Penalty Box (Attack) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-14 h-28 border-2 border-r-0 border-[#C9E7CE]" />
          {/* Right Goal Area */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-6 h-14 border-2 border-r-0 border-[#C9E7CE]" />
        </div>

        {/* Heatmap density blobs when heatmap mode is active */}
        {viewMode === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none opacity-40 transition-opacity">
            <div className="absolute top-1/3 left-2/3 w-32 h-32 rounded-full bg-emerald-400 blur-2xl" />
            <div className="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-emerald-300 blur-2xl" />
            <div className="absolute top-2/3 left-1/2 w-24 h-24 rounded-full bg-amber-400 blur-2xl" />
          </div>
        )}

        {/* 11 Active Player Telemetry Nodes */}
        <div className="absolute inset-3">
          {players.slice(0, 11).map((player, idx) => {
            const isSelected = selectedPlayer.id === player.id;
            const isFlagged = flaggedPlayerIds.includes(player.id);
            const isWarning = player.imu.deviationPct >= 10;

            // Normalized pitch coordinates for 4-3-3 formation
            const coords = [
              { x: 8, y: 50 },  // GK #1
              { x: 26, y: 18 }, // LB #3
              { x: 24, y: 38 }, // CB #4
              { x: 24, y: 62 }, // CB #5
              { x: 26, y: 82 }, // RB #2
              { x: 48, y: 50 }, // CDM #6
              { x: 62, y: 28 }, // CM #8
              { x: 64, y: 72 }, // CM #10
              { x: 78, y: 18 }, // LW #11
              { x: 86, y: 50 }, // ST #9
              { x: 78, y: 82 }, // RW #7 Alvarez
            ];

            const pos = coords[idx] || { x: 50, y: 50 };

            return (
              <button
                key={player.id}
                onClick={() => onSelectPlayer(player)}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all cursor-pointer group z-10`}
              >
                {/* Visual pulse for flagged or warning player */}
                {isWarning && (
                  <span className="absolute -inset-1 rounded-full bg-rose-400/40 animate-ping" />
                )}

                {/* Player Node Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px] transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#16A34A] text-white ring-4 ring-[#16A34A]/30 scale-125'
                      : isWarning
                      ? 'bg-rose-600 text-white ring-2 ring-rose-300'
                      : isFlagged
                      ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                      : 'bg-white text-[#132216] border border-[#DCF0DF] hover:bg-[#EBF7EE]'
                  }`}
                >
                  #{player.number}
                </div>

                {/* Small Name Pill on Hover or Selection */}
                <span
                  className={`mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap transition-all shadow-xs ${
                    isSelected
                      ? 'bg-[#132216] text-white'
                      : 'bg-white/90 text-zinc-700 border border-[#DCF0DF]'
                  }`}
                >
                  {player.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Athlete Inspector Card */}
      <div className="p-4 rounded-3xl bg-white border border-[#DCF0DF] shadow-xs">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center font-black text-base border border-[#DCF0DF]">
              #{selectedPlayer.number}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-[#132216]">
                  {selectedPlayer.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7EE] text-[#16A34A] border border-[#DCF0DF]">
                  {selectedPlayer.position}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-semibold mt-0.5">
                Supa Rating: {selectedPlayer.supaRating.overallScore}/100 · {selectedPlayer.positionGroup}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-[#16A34A] block">
              {selectedPlayer.topSpeedKmh} km/h
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">
              Peak Speed
            </span>
          </div>
        </div>

        {/* 3 Telemetry Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#F0F6F1] text-center">
          <div className="bg-[#F8FAF8] rounded-xl p-2 border border-[#E5EFE6]">
            <span className="text-[10px] text-zinc-500 font-semibold block">Distance</span>
            <span className="text-xs font-black text-[#132216]">
              {selectedPlayer.distanceCoveredKm} km
            </span>
          </div>
          <div className="bg-[#F8FAF8] rounded-xl p-2 border border-[#E5EFE6]">
            <span className="text-[10px] text-zinc-500 font-semibold block">Sprints (&gt;20km/h)</span>
            <span className="text-xs font-black text-[#132216]">
              {selectedPlayer.sprintCount}
            </span>
          </div>
          <div className={`rounded-xl p-2 border ${
            selectedPlayer.imu.deviationPct >= 10
              ? 'bg-rose-50 border-rose-200'
              : 'bg-[#F8FAF8] border-[#E5EFE6]'
          }`}>
            <span className="text-[10px] text-zinc-500 font-semibold block">Gait Asym</span>
            <span className={`text-xs font-black ${
              selectedPlayer.imu.deviationPct >= 10 ? 'text-rose-600' : 'text-[#16A34A]'
            }`}>
              +{selectedPlayer.imu.deviationPct}%
            </span>
          </div>
        </div>

        {/* Actions for this selected player */}
        <div className="flex items-center gap-2 mt-3 pt-2">
          <button
            onClick={() => onInspectPlayer(selectedPlayer)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#F5FAF6] border border-[#DEEEDE] hover:bg-emerald-50 text-[#16A34A] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Full Bio-Telemetry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onFlagSub(selectedPlayer)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs ${
              flaggedPlayerIds.includes(selectedPlayer.id)
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-white border border-[#DCF0DF] text-zinc-700 hover:border-rose-300 hover:text-rose-600'
            }`}
          >
            {flaggedPlayerIds.includes(selectedPlayer.id) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-700" />
                <span>Flagged</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Advise Sub</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

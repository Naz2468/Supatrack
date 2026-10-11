/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowUpDown, 
  Zap, 
  Activity, 
  Flame, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  TrendingUp 
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface SquadLeaderboardProps {
  players: SquadMemberHealth[];
  onInspectPlayer: (player: SquadMemberHealth) => void;
}

type SortMetric = 'workRate' | 'sprints' | 'efficiency' | 'distance';

export const SquadLeaderboard: React.FC<SquadLeaderboardProps> = ({
  players,
  onInspectPlayer,
}) => {
  const [sortMetric, setSortMetric] = useState<SortMetric>('workRate');

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortMetric === 'workRate') {
      return b.sprintAvgKmh - a.sprintAvgKmh;
    }
    if (sortMetric === 'sprints') {
      return b.sprintCount - a.sprintCount;
    }
    if (sortMetric === 'efficiency') {
      return b.supaRating.tacticalEfficiency - a.supaRating.tacticalEfficiency;
    }
    if (sortMetric === 'distance') {
      return b.distanceCoveredKm - a.distanceCoveredKm;
    }
    return 0;
  });

  return (
    <div className="w-full px-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Live Squad Leaderboard
          </h2>
        </div>
        <span className="text-[11px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2.5 py-0.5 rounded-full border border-[#DCF0DF]">
          Ranked Live
        </span>
      </div>

      {/* Metric Sort Tabs (Pill style matching consumer analysis) */}
      <div className="p-1 bg-[#F5FAF6] border border-[#DEEEDE] rounded-2xl flex items-center justify-between gap-1 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setSortMetric('workRate')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer text-center ${
            sortMetric === 'workRate'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Work Rate
        </button>
        <button
          onClick={() => setSortMetric('sprints')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer text-center ${
            sortMetric === 'sprints'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Sprint Count
        </button>
        <button
          onClick={() => setSortMetric('efficiency')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer text-center ${
            sortMetric === 'efficiency'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Tactical Eff
        </button>
        <button
          onClick={() => setSortMetric('distance')}
          className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer text-center ${
            sortMetric === 'distance'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Distance
        </button>
      </div>

      {/* Leaderboard Cards List */}
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => {
          const isTop3 = index < 3;
          const isAsymWarning = player.imu.deviationPct >= 10;

          return (
            <div
              key={player.id}
              onClick={() => onInspectPlayer(player)}
              className="p-3.5 rounded-2xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-all cursor-pointer flex items-center justify-between shadow-xs group"
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                    index === 0
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : index === 1
                      ? 'bg-zinc-200 text-zinc-800'
                      : index === 2
                      ? 'bg-amber-700/20 text-amber-800'
                      : 'bg-[#F5FAF6] text-zinc-500'
                  }`}
                >
                  {index + 1}
                </div>

                <div className="w-9 h-9 rounded-xl bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center font-black text-xs border border-[#DCF0DF]">
                  #{player.number}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-black text-[#132216] group-hover:text-[#16A34A] transition-colors">
                      {player.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-zinc-400">
                      {player.position}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500">
                    <span>{player.distanceCoveredKm} km</span>
                    <span>·</span>
                    <span>{player.sprintCount} sprints</span>
                    {isAsymWarning && (
                      <span className="text-rose-600 font-bold">
                        · +{player.imu.deviationPct}% asym
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Metric Value */}
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <span className="text-xs font-black text-[#16A34A] block">
                    {sortMetric === 'workRate' && `${player.sprintAvgKmh} km/h`}
                    {sortMetric === 'sprints' && `${player.sprintCount} bursts`}
                    {sortMetric === 'efficiency' && `${player.supaRating.tacticalEfficiency}%`}
                    {sortMetric === 'distance' && `${player.distanceCoveredKm} km`}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    Supa: {player.supaRating.overallScore}/100
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

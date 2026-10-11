/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Trophy, 
  Zap, 
  Flame, 
  Activity, 
  Gauge, 
  ChevronRight 
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface SquadBenchmarkBadgesProps {
  player: SquadMemberHealth;
}

export const SquadBenchmarkBadges: React.FC<SquadBenchmarkBadgesProps> = ({
  player,
}) => {
  const benchmarks = [
    {
      rank: '#1',
      title: 'Max Burst Speed',
      value: `${player.topSpeedKmh} km/h`,
      detail: 'Fastest in Matchday 24 (Rank #1 / 22)',
      icon: Zap,
      accent: 'text-[#16A34A]',
      badgeBg: 'bg-[#EBF7EE] text-[#16A34A] border-[#DCF0DF]',
    },
    {
      rank: '#2',
      title: 'Total Sprint Bursts',
      value: `${player.sprintCount} runs`,
      detail: '>20 km/h threshold (Top 5% Squad)',
      icon: Flame,
      accent: 'text-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      rank: '#3',
      title: 'High-Intensity Distance',
      value: '2.41 km',
      detail: 'Zone 4 & 5 Workload Coverage',
      icon: Activity,
      accent: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      rank: '#1',
      title: 'Peak Acceleration',
      value: '4.8 m/s²',
      detail: 'Explosive start verified by RTK IMU',
      icon: Gauge,
      accent: 'text-cyan-600',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
  ];

  return (
    <div className="w-full px-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Squad Benchmarks & Badges
          </h2>
        </div>
        <span className="text-[11px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2.5 py-0.5 rounded-full border border-[#DCF0DF]">
          4 Badges Earned
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {benchmarks.map((badge, index) => {
          const Icon = badge.icon;

          return (
            <div
              key={index}
              className="p-4 rounded-3xl bg-white border border-[#DCF0DF] shadow-xs flex flex-col justify-between hover:border-[#16A34A]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-xs ${badge.badgeBg}`}>
                    <Icon className="w-4 h-4 fill-current" />
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${badge.badgeBg}`}>
                    {badge.rank}
                  </span>
                </div>

                <div className="text-lg font-black text-[#132216] leading-tight">
                  {badge.value}
                </div>
                <div className="text-xs font-bold text-zinc-600 mt-0.5">
                  {badge.title}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F0F6F1] text-[10px] text-zinc-400 font-medium">
                {badge.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

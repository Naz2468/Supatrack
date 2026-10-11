/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Zap, 
  Activity, 
  ChevronRight, 
  Trophy,
  Flame,
  Gauge,
  Compass
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';
import { DrillDownMetricType } from '../mobile/MetricDrillDownModal';

interface PersonalPerformanceCardProps {
  player: SquadMemberHealth;
  onOpenMetricDrillDown: (metric: DrillDownMetricType) => void;
  onInspectOverview: () => void;
}

export const PersonalPerformanceCard: React.FC<PersonalPerformanceCardProps> = ({
  player,
  onOpenMetricDrillDown,
  onInspectOverview,
}) => {
  return (
    <div className="w-full px-5 space-y-3">
      {/* 1. Primary Supa Rating Match Card - Hero Green Container */}
      <div 
        onClick={onInspectOverview}
        className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] relative overflow-hidden shadow-xs cursor-pointer hover:border-[#16A34A]/40 transition-all active:scale-[0.99] group"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-bold uppercase tracking-wider">
              <span>Supa Rating</span>
              <span>·</span>
              <span>{player.position}</span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-[#132216] tracking-tight">
                {player.supaRating.overallScore}
              </span>
              <span className="text-xs text-zinc-400 font-bold">/100</span>
            </div>

            <h3 className="text-sm font-bold text-[#132216] mt-0.5">
              {player.supaRating.roleTitle}
            </h3>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border border-[#DCF0DF] text-right shadow-xs">
            <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Tactical Eff</span>
            <span className="text-sm font-black text-[#16A34A]">
              {player.supaRating.tacticalEfficiency}%
            </span>
          </div>
        </div>

        {/* 3 Sub-Rating Breakdown Bars */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#D5EBD8]">
          <div className="bg-white/90 rounded-2xl p-2.5 text-center border border-[#DCF0DF]">
            <span className="text-[10px] font-semibold text-zinc-400 block">{player.supaRating.primaryTrait1.name}</span>
            <span className="text-xs font-black text-[#132216]">{player.supaRating.primaryTrait1.score}%</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-2.5 text-center border border-[#DCF0DF]">
            <span className="text-[10px] font-semibold text-zinc-400 block">{player.supaRating.primaryTrait2.name}</span>
            <span className="text-xs font-black text-[#132216]">{player.supaRating.primaryTrait2.score}%</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-2.5 text-center border border-[#DCF0DF]">
            <span className="text-[10px] font-semibold text-zinc-400 block">Recovery</span>
            <span className="text-xs font-black text-[#16A34A]">{player.recoveryScore}%</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[#16A34A] font-bold">
          <span>Matchday Performance Analysis</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 2. Interactive Telemetry Metrics 2x2 Grid (Clickable Drill Down) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Metric A: Top Speed */}
        <div 
          onClick={() => onOpenMetricDrillDown('sprints')}
          className="p-4 rounded-3xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-1">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <Zap className="w-4 h-4 fill-current" />
              Peak Speed
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="text-2xl font-black text-[#132216] mt-1">
            {player.topSpeedKmh} <span className="text-xs font-normal text-zinc-400">km/h</span>
          </div>
          <span className="text-[11px] font-bold text-[#16A34A] mt-1 inline-block">
            Rank #1 in Squad
          </span>
        </div>

        {/* Metric B: Total Distance */}
        <div 
          onClick={() => onOpenMetricDrillDown('distance')}
          className="p-4 rounded-3xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-1">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <Compass className="w-4 h-4" />
              Total Distance
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="text-2xl font-black text-[#132216] mt-1">
            {player.distanceCoveredKm} <span className="text-xs font-normal text-zinc-400">km</span>
          </div>
          <span className="text-[11px] font-semibold text-zinc-500 mt-1 inline-block">
            High Work Rate
          </span>
        </div>

        {/* Metric C: Sprints > 20 km/h */}
        <div 
          onClick={() => onOpenMetricDrillDown('sprints')}
          className="p-4 rounded-3xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-1">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <Flame className="w-4 h-4 fill-current text-amber-500" />
              Sprints (&gt;20km/h)
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="text-2xl font-black text-[#132216] mt-1">
            {player.sprintCount} <span className="text-xs font-normal text-zinc-400">runs</span>
          </div>
          <span className="text-[11px] font-bold text-amber-600 mt-1 inline-block">
            Avg {player.sprintAvgKmh} km/h
          </span>
        </div>

        {/* Metric D: Heart Rate Zone */}
        <div 
          onClick={() => onOpenMetricDrillDown('heartRate')}
          className="p-4 rounded-3xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <Heart className="w-4 h-4 fill-current" />
              Heart Rate
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="text-2xl font-black text-[#132216] mt-1">
            {player.heartRate} <span className="text-xs font-normal text-zinc-400">bpm</span>
          </div>
          <span className="text-[11px] font-bold text-rose-600 mt-1 inline-block">
            18m in Zone 5
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  BarChart2, 
  Compass, 
  Zap, 
  Heart, 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  Flame, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { WEEKLY_DAYS } from '../../../data/consumerData';

interface AnalysisScreenProps {
  onOpenDeepDive: (metric: 'distance' | 'sprints' | 'heart_rate' | 'recovery') => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onOpenDeepDive }) => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const maxDayKm = Math.max(...WEEKLY_DAYS.map((d) => d.distanceKm));

  return (
    <div className="min-h-full pb-24 bg-white text-[#132216]">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 pt-4 pb-3 border-b border-[#EAF2EB]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-black text-[#132216] tracking-tight">Performance Analysis</h1>
            <p className="text-xs text-zinc-400 font-medium">Sports science telemetry & workload</p>
          </div>
          <span className="text-[11px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Optimal State</span>
          </span>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex bg-[#F3F8F4] p-1 rounded-2xl border border-[#DEEEDE]">
          {(['day', 'week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                period === p
                  ? 'bg-white text-[#16A34A] shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Weekly Load Summary Card */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              {period === 'week' ? 'Weekly Workload Aggregate' : 'Workload Volume'}
            </span>
            <span className="text-[11px] font-bold bg-white text-[#16A34A] px-2.5 py-0.5 rounded-full shadow-xs">
              +12% vs Baseline
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-[#132216]">38.6 km</span>
            <span className="text-xs font-bold text-zinc-500">across 5 sessions</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#D5EBD8]">
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Active Time</span>
              <span className="text-sm font-black text-[#132216]">3h 24m</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Calories</span>
              <span className="text-sm font-black text-[#132216]">2,840 kcal</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">ACWR Sweet Spot</span>
              <span className="text-sm font-black text-[#16A34A]">1.08</span>
            </div>
          </div>
        </div>

        {/* Interactive Telemetry Deep Dive Hub */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#132216]">Core Telemetry Hub</h2>
            <span className="text-[11px] font-bold text-zinc-400">Detailed biometric graphs</span>
          </div>

          <div className="space-y-3">
            {/* 1. Distance Deep Dive */}
            <div
              onClick={() => onOpenDeepDive('distance')}
              className="bg-white rounded-2xl p-4 border border-[#E5EFE6] hover:border-[#16A34A] transition-all shadow-xs flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#132216] group-hover:text-[#16A34A] transition-colors">
                    Distance & Split Pace
                  </h3>
                  <p className="text-[11px] text-zinc-400">38.6 km total • 4'48"/km pace • +341m elevation</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
            </div>

            {/* 2. Sprints Deep Dive */}
            <div
              onClick={() => onOpenDeepDive('sprints')}
              className="bg-white rounded-2xl p-4 border border-[#E5EFE6] hover:border-[#16A34A] transition-all shadow-xs flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#132216] group-hover:text-[#16A34A] transition-colors">
                    Sprint Frequency & Velocity
                  </h3>
                  <p className="text-[11px] text-zinc-400">24 Sprints &gt; 20km/h • Peak 32.4 km/h • -7.8% decay</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
            </div>

            {/* 3. Heart Rate Deep Dive */}
            <div
              onClick={() => onOpenDeepDive('heart_rate')}
              className="bg-white rounded-2xl p-4 border border-[#E5EFE6] hover:border-[#16A34A] transition-all shadow-xs flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-red-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#132216] group-hover:text-red-500 transition-colors">
                    Heart Rate Zones 1-5
                  </h3>
                  <p className="text-[11px] text-zinc-400">148 bpm avg • 182 bpm peak • 1-min drop -34 bpm</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
            </div>

            {/* 4. Recovery Deep Dive */}
            <div
              onClick={() => onOpenDeepDive('recovery')}
              className="bg-white rounded-2xl p-4 border border-[#E5EFE6] hover:border-[#16A34A] transition-all shadow-xs flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#132216] group-hover:text-[#16A34A] transition-colors">
                    Recovery Readiness Score
                  </h3>
                  <p className="text-[11px] text-zinc-400">86% Optimal • 89 Sleep Quality • Low muscle strain</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
            </div>
          </div>
        </div>

        {/* Weekly Mileage Chart */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#132216]">Weekly Session Volume</h3>
            <span className="text-xs font-semibold text-zinc-400">Target: 40 km</span>
          </div>

          <div className="h-40 flex items-end justify-between gap-2 pt-2 px-1">
            {WEEKLY_DAYS.map((d, idx) => {
              const heightPct = Math.round((d.distanceKm / maxDayKm) * 100);
              const isToday = d.day === 'Sat';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-zinc-500">{d.distanceKm || '-'}</span>
                  <div className="w-full max-w-[28px] h-28 bg-[#F3F8F4] rounded-t-xl flex items-end overflow-hidden p-0.5">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-[#15803D] to-[#22C55E]'
                          : d.distanceKm > 0
                          ? 'bg-[#A3E0AF]'
                          : 'bg-transparent'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      isToday ? 'text-[#16A34A]' : 'text-zinc-400'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

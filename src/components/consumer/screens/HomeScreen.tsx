import React from 'react';
import { 
  Bell, 
  Flame, 
  Timer, 
  Gauge, 
  Zap, 
  Target, 
  ChevronRight, 
  Compass, 
  Heart, 
  Activity, 
  ShieldCheck, 
  TrendingUp,
  Plus
} from 'lucide-react';
import { ConsumerProfile, WorkoutSession } from '../../../data/consumerData';

interface HomeScreenProps {
  profile: ConsumerProfile;
  workouts: WorkoutSession[];
  onOpenLive: () => void;
  onOpenSetGoal: () => void;
  onOpenDeepDive: (metric: 'distance' | 'sprints' | 'heart_rate' | 'recovery') => void;
  onOpenHistory: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  workouts,
  onOpenLive,
  onOpenSetGoal,
  onOpenDeepDive,
  onOpenHistory,
}) => {
  const todayRun = workouts[0];
  const todayKm = todayRun ? todayRun.distanceKm : 7.4;
  const targetKm = 10.0;
  const progressPct = Math.min(100, Math.round((todayKm / targetKm) * 100));

  return (
    <div className="min-h-full pb-24 bg-white text-[#132216]">
      {/* 1. Header Bar */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#16A34A] shadow-xs"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 font-semibold">Good Morning,</span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#EBF7EE] px-2 py-0.5 rounded-full">
                Oct 11
              </span>
            </div>
            <h1 className="text-base font-black text-[#132216] leading-tight">
              {profile.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('No new telemetry alerts. All sensors nominal.')}
            className="w-9 h-9 rounded-full bg-[#F5FAF6] border border-[#DEEEDE] flex items-center justify-center text-zinc-600 hover:text-[#16A34A] transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#16A34A]" />
          </button>
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* 2. Main Daily Progress Card (Circular Radial Ring) */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Daily Volume Progress</span>
            </span>
            <button
              onClick={onOpenSetGoal}
              className="text-[11px] font-bold text-[#16A34A] bg-white px-2.5 py-1 rounded-full shadow-xs hover:bg-emerald-50 cursor-pointer flex items-center gap-1"
            >
              <span>Goal: {targetKm} km</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Circular Radial Gauge */}
          <div className="relative w-40 h-40 mx-auto my-3 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#D3EED7]"
                strokeWidth="9"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#16A34A]"
                strokeWidth="9"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - progressPct / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-[#132216] tracking-tight">{todayKm}</span>
              <span className="text-[11px] font-bold text-zinc-400">of {targetKm} km</span>
              <span className="text-[10px] font-black text-[#16A34A] mt-0.5">{progressPct}% Done</span>
            </div>
          </div>

          {/* 3 Sub-KPIs below the ring */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D5EBD8]">
            <div className="bg-white/90 rounded-2xl p-2.5 text-center border border-[#DCF0DF]">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                <Flame className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-black text-[#132216] block">520 kcal</span>
              <span className="text-[9px] font-semibold text-zinc-400">Burned</span>
            </div>

            <div className="bg-white/90 rounded-2xl p-2.5 text-center border border-[#DCF0DF]">
              <div className="flex items-center justify-center gap-1 text-[#16A34A] mb-0.5">
                <Timer className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-[#132216] block">38 min</span>
              <span className="text-[9px] font-semibold text-zinc-400">Duration</span>
            </div>

            <div className="bg-white/90 rounded-2xl p-2.5 text-center border border-[#DCF0DF]">
              <div className="flex items-center justify-center gap-1 text-[#16A34A] mb-0.5">
                <Gauge className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-[#132216] block">5'08"</span>
              <span className="text-[9px] font-semibold text-zinc-400">Avg Pace</span>
            </div>
          </div>
        </div>

        {/* 3. Quick Action Launch Cards */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenLive}
            className="p-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white flex flex-col justify-between text-left shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white mb-3">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-sm font-black block">Start Live Run</span>
              <span className="text-[10px] text-emerald-100 font-medium">GPS & 100Hz Telemetry</span>
            </div>
          </button>

          <button
            onClick={onOpenSetGoal}
            className="p-4 rounded-2xl bg-[#F0F8F1] hover:bg-[#E2F4E5] border border-[#DEEEDE] text-left flex flex-col justify-between transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#16A34A] text-white flex items-center justify-center mb-3">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-black text-[#132216] block">Set Fitness Target</span>
              <span className="text-[10px] text-[#48634E] font-medium">{profile.weeklyGoalKm} km Target</span>
            </div>
          </button>
        </div>

        {/* 4. Interactive Telemetry Deep Dive Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#132216]">Telemetry Deep Dives</h2>
            <span className="text-[11px] font-bold text-zinc-400">Tap to inspect</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* A. Distance */}
            <button
              onClick={() => onOpenDeepDive('distance')}
              className="p-4 rounded-2xl bg-white border border-[#E5EFE6] hover:border-[#16A34A]/50 shadow-xs text-left transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-zinc-400 block">Distance Covered</span>
              <span className="text-lg font-black text-[#132216] block mt-0.5">38.6 km</span>
              <span className="text-[10px] font-bold text-[#16A34A] block mt-1">+12% vs last week</span>
            </button>

            {/* B. Sprints */}
            <button
              onClick={() => onOpenDeepDive('sprints')}
              className="p-4 rounded-2xl bg-white border border-[#E5EFE6] hover:border-[#16A34A]/50 shadow-xs text-left transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-zinc-400 block">Sprints (&gt; 20km/h)</span>
              <span className="text-lg font-black text-[#132216] block mt-0.5">24 runs</span>
              <span className="text-[10px] font-bold text-[#16A34A] block mt-1">32.4 km/h Peak</span>
            </button>

            {/* C. Heart Rate */}
            <button
              onClick={() => onOpenDeepDive('heart_rate')}
              className="p-4 rounded-2xl bg-white border border-[#E5EFE6] hover:border-[#16A34A]/50 shadow-xs text-left transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#FEE2E2] text-red-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-zinc-400 block">Heart Rate</span>
              <span className="text-lg font-black text-[#132216] block mt-0.5">148 bpm</span>
              <span className="text-[10px] font-bold text-[#16A34A] block mt-1">Zone 3 Aerobic</span>
            </button>

            {/* D. Recovery */}
            <button
              onClick={() => onOpenDeepDive('recovery')}
              className="p-4 rounded-2xl bg-white border border-[#E5EFE6] hover:border-[#16A34A]/50 shadow-xs text-left transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#16A34A] transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-zinc-400 block">Recovery Readiness</span>
              <span className="text-lg font-black text-[#16A34A] block mt-0.5">86% Ready</span>
              <span className="text-[10px] font-bold text-zinc-400 block mt-1">Optimal State</span>
            </button>
          </div>
        </div>

        {/* 5. Recent Workouts Stream */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#132216]">Recent Workout Telemetry</h2>
            <button
              onClick={onOpenHistory}
              className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {workouts.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="bg-[#F8FAF8] rounded-2xl p-3.5 border border-[#E5EFE6] flex items-center justify-between hover:bg-[#F0F8F1] transition-colors cursor-pointer"
                onClick={onOpenHistory}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DEEEDE] text-[#16A34A] flex items-center justify-center font-bold text-xs shadow-xs">
                    🏃
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#132216]">{w.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium mt-0.5">
                      <span>{w.date}</span>
                      <span>•</span>
                      <span>{w.routeTitle}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-[#132216] block">{w.distanceKm} km</span>
                  <span className="text-[10px] font-semibold text-[#16A34A] block">{w.avgPace}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Calendar, 
  Compass, 
  Flame, 
  Timer, 
  Gauge, 
  Heart, 
  ChevronRight, 
  Mountain, 
  Zap,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { WorkoutSession } from '../../../data/consumerData';

interface HistoryScreenProps {
  workouts: WorkoutSession[];
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ workouts }) => {
  const [filterType, setFilterType] = useState<'all' | 'run' | 'cycle' | 'trail'>('all');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession | null>(null);

  const filteredWorkouts = filterType === 'all' 
    ? workouts 
    : workouts.filter((w) => w.type === filterType);

  return (
    <div className="min-h-full pb-24 bg-white text-[#132216]">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 pt-4 pb-3 border-b border-[#EAF2EB]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-black text-[#132216] tracking-tight">Workout Telemetry History</h1>
            <p className="text-xs text-zinc-400 font-medium">Verified solo athletic training logs</p>
          </div>
          <span className="text-[11px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2.5 py-1 rounded-full">
            5 Completed
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Activities' },
            { id: 'run', label: 'Solo Runs' },
            { id: 'trail', label: 'Trail Runs' },
            { id: 'cycle', label: 'Cycling' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterType === f.id
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'bg-[#F3F8F4] text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Weekly Completion Banner */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Weekly Training Volume Report</span>
            </span>
            <span className="text-[11px] font-bold bg-white text-[#16A34A] px-2 py-0.5 rounded-full shadow-xs">
              Oct 06 - 12
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-3 pt-2 border-t border-[#D5EBD8] text-center">
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Distance</span>
              <span className="text-sm font-black text-[#132216]">38.6 km</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Sessions</span>
              <span className="text-sm font-black text-[#132216]">5</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Active Time</span>
              <span className="text-sm font-black text-[#132216]">3h 24m</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Energy</span>
              <span className="text-sm font-black text-[#132216]">2,840 kcal</span>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-[#132216]">Completed Workout Sessions</h2>

          {filteredWorkouts.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedWorkout(selectedWorkout?.id === w.id ? null : w)}
              className="bg-white rounded-2xl p-4 border border-[#E5EFE6] hover:border-[#16A34A] transition-all shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center font-bold text-base">
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
                  <span className="text-base font-black text-[#132216] block">{w.distanceKm} km</span>
                  <span className="text-[10px] font-bold text-[#16A34A] block">{w.avgPace}</span>
                </div>
              </div>

              {/* Expandable Telemetry Drawer */}
              {selectedWorkout?.id === w.id && (
                <div className="mt-4 pt-3 border-t border-[#F0F5F0] grid grid-cols-4 gap-2 text-center bg-[#F9FAF9] p-3 rounded-xl animate-in fade-in duration-150">
                  <div>
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase block">Avg HR</span>
                    <span className="text-xs font-black text-[#132216]">{w.avgHr} bpm</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase block">Max HR</span>
                    <span className="text-xs font-black text-red-500">{w.maxHr} bpm</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase block">Elevation</span>
                    <span className="text-xs font-black text-[#132216]">+{w.elevationM}m</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase block">Sprints</span>
                    <span className="text-xs font-black text-[#16A34A]">{w.sprintsCount} runs</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowLeft, TrendingUp, Compass, Award, Calendar, Share2, Mountain, Flame } from 'lucide-react';
import { WEEKLY_DAYS } from '../../../data/consumerData';

interface DistanceDeepDiveProps {
  onBack: () => void;
}

export const DistanceDeepDive: React.FC<DistanceDeepDiveProps> = ({ onBack }) => {
  const maxDayKm = Math.max(...WEEKLY_DAYS.map((d) => d.distanceKm));

  return (
    <div className="min-h-full pb-20 bg-white text-[#132216]">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3 border-b border-[#EAF2EB] flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#F0F8F1] flex items-center justify-center text-[#16A34A] hover:bg-[#E2F4E5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-black text-[#132216] tracking-tight">Distance Telemetry</span>
        <button
          onClick={() => alert('Exporting Distance Telemetry (GPX/CSV)...')}
          className="w-9 h-9 rounded-full bg-[#F0F8F1] flex items-center justify-center text-[#16A34A] hover:bg-[#E2F4E5] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Hero Card */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Weekly Mileage Volume</span>
            </span>
            <span className="text-[11px] font-bold bg-white text-[#16A34A] px-2.5 py-1 rounded-full shadow-xs">
              96.5% of Goal
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-[#132216]">38.6</span>
            <span className="text-base font-bold text-zinc-500">/ 40.0 km</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-white rounded-full mt-3 overflow-hidden p-0.5 border border-[#D5EBD8]">
            <div
              className="h-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] rounded-full transition-all duration-500"
              style={{ width: '96.5%' }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-zinc-500 font-medium mt-2">
            <span>Pace: 4'48"/km avg</span>
            <span>+12% vs previous 7-day cycle</span>
          </div>
        </div>

        {/* Daily Mileage Bar Distribution */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#132216]">Daily Mileage Distribution</h3>
            <span className="text-xs font-semibold text-zinc-400">Oct 06 - Oct 12</span>
          </div>

          {/* Bar Chart */}
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2">
            {WEEKLY_DAYS.map((d, idx) => {
              const heightPct = Math.round((d.distanceKm / maxDayKm) * 100);
              const isToday = d.day === 'Sat';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-zinc-500">
                    {d.distanceKm > 0 ? `${d.distanceKm}` : '-'}
                  </span>
                  <div className="w-full max-w-[28px] h-28 bg-[#F3F8F4] rounded-t-xl flex items-end overflow-hidden p-0.5">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-[#15803D] to-[#22C55E] shadow-sm'
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

        {/* Sports Science Telemetry Breakdown Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Award className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Longest Session</span>
            </div>
            <span className="text-lg font-black text-[#132216]">14.2 km</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Aerobic base build</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">High Intensity (HID)</span>
            </div>
            <span className="text-lg font-black text-[#132216]">6.8 km</span>
            <span className="text-[10px] text-[#16A34A] font-bold block mt-0.5">17.6% of total</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Mountain className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Elevation Gain</span>
            </div>
            <span className="text-lg font-black text-[#132216]">+341 m</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Cumulative ascent</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-bold">Total Burn</span>
            </div>
            <span className="text-lg font-black text-[#132216]">2,840 kcal</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Energy expenditure</span>
          </div>
        </div>

        {/* Tactical Telemetry Insight */}
        <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-[#D5EBD8]">
          <span className="text-xs font-bold text-[#16A34A] block mb-1 uppercase tracking-wider">
            Sports Science Telemetry Insight
          </span>
          <p className="text-xs text-[#223927] leading-relaxed">
            Your weekly aerobic mileage sits right in the high-efficiency zone. High-Intensity Distance (HID) comprises 17.6%, which safely promotes capillary adaptation and VO2 capacity without neuromuscular overload.
          </p>
        </div>
      </div>
    </div>
  );
};

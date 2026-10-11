import React from 'react';
import { ArrowLeft, Zap, Gauge, Timer, TrendingDown, Share2, Award, Flame } from 'lucide-react';
import { SPRINT_INTERVALS } from '../../../data/consumerData';

interface SprintsDeepDiveProps {
  onBack: () => void;
}

export const SprintsDeepDive: React.FC<SprintsDeepDiveProps> = ({ onBack }) => {
  const peakSpeed = Math.max(...SPRINT_INTERVALS.map((s) => s.speedKmh));

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
        <span className="text-sm font-black text-[#132216] tracking-tight">Sprint & Velocity Profile</span>
        <button
          onClick={() => alert('Exporting Velocity Curves (CSV)...')}
          className="w-9 h-9 rounded-full bg-[#F0F8F1] flex items-center justify-center text-[#16A34A] hover:bg-[#E2F4E5] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Hero KPI Card */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Sprint Bursts (&gt; 20 km/h)</span>
            </span>
            <span className="text-[11px] font-bold bg-white text-[#16A34A] px-2.5 py-1 rounded-full shadow-xs">
              +4 Sprints vs Last Week
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-[#132216]">24</span>
            <span className="text-base font-bold text-zinc-500">Total Runs</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#D5EBD8]">
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Top Burst Velocity</span>
              <span className="text-lg font-black text-[#16A34A]">32.4 km/h</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Avg Burst Speed</span>
              <span className="text-lg font-black text-[#132216]">29.8 km/h</span>
            </div>
          </div>
        </div>

        {/* Velocity Histogram / Interval Chart */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#132216]">Recent Interval Burst Speeds</h3>
            <span className="text-xs font-semibold text-zinc-400">Peak: 32.4 km/h</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {SPRINT_INTERVALS.map((item, idx) => {
              const heightPct = Math.round((item.speedKmh / peakSpeed) * 100);
              const isPeak = item.speedKmh === peakSpeed;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-zinc-600">{item.speedKmh}</span>
                  <div className="w-full max-w-[32px] h-32 bg-[#F3F8F4] rounded-t-xl flex items-end overflow-hidden p-0.5">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isPeak
                          ? 'bg-gradient-to-t from-[#15803D] to-[#22C55E]'
                          : 'bg-[#A3E0AF]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400">#{item.interval}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-[#F0F4F0] flex justify-between items-center text-[11px] text-zinc-400">
            <span>Intervals 1-6</span>
            <span className="font-semibold text-[#16A34A]">Peak at Interval #3</span>
          </div>
        </div>

        {/* Sports Science Biometrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Timer className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Avg Duration</span>
            </div>
            <span className="text-lg font-black text-[#132216]">5.9 sec</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">High power burst</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Gauge className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Acceleration Rate</span>
            </div>
            <span className="text-lg font-black text-[#132216]">4.1 m/s²</span>
            <span className="text-[10px] text-[#16A34A] font-bold block mt-0.5">Elite explosive start</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold">Velocity Decay</span>
            </div>
            <span className="text-lg font-black text-[#132216]">-7.8%</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Low power drop</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-bold">Recovery Gap</span>
            </div>
            <span className="text-lg font-black text-[#132216]">88 sec</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Active rest between bursts</span>
          </div>
        </div>

        {/* Tactical Telemetry Insight */}
        <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-[#D5EBD8]">
          <span className="text-xs font-bold text-[#16A34A] block mb-1 uppercase tracking-wider">
            Neuromuscular Sprint Assessment
          </span>
          <p className="text-xs text-[#223927] leading-relaxed">
            Power decay remained contained under 8% through your final repeat. This demonstrates exceptional phosphocreatine resynthesis and anaerobic stamina during high-speed intervals.
          </p>
        </div>
      </div>
    </div>
  );
};

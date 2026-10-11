import React from 'react';
import { ArrowLeft, Heart, Activity, ShieldCheck, Share2, Flame, RefreshCw } from 'lucide-react';
import { HEART_RATE_ZONES } from '../../../data/consumerData';

interface HeartRateDeepDiveProps {
  onBack: () => void;
}

export const HeartRateDeepDive: React.FC<HeartRateDeepDiveProps> = ({ onBack }) => {
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
        <span className="text-sm font-black text-[#132216] tracking-tight">Heart Rate Intensity</span>
        <button
          onClick={() => alert('Exporting Cardiac Logs (FIT/CSV)...')}
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
              <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
              <span>Cardiac Telemetry</span>
            </span>
            <span className="text-[11px] font-bold bg-white text-[#16A34A] px-2.5 py-1 rounded-full shadow-xs">
              Zone 3 Predominant
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-[#132216]">148</span>
            <span className="text-base font-bold text-zinc-500">bpm average</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#D5EBD8]">
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Peak BPM</span>
              <span className="text-lg font-black text-red-500">182 bpm</span>
              <span className="text-[9px] text-zinc-400">Zone 5 Anaerobic</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Resting Baseline</span>
              <span className="text-lg font-black text-[#16A34A]">52 bpm</span>
              <span className="text-[9px] text-zinc-400">Athletic Baseline</span>
            </div>
          </div>
        </div>

        {/* 5-Zone Cardiac Distribution */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#132216]">Heart Rate Zones (Weekly Total: 174m)</h3>
            <span className="text-xs font-semibold text-zinc-400">5 Zones</span>
          </div>

          <div className="space-y-3 pt-2">
            {HEART_RATE_ZONES.map((z, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: z.color }}
                    />
                    <span className="font-bold text-[#132216]">{z.zone}</span>
                    <span className="text-[11px] text-zinc-400 font-medium">({z.name})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#132216]">{z.minutes} min</span>
                    <span className="text-[10px] font-semibold text-zinc-400 w-8 text-right">
                      {z.pct}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#F3F8F4] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${z.pct}%`, backgroundColor: z.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Science Cardiac Recovery Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <RefreshCw className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">1-Min Drop (HRR)</span>
            </div>
            <span className="text-lg font-black text-[#132216]">-34 bpm</span>
            <span className="text-[10px] text-[#16A34A] font-bold block mt-0.5">High Vagal Tone</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Activity className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">HR Variability (HRV)</span>
            </div>
            <span className="text-lg font-black text-[#132216]">68 ms</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Balanced autonomic state</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Time in Zone 5</span>
            </div>
            <span className="text-lg font-black text-[#132216]">14 min</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Safe anaerobic dose</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-bold">Cardiac Strain</span>
            </div>
            <span className="text-lg font-black text-[#16A34A]">Low/Mod</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Target load maintained</span>
          </div>
        </div>

        {/* Tactical Telemetry Insight */}
        <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-[#D5EBD8]">
          <span className="text-xs font-bold text-[#16A34A] block mb-1 uppercase tracking-wider">
            Cardiovascular Adaptation Report
          </span>
          <p className="text-xs text-[#223927] leading-relaxed">
            With 45% spent in Zone 3 Aerobic and a swift 34 bpm drop within the first minute post-workout, your heart demonstrates excellent stroke volume and parasympathetic recovery efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

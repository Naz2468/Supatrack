import React from 'react';
import { ArrowLeft, ShieldCheck, Moon, Activity, Share2, Award, Zap, CheckCircle2 } from 'lucide-react';

interface RecoveryDeepDiveProps {
  onBack: () => void;
}

export const RecoveryDeepDive: React.FC<RecoveryDeepDiveProps> = ({ onBack }) => {
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
        <span className="text-sm font-black text-[#132216] tracking-tight">Recovery & Readiness</span>
        <button
          onClick={() => alert('Exporting Recovery Diagnostics...')}
          className="w-9 h-9 rounded-full bg-[#F0F8F1] flex items-center justify-center text-[#16A34A] hover:bg-[#E2F4E5] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Hero Gauge Card */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] relative overflow-hidden text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#16A34A] text-xs font-bold rounded-full mb-3 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal Athletic State</span>
          </span>

          {/* Radial Circular Progress Visual */}
          <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-[#D2EDD6]"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-[#16A34A]"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - 0.86)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#132216]">86%</span>
              <span className="text-[11px] font-bold text-[#16A34A]">Ready</span>
            </div>
          </div>

          <h3 className="text-base font-black text-[#132216] mt-1">Ready for High-Output Work</h3>
          <p className="text-xs text-[#3C5741] mt-1">
            Resting baseline, HRV, and sleep stages indicate complete glycogen & nervous recharge.
          </p>
        </div>

        {/* Readiness Drivers Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] font-bold">Sleep Quality</span>
            </div>
            <span className="text-lg font-black text-[#132216]">89 / 100</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">7h 48m (1h 52m REM/Deep)</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Activity className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">ACWR Ratio</span>
            </div>
            <span className="text-lg font-black text-[#16A34A]">1.08</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Sweet Spot (0.8 - 1.3)</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Muscle Strain</span>
            </div>
            <span className="text-lg font-black text-[#132216]">Low (18%)</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Minimal DOMS load</span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Award className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-bold">Stride Symmetry</span>
            </div>
            <span className="text-lg font-black text-[#132216]">50.2 / 49.8%</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Zero injury compensation</span>
          </div>
        </div>

        {/* Tactical Recommendation Card */}
        <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-[#D5EBD8] space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#16A34A]" />
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              Today's Recommended Prescription
            </span>
          </div>
          <p className="text-xs text-[#223927] leading-relaxed">
            Your physiological readiness supports a 6 to 10 km Tempo Run or High-Intensity Cadence Hill Repeats. Full neuromuscular recovery is achieved; no mandatory rest required today.
          </p>
        </div>
      </div>
    </div>
  );
};

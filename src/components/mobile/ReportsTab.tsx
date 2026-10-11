import React from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Download,
  AlertTriangle
} from 'lucide-react';

interface ReportsTabProps {
  onExport: () => void;
  onLiveFeed?: () => void;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({ onExport, onLiveFeed }) => {
  return (
    <div className="w-full px-4 space-y-3 pb-24">
      {/* 1. Minimal Team Summary Card */}
      <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
              <h2 className="text-xs font-black text-white uppercase font-mono tracking-wider">
                MATCHDAY AUDIT
              </h2>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">MD24 · 76' Live</p>
          </div>

          <div className="flex items-center gap-1.5">
            {onLiveFeed && (
              <button
                type="button"
                onClick={onLiveFeed}
                className="py-1 px-2.5 rounded-full bg-[#CCFF00] text-[#131A12] font-black text-[10px] font-mono cursor-pointer active:scale-95 transition-all"
              >
                LIVE
              </button>
            )}
            <button
              type="button"
              onClick={onExport}
              className="py-1 px-2.5 rounded-full bg-white text-[#131A12] font-bold text-[10px] font-mono flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
            >
              <Download className="w-3 h-3 stroke-[2.4]" />
              <span>EXPORT</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Tiles */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center font-mono">
          <div className="p-2 rounded-xl bg-white/[0.04]">
            <span className="text-[9px] text-zinc-400 uppercase font-bold block">DISTANCE</span>
            <span className="text-sm font-black text-white mt-0.5 block tabular-nums">114.2 km</span>
          </div>

          <div className="p-2 rounded-xl bg-white/[0.04]">
            <span className="text-[9px] text-zinc-400 uppercase font-bold block">SPRINTS</span>
            <span className="text-sm font-black text-[#CCFF00] mt-0.5 block tabular-nums">142</span>
          </div>

          <div className="p-2 rounded-xl bg-white/[0.04]">
            <span className="text-[9px] text-zinc-400 uppercase font-bold block">ACWR</span>
            <span className="text-sm font-black text-white mt-0.5 block tabular-nums">1.18</span>
          </div>
        </div>
      </div>

      {/* 2. Minimal Cardiac Zones Card */}
      <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08] shadow-md">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Heart className="w-3.5 h-3.5 text-[#FF4D4D]" />
          <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            CARDIAC ZONES
          </h3>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-[#FF4D4D] font-bold">Z5 Max (&gt;180 bpm)</span>
              <span className="text-white">14% (12 min)</span>
            </div>
            <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#FF4D4D] h-full rounded-full" style={{ width: '14%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-amber-400 font-bold">Z4 Threshold (160-180 bpm)</span>
              <span className="text-white">38% (32 min)</span>
            </div>
            <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '38%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-[#CCFF00] font-bold">Z3 Aerobic (140-160 bpm)</span>
              <span className="text-white">36% (30 min)</span>
            </div>
            <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#CCFF00] h-full rounded-full" style={{ width: '36%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Minimal Workload & Injury Risk Card */}
      <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08] shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            WORKLOAD LOAD RATIO
          </span>
          <span className="text-[10px] font-mono font-black text-[#CCFF00]">
            OPTIMAL (1.18)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white/[0.04]">
          <div className="flex items-center gap-1.5 text-zinc-300 text-[11px] font-mono font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
            <span>10 / 11 Nominal</span>
          </div>
          <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" />
            #7 Alvarez (1.48)
          </span>
        </div>
      </div>
    </div>
  );
};

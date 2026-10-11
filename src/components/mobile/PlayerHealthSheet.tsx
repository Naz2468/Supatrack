import React, { useState } from 'react';
import { SquadMemberHealth } from '../../data/mobileMockData';
import { 
  X, 
  Heart, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Compass, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import { MetricDrillDownModal, DrillDownMetricType } from './MetricDrillDownModal';

interface PlayerHealthSheetProps {
  player: SquadMemberHealth | null;
  onClose: () => void;
  onFlagSub: (player: SquadMemberHealth) => void;
  isFlagged: boolean;
  initialDrillDownMetric?: DrillDownMetricType | null;
}

export const PlayerHealthSheet: React.FC<PlayerHealthSheetProps> = ({
  player,
  onClose,
  onFlagSub,
  isFlagged,
  initialDrillDownMetric = null,
}) => {
  const [activeDrillDownMetric, setActiveDrillDownMetric] = useState<DrillDownMetricType | null>(initialDrillDownMetric);

  // Sync initialDrillDownMetric if it changes externally
  React.useEffect(() => {
    if (initialDrillDownMetric) {
      setActiveDrillDownMetric(initialDrillDownMetric);
    }
  }, [initialDrillDownMetric]);

  if (!player) return null;

  const isImuWarning = player.imu.status === 'Warning' || player.imu.deviationPct > 8;
  const isSubAdvised = player.fatigueStatus === 'Substitution Recommended';

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
        <div 
          className="w-full max-w-md bg-[#1F291E] border border-white/[0.12] rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl relative max-h-[88vh] overflow-y-auto text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Grab Handle */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3.5 sm:hidden"></div>

          {/* Close Button - Circular White */}
          <button
            onClick={onClose}
            aria-label="Close sheet"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white text-[#131A12] flex items-center justify-center font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Header with Circular White Avatar */}
          <div className="flex items-center gap-3 pb-3.5 border-b border-white/[0.08]">
            <div className="w-11 h-11 rounded-full bg-white text-[#131A12] font-mono font-black text-base flex items-center justify-center shrink-0 shadow-md">
              #{player.number}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-black text-white">{player.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-[#CCFF00] font-bold">
                  {player.position}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5 font-mono">
                <span className="text-[#CCFF00] font-black">
                  SUPA: {player.supaRating.overallScore}
                </span>
                <span>·</span>
                <span>{player.academyOrigin}</span>
              </div>
            </div>
          </div>

          {/* MPU6050 Biomechanics Spotlight Banner */}
          <div className={`my-3.5 p-3.5 rounded-2xl border ${
            isImuWarning
              ? 'bg-[#CCFF00] text-[#131A12] border-none shadow-[0_0_20px_rgba(204,255,0,0.3)]'
              : 'bg-[#243023] border-white/[0.06] text-white'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1 font-mono text-[10px] font-black uppercase">
                <Compass className="w-3.5 h-3.5" />
                <span>MPU6050 GAIT</span>
              </div>
              <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full ${
                isImuWarning ? 'bg-[#131A12] text-[#CCFF00]' : 'bg-[#CCFF00]/15 text-[#CCFF00]'
              }`}>
                {isImuWarning ? `+${player.imu.deviationPct}% DEV` : 'BALANCED'}
              </span>
            </div>

            <div className="flex justify-between text-[11px] font-mono mb-2">
              <span>Gait: <strong>{player.imu.currentLeftPct}% L / {player.imu.currentRightPct}% R</strong></span>
              <span className="opacity-80">{player.imu.baselineFootedness.split(' ')[0]}</span>
            </div>

            <div className={`w-full h-2 rounded-full overflow-hidden flex ${isImuWarning ? 'bg-[#131A12]/20 border border-[#131A12]/30' : 'bg-white/[0.08]'}`}>
              <div 
                className={`h-full ${isImuWarning ? 'bg-[#131A12]' : 'bg-[#CCFF00]'}`} 
                style={{ width: `${player.imu.currentLeftPct}%` }}
              />
              <div 
                className={`h-full ${isImuWarning ? 'bg-white' : 'bg-emerald-400'}`} 
                style={{ width: `${player.imu.currentRightPct}%` }}
              />
            </div>

            {isImuWarning && (
              <div className="mt-2.5 pt-2 border-t border-[#131A12]/20 text-[11px] font-bold leading-tight">
                {player.imu.warningMessage || '⚠️ +12% Left Stride Imbalance. Sub advised.'}
              </div>
            )}
          </div>

          {/* Interactive Metric Drill-Down Title Strip */}
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-extrabold">
              Passport Telemetry
            </span>
            <span className="text-[10px] font-mono text-[#CCFF00] flex items-center gap-0.5">
              <span>Tap tile to drill-down</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* 2x2 Metric Breakdown in #243023 Containers - Now Interactive & Clickable */}
          <div className="grid grid-cols-2 gap-2.5 mb-3.5">
            {/* 1. HEART RATE CARD */}
            <div 
              onClick={() => setActiveDrillDownMetric('heartRate')}
              className="p-3 rounded-2xl bg-[#243023] border border-white/[0.08] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] cursor-pointer transition-all active:scale-[0.98] group relative"
              title="Click to view Heart Rate Intensity drill-down chart"
            >
              <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                <span className="group-hover:text-white transition-colors">HEART RATE</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#CCFF00] transition-colors" />
                  <Heart className="w-3 h-3 text-[#FF4D4D]" />
                </div>
              </div>
              <div className="text-xl font-black font-mono text-white mt-1 tabular-nums group-hover:text-[#CCFF00] transition-colors">
                {player.heartRate} <span className="text-[10px] font-normal text-zinc-400">bpm</span>
              </div>
              <div className="mt-1 text-[9px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Peak 184</span>
                <span className="text-[#FF4D4D] font-bold">Zone 5</span>
              </div>
            </div>

            {/* 2. RECOVERY CARD */}
            <div 
              onClick={() => setActiveDrillDownMetric('recovery')}
              className="p-3 rounded-2xl bg-[#243023] border border-white/[0.08] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] cursor-pointer transition-all active:scale-[0.98] group relative"
              title="Click to view Physical Readiness & Fatigue Decay drill-down chart"
            >
              <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                <span className="group-hover:text-white transition-colors">RECOVERY</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#CCFF00] transition-colors" />
                  <Sparkles className="w-3 h-3 text-[#CCFF00]" />
                </div>
              </div>
              <div className="text-xl font-black font-mono text-[#CCFF00] mt-1 tabular-nums">
                {player.recoveryScore}%
              </div>
              <div className="mt-1 text-[9px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Readiness</span>
                <span className="text-amber-400 font-bold">Sub Advised</span>
              </div>
            </div>

            {/* 3. SPRINTS CARD */}
            <div 
              onClick={() => setActiveDrillDownMetric('sprints')}
              className="p-3 rounded-2xl bg-[#243023] border border-white/[0.08] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] cursor-pointer transition-all active:scale-[0.98] group relative"
              title="Click to view Sprint Frequency & Velocity Profile drill-down chart"
            >
              <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                <span className="group-hover:text-white transition-colors">SPRINTS</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#CCFF00] transition-colors" />
                  <Zap className="w-3 h-3 text-cyan-400" />
                </div>
              </div>
              <div className="text-xl font-black font-mono text-white mt-1 tabular-nums group-hover:text-cyan-400 transition-colors">
                {player.sprintCount} <span className="text-[10px] font-normal text-cyan-400">runs</span>
              </div>
              <div className="mt-1 text-[9px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Top 34.8 km/h</span>
                <span className="text-[#CCFF00] font-bold">&gt;20km/h</span>
              </div>
            </div>

            {/* 4. DISTANCE CARD */}
            <div 
              onClick={() => setActiveDrillDownMetric('distance')}
              className="p-3 rounded-2xl bg-[#243023] border border-white/[0.08] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] cursor-pointer transition-all active:scale-[0.98] group relative"
              title="Click to view Cumulative Distance & Pace Distribution drill-down chart"
            >
              <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                <span className="group-hover:text-white transition-colors">DISTANCE</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#CCFF00] transition-colors" />
                  <Activity className="w-3 h-3 text-[#CCFF00]" />
                </div>
              </div>
              <div className="text-xl font-black font-mono text-white mt-1 tabular-nums group-hover:text-[#CCFF00] transition-colors">
                {player.distanceCoveredKm} <span className="text-[10px] font-normal text-zinc-400">km</span>
              </div>
              <div className="mt-1 text-[9px] font-mono text-zinc-400 flex items-center justify-between">
                <span>HID: 2.41 km</span>
                <span className="text-emerald-400 font-bold">18% Sprint</span>
              </div>
            </div>
          </div>

          {/* Medical / Sub Recommendation */}
          <div className={`p-3 rounded-2xl border ${
            isSubAdvised
              ? 'bg-[#243023] border-[#FF4D4D]/60'
              : 'bg-[#243023] border-white/[0.06]'
          }`}>
            <div className="flex items-start gap-2.5">
              {isSubAdvised ? (
                <ShieldAlert className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
              )}
              <div>
                <div className={`text-[10px] font-mono uppercase font-black ${isSubAdvised ? 'text-[#FF4D4D]' : 'text-[#CCFF00]'}`}>
                  {isSubAdvised ? 'SUB ADVISORY' : 'NOMINAL'}
                </div>
                <p className="text-[11px] text-zinc-300 mt-0.5 leading-snug">
                  {player.subAlert || 'Cardiorespiratory markers nominal.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button - Pill Style */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-white/[0.08] text-zinc-300 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
            <button
              onClick={() => onFlagSub(player)}
              disabled={isFlagged}
              className={`px-5 py-2 text-xs font-black rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                isFlagged
                  ? 'bg-white/[0.1] text-zinc-500 cursor-not-allowed'
                  : isSubAdvised
                  ? 'bg-[#FF4D4D] hover:bg-red-500 text-white shadow-md'
                  : 'bg-[#CCFF00] hover:bg-[#B8F400] text-[#131A12] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
              }`}
            >
              <span>{isFlagged ? 'Flagged' : 'Flag to Bench'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Metric Drill-Down Modal Overlay */}
      {activeDrillDownMetric && (
        <MetricDrillDownModal
          isOpen={true}
          metricType={activeDrillDownMetric}
          player={player}
          onClose={() => setActiveDrillDownMetric(null)}
          onSwitchMetric={(metric) => setActiveDrillDownMetric(metric)}
        />
      )}
    </>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  ChevronRight,
  AlertTriangle 
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
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
        <div 
          className="w-full max-w-md bg-white border border-[#DCF0DF] rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl relative max-h-[88vh] overflow-y-auto text-[#132216] transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Grab Handle */}
          <div className="w-12 h-1 bg-zinc-300 rounded-full mx-auto mb-3.5 sm:hidden"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close sheet"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5FAF6] text-zinc-600 flex items-center justify-center font-bold hover:bg-[#EBF7EE] hover:text-[#16A34A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Player Header Card */}
          <div className="flex items-center gap-3.5 mb-5 pr-10">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] text-[#16A34A] flex items-center justify-center font-black text-base shadow-xs">
              #{player.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#132216]">
                  {player.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7EE] text-[#16A34A] border border-[#DCF0DF]">
                  {player.position}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-semibold mt-0.5">
                {player.positionGroup} · Academy: {player.academyOrigin}
              </p>
            </div>
          </div>

          {/* Critical Risk Notification Banner */}
          {isImuWarning && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 mb-4 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-xs font-bold text-rose-900 block">
                  Asymmetry Threshold Breached (+{player.imu.deviationPct}%)
                </span>
                <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                  Left leg contact loading shifted significantly away from right foot baseline ({player.imu.baselineFootedness}). Substitution advised to avoid muscle tear.
                </p>
              </div>
            </div>
          )}

          {/* Primary Biometrics Stats Grid */}
          <div className="space-y-4">
            {/* Supa Rating Row */}
            <div className="p-4 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block">
                  Supa Rating Match Score
                </span>
                <span className="text-xs text-zinc-600 font-medium">
                  {player.supaRating.roleTitle}
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#132216]">
                  {player.supaRating.overallScore}
                </span>
                <span className="text-xs font-bold text-zinc-400">/100</span>
              </div>
            </div>

            {/* Sub-Metric 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setActiveDrillDownMetric('heartRate')}
                className="p-3.5 rounded-2xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-colors cursor-pointer shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    Heart Rate
                  </span>
                  <ChevronRight className="w-3 h-3 text-zinc-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xl font-black text-[#132216]">
                  {player.heartRate} <span className="text-xs font-normal text-zinc-400">bpm</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium mt-0.5 block">
                  Tap for zone chart
                </span>
              </div>

              <div 
                onClick={() => setActiveDrillDownMetric('sprints')}
                className="p-3.5 rounded-2xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-colors cursor-pointer shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Top Speed
                  </span>
                  <ChevronRight className="w-3 h-3 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xl font-black text-[#132216]">
                  {player.topSpeedKmh} <span className="text-xs font-normal text-zinc-400">km/h</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium mt-0.5 block">
                  Tap for sprint logs
                </span>
              </div>

              <div 
                onClick={() => setActiveDrillDownMetric('distance')}
                className="p-3.5 rounded-2xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-colors cursor-pointer shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Distance
                  </span>
                  <ChevronRight className="w-3 h-3 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xl font-black text-[#132216]">
                  {player.distanceCoveredKm} <span className="text-xs font-normal text-zinc-400">km</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium mt-0.5 block">
                  Tap for pitch split
                </span>
              </div>

              <div 
                onClick={() => setActiveDrillDownMetric('recovery')}
                className="p-3.5 rounded-2xl bg-white border border-[#DCF0DF] hover:border-[#16A34A]/50 transition-colors cursor-pointer shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Readiness
                  </span>
                  <ChevronRight className="w-3 h-3 text-zinc-300 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xl font-black text-[#132216]">
                  {player.recoveryScore}%
                </div>
                <span className="text-[10px] text-zinc-400 font-medium mt-0.5 block">
                  Tap for strain index
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 pt-4 border-t border-[#F0F6F1] flex items-center gap-3">
            <button
              onClick={() => onFlagSub(player)}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                isFlagged
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              {isFlagged ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-rose-700" />
                  <span>Sub Advisory Broadcasted</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Flag Substitution to Sideline</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Metric Drill-Down Modal if triggered */}
      {activeDrillDownMetric && (
        <MetricDrillDownModal
          isOpen={!!activeDrillDownMetric}
          metricType={activeDrillDownMetric}
          player={player}
          onClose={() => setActiveDrillDownMetric(null)}
          onSwitchMetric={(metric) => setActiveDrillDownMetric(metric)}
        />
      )}
    </>
  );
};

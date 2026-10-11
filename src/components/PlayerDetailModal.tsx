import React from 'react';
import { PlayerTelemetry } from '../types/telemetry';
import { 
  X, 
  Heart, 
  Zap, 
  Activity, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Battery, 
  Radio, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface PlayerDetailModalProps {
  player: PlayerTelemetry | null;
  onClose: () => void;
  onSendAlert: (player: PlayerTelemetry) => void;
  isAlertSent: boolean;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  onClose,
  onSendAlert,
  isAlertSent,
}) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pb-5 border-b border-[#27272a]">
          <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-extrabold text-2xl text-emerald-400 shrink-0 shadow-inner">
            #{player.number}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">{player.name}</h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-zinc-800 text-zinc-300">
                {player.position} · {player.positionGroup}
              </span>
              {player.status === 'Sub-Recommended' && (
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white animate-pulse">
                  Sub-Recommended
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
              <span>Academy Origin: <strong className="text-zinc-200">{player.academyOrigin}</strong></span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Vest ID: #{player.number * 4 + 102}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <Radio className="w-3 h-3" /> RTK GPS Active
              </span>
            </div>
          </div>
        </div>

        {/* Core Metric Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          
          <div className="p-3 rounded-lg bg-[#09090b] border border-[#27272a]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>Total Distance</span>
              <Activity className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="mt-1 text-lg font-bold font-mono tabular-nums text-white">
              {player.totalDistanceMeters.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">m</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{(player.totalDistanceMeters / 1000).toFixed(2)} km total</div>
          </div>

          <div className="p-3 rounded-lg bg-[#09090b] border border-[#27272a]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>Sprint Count</span>
              <Zap className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="mt-1 text-lg font-bold font-mono tabular-nums text-cyan-400">
              {player.sprintCount} <span className="text-xs text-zinc-400 font-normal">runs</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{player.highIntensityDistanceMeters}m high-intensity</div>
          </div>

          <div className="p-3 rounded-lg bg-[#09090b] border border-[#27272a]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>Max Velocity</span>
              <TrendingUp className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="mt-1 text-lg font-bold font-mono tabular-nums text-white">
              {player.maxSpeedKmh} <span className="text-xs text-zinc-400 font-normal">km/h</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Match peak at min 32'</div>
          </div>

          <div className="p-3 rounded-lg bg-[#09090b] border border-[#27272a]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>Heart Rate Zone</span>
              <Heart className="w-3 h-3 text-red-400" />
            </div>
            <div className="mt-1 text-lg font-bold font-mono tabular-nums text-white">
              {player.currentHeartRate} <span className="text-xs text-zinc-400 font-normal">bpm</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Zone {player.hrZone} ({Math.round(player.currentHeartRate / player.maxHeartRate * 100)}% Max HR)</div>
          </div>

        </div>

        {/* Biometric Deep-Dive Sections */}
        <div className="space-y-4">
          
          {/* Workload & ACWR Analysis */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Workload &amp; Injury Risk Index (ACWR)
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                player.acwr > 1.4 
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : player.acwr > 1.25
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                Ratio: {player.acwr.toFixed(2)}
              </span>
            </div>
            
            {/* Visual Bar Indicator */}
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full transition-all ${
                  player.acwr > 1.4 ? 'bg-red-500' : player.acwr > 1.25 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min((player.acwr / 1.8) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>0.8 Underloaded</span>
              <span className="text-emerald-400 font-bold">1.0 - 1.3 Optimal Sweet-Spot</span>
              <span className="text-red-400 font-bold">&gt;1.4 Critical Fatigue Hazard</span>
            </div>
          </div>

          {/* Recovery Rate & Fatigue Profile */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
              Physiological Recovery &amp; Fatigue Decay
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Heart Rate Recovery (HRR)</span>
                <span className="font-mono tabular-nums font-bold text-zinc-100">{player.recoveryRateScore}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Cumulative Fatigue Index</span>
                <span className={`font-mono tabular-nums font-bold ${player.fatigueIndex > 70 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {player.fatigueIndex}/100
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Max Heart Rate Recorded</span>
                <span className="font-mono tabular-nums text-zinc-200">{player.maxHeartRate} bpm</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Vest Battery &amp; Sync</span>
                <span className="font-mono tabular-nums text-zinc-200">{player.vestBattery}% · 100Hz RTK</span>
              </div>
            </div>
          </div>

          {/* Sports Science Staff Advisory */}
          <div className={`p-4 rounded-xl border ${
            player.status === 'Sub-Recommended'
              ? 'bg-red-950/20 border-red-800/50'
              : player.status === 'Monitor'
              ? 'bg-amber-950/20 border-amber-800/50'
              : 'bg-emerald-950/20 border-emerald-800/50'
          }`}>
            <div className="flex items-start gap-3">
              {player.status === 'Sub-Recommended' ? (
                <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              ) : player.status === 'Monitor' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Sports Science Engine Evaluation
                </div>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  {player.statusReason || 'All physiological indicators within green bounds. Ready for tactical endurance phase.'}
                </p>
                {player.number === 7 && (
                  <div className="mt-2.5 text-xs text-red-300 bg-red-950/60 p-2.5 rounded-lg border border-red-800/60">
                    <strong>Tactical Recommendation:</strong> Prepare #17 Elias Nygård (Fresh Sub) on the right wing. Mateo has surpassed safe metabolic velocity threshold.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-[#27272a] flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
          >
            Close Panel
          </button>
          <button
            onClick={() => onSendAlert(player)}
            disabled={isAlertSent}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              isAlertSent
                ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                : player.status === 'Sub-Recommended'
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isAlertSent ? 'Dispatched to Bench Headset' : 'Alert Bench & Head Coach'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

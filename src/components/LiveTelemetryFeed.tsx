import React, { useState } from 'react';
import { PlayerTelemetry } from '../types/telemetry';
import { 
  Radio, 
  Heart, 
  Battery, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  ShieldAlert,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface LiveTelemetryFeedProps {
  players: PlayerTelemetry[];
  onSelectPlayer: (player: PlayerTelemetry) => void;
  onSendSubAlert: (player: PlayerTelemetry) => void;
  alertSentIds: string[];
}

export const LiveTelemetryFeed: React.FC<LiveTelemetryFeedProps> = ({
  players,
  onSelectPlayer,
  onSendSubAlert,
  alertSentIds,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'alerts'>('all');

  const filteredPlayers = filterMode === 'alerts'
    ? players.filter(p => p.status !== 'Optimal')
    : players;

  const getHrZoneBadge = (zone: number, bpm: number) => {
    switch (zone) {
      case 5:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/60 text-red-400 border border-red-800/60">
            Z5 MAX ({bpm} BPM)
          </span>
        );
      case 4:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/60 text-amber-400 border border-amber-800/60">
            Z4 THRESH ({bpm} BPM)
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
            Z3 AEROBIC ({bpm} BPM)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            Z{zone} ({bpm} BPM)
          </span>
        );
    }
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-sm flex flex-col h-full">
      
      {/* Feed Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272a]">
        <div>
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <h2 className="text-base font-bold text-zinc-100 tracking-tight">
              Live Telemetry Feed
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Active GPS / Accelerometer Vests · 100Hz RTK Sampling
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-[#09090b] rounded-lg border border-[#27272a]">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2 py-1 text-xs font-medium rounded transition-all ${
              filterMode === 'all'
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All ({players.length})
          </button>
          <button
            onClick={() => setFilterMode('alerts')}
            className={`px-2 py-1 text-xs font-medium rounded transition-all flex items-center gap-1 ${
              filterMode === 'alerts'
                ? 'bg-red-950/60 text-red-300 border border-red-800/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>Alerts ({players.filter(p => p.status !== 'Optimal').length})</span>
          </button>
        </div>
      </div>

      {/* Prominent Callout for Player #7 Warning Chip */}
      <div className="mb-3.5 p-3 rounded-lg bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-800/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-md bg-red-900/50 text-red-400 mt-0.5 shrink-0">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Fatigue / Substitution Alert
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
                  CRITICAL DROP-OFF
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                <span className="font-semibold text-white">#7 Mateo Alvarez (W)</span>: Sudden sprint velocity drop-off (-18%) past min 65. Sustained HR Zone 5 (184 BPM) for 8m. Sub recommended to prevent acute hamstring strain.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              const p7 = players.find(p => p.number === 7);
              if (p7) onSendSubAlert(p7);
            }}
            disabled={alertSentIds.includes('p7')}
            className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded transition-all ${
              alertSentIds.includes('p7')
                ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-sm active:scale-95'
            }`}
          >
            {alertSentIds.includes('p7') ? 'Alert Dispatched' : 'Flag to Bench'}
          </button>
        </div>
      </div>

      {/* Active Players Scrollable List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[460px]">
        {filteredPlayers.map((player) => {
          const isP7 = player.number === 7;
          const isAlert = player.status === 'Sub-Recommended';
          const isMonitor = player.status === 'Monitor';

          return (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className={`p-3 rounded-lg border transition-all cursor-pointer group ${
                isAlert
                  ? 'bg-red-950/20 border-red-800/40 hover:border-red-700 hover:bg-red-950/30'
                  : isMonitor
                  ? 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700 hover:bg-amber-950/30'
                  : 'bg-[#09090b] border-[#27272a] hover:border-zinc-600 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                
                {/* Left: Player Number & Identity */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                    isAlert
                      ? 'bg-red-900/50 text-red-200 border border-red-700/60'
                      : isMonitor
                      ? 'bg-amber-900/40 text-amber-200 border border-amber-700/60'
                      : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                  }`}>
                    #{player.number}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-zinc-100 truncate group-hover:text-emerald-400 transition-colors">
                        {player.name}
                      </span>
                      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">
                        {player.position}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                      <span className="font-mono tabular-nums">{(player.totalDistanceMeters / 1000).toFixed(2)} km</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="font-mono tabular-nums text-cyan-400">{player.highIntensityDistanceMeters}m sprint</span>
                    </div>
                  </div>
                </div>

                {/* Right: Heart Rate Zone & Status Alert Tag */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    {getHrZoneBadge(player.hrZone, player.currentHeartRate)}
                    <div className="flex items-center justify-end gap-1.5 text-[10px] text-zinc-500 font-mono mt-0.5">
                      <Battery className="w-3 h-3 text-zinc-400" />
                      <span>{player.vestBattery}%</span>
                    </div>
                  </div>

                  {isAlert ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-600/90 text-white shrink-0">
                      SUB ALERT
                    </span>
                  ) : isMonitor ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-600/90 text-white shrink-0">
                      MONITOR
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
                      OPTIMAL
                    </span>
                  )}

                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0" />
                </div>

              </div>

              {/* Status reason highlight if alert/monitor */}
              {(isAlert || isMonitor) && player.statusReason && (
                <div className="mt-2 pt-2 border-t border-[#27272a]/70 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span className="truncate pr-2">{player.statusReason}</span>
                  <span className="font-mono text-zinc-300 text-[10px] shrink-0 font-bold">
                    ACWR: {player.acwr.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feed Diagnostic Footer */}
      <div className="mt-3 pt-3 border-t border-[#27272a] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vests Online: 11 Outfield + 1 GK</span>
        </div>
        <span>Data Latency: &lt;14ms</span>
      </div>

    </div>
  );
};

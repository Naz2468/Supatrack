import React from 'react';
import { MatchKpis } from '../types/telemetry';
import { 
  TrendingUp, 
  Zap, 
  Flame, 
  Target, 
  ArrowUpRight, 
  AlertCircle,
  Activity,
  Layers
} from 'lucide-react';

interface KpiMetricsRowProps {
  kpis: MatchKpis;
}

export const KpiMetricsRow: React.FC<KpiMetricsRowProps> = ({ kpis }) => {
  return (
    <section aria-label="Top KPI Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Total Distance Covered */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4.5 flex flex-col justify-between hover:border-zinc-600 transition-all group relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-zinc-400">Total Distance Covered</span>
            <div className="p-1 rounded bg-zinc-800/80 text-zinc-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              {kpis.totalDistanceKm.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-zinc-400">km</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">+{kpis.distanceDeltaPct}%</span>
            <span className="text-zinc-500 font-normal">vs MD2</span>
          </div>
          <span className="text-zinc-400 font-mono tabular-nums text-[11px]">Avg 10.4 km/player</span>
        </div>
      </div>

      {/* 2. High-Intensity Sprints (>20 km/h) */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4.5 flex flex-col justify-between hover:border-zinc-600 transition-all group relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-zinc-400">High-Intensity Sprints (&gt;20 km/h)</span>
            <div className="p-1 rounded bg-zinc-800/80 text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              {kpis.highIntensitySprints}
            </span>
            <span className="text-sm font-semibold text-zinc-400">counts</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-cyan-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">+{kpis.sprintsDeltaPct}%</span>
            <span className="text-zinc-500 font-normal">vs baseline</span>
          </div>
          <span className="text-zinc-400 font-mono tabular-nums text-[11px]">Peak 34.8 km/h</span>
        </div>
      </div>

      {/* 3. Average Player Work-Rate / Fatigue Index */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4.5 flex flex-col justify-between hover:border-zinc-600 transition-all group relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors"></div>
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-zinc-400">Avg Work-Rate / Fatigue</span>
            <div className="p-1 rounded bg-zinc-800/80 text-zinc-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              {kpis.avgWorkRateScore}%
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Optimal
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{kpis.fatigueFlagsCount} flags active</span>
          </div>
          <span className="text-zinc-400 font-mono tabular-nums text-[11px]">Min 60+ Decel</span>
        </div>
      </div>

      {/* 4. Tactical Execution Score */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4.5 flex flex-col justify-between hover:border-zinc-600 transition-all group relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-zinc-400">Tactical Execution Score</span>
            <div className="p-1 rounded bg-zinc-800/80 text-zinc-300">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              {kpis.tacticalExecutionScore.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-zinc-400 font-mono">/ 10</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>High Press Synced</span>
          </div>
          <span className="text-zinc-400 font-mono tabular-nums text-[11px]">{kpis.pressingEfficiencyPct}% efficiency</span>
        </div>
      </div>

    </section>
  );
};

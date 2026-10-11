import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { POSITION_SPRINT_DATA } from '../data/mockTelemetry';
import { Zap, ShieldCheck } from 'lucide-react';

export const SprintPositionChart: React.FC = () => {
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3 shadow-2xl text-xs min-w-[200px] z-50">
          <div className="font-bold text-zinc-100 pb-1.5 mb-1.5 border-b border-[#27272a] flex items-center justify-between">
            <span>{label} Group</span>
            <span className="font-mono text-zinc-400 text-[11px]">{data.totalAvgDistanceKm} km avg</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-medium">High Speed (20-25 km/h)</span>
              <span className="font-mono tabular-nums text-zinc-100 font-bold">{data.countHighSpeed} sprints</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-medium">Max Sprint (&gt;25 km/h)</span>
              <span className="font-mono tabular-nums text-zinc-100 font-bold">{data.countMaxSprint} sprints</span>
            </div>
            <div className="pt-1.5 border-t border-[#27272a]/60 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Target Match Baseline</span>
              <span className="font-mono tabular-nums text-zinc-300">{data.targetBaseline} total</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-zinc-100 tracking-tight">
              Sprint Counts per Position Group
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              &gt;20 km/h Velocity
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Distribution of high-speed running vs max sprints across tactical units
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2.5 py-1 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Tactical Plan: Met</span>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={POSITION_SPRINT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="positionGroup" 
              stroke="#71717a" 
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
            />
            <Bar 
              name="High-Speed (20-25 km/h)" 
              dataKey="countHighSpeed" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={36}
            />
            <Bar 
              name="Max Sprint (>25 km/h)" 
              dataKey="countMaxSprint" 
              fill="#06b6d4" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-[#27272a] grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-1.5 rounded bg-[#09090b] border border-[#27272a]/70">
          <div className="text-[11px] text-zinc-400">Forwards Ratio</div>
          <div className="font-mono tabular-nums font-bold text-zinc-200 mt-0.5">3.5:1 High/Max</div>
        </div>
        <div className="p-1.5 rounded bg-[#09090b] border border-[#27272a]/70">
          <div className="text-[11px] text-zinc-400">Midfield Engine</div>
          <div className="font-mono tabular-nums font-bold text-emerald-400 mt-0.5">77 Sprints Total</div>
        </div>
        <div className="p-1.5 rounded bg-[#09090b] border border-[#27272a]/70">
          <div className="text-[11px] text-zinc-400">Defenders Output</div>
          <div className="font-mono tabular-nums font-bold text-cyan-400 mt-0.5">+14% vs MD1</div>
        </div>
      </div>
    </div>
  );
};

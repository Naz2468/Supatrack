import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { FATIGUE_DECAY_SERIES } from '../data/mockTelemetry';
import { Activity, Gauge, TrendingDown, Info } from 'lucide-react';

type ChartMetricMode = 'speed' | 'workRate' | 'fatigueDecay';

export const SpeedFatigueChart: React.FC = () => {
  const [metricMode, setMetricMode] = useState<ChartMetricMode>('speed');

  const getMetricTitle = () => {
    switch (metricMode) {
      case 'speed':
        return 'Average Speed (km/h)';
      case 'workRate':
        return 'Metabolic Work-Rate (W/kg)';
      case 'fatigueDecay':
        return 'Fatigue Decay Index (%)';
    }
  };

  // Custom Dark Telemetry Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3 shadow-2xl text-xs min-w-[210px] z-50">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#27272a]">
            <span className="font-bold text-zinc-100 font-mono">Minute {label}'</span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {data.minute <= 45 ? '1st Half Interval' : '2nd Half Interval'}
            </span>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>1st Half Baseline</span>
              </div>
              <span className="font-mono tabular-nums text-zinc-100 font-bold">
                {metricMode === 'speed' && `${data.firstHalfSpeed} km/h`}
                {metricMode === 'workRate' && `${data.firstHalfWorkRate} W/kg`}
                {metricMode === 'fatigueDecay' && `${(data.fatigueDecayPct * 0.4).toFixed(1)}%`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>2nd Half Output</span>
              </div>
              <span className="font-mono tabular-nums text-zinc-100 font-bold">
                {metricMode === 'speed' && `${data.secondHalfSpeed} km/h`}
                {metricMode === 'workRate' && `${data.secondHalfWorkRate} W/kg`}
                {metricMode === 'fatigueDecay' && `${data.fatigueDecayPct}%`}
              </span>
            </div>

            <div className="pt-1.5 border-t border-[#27272a]/60 flex items-center justify-between text-[11px] text-zinc-400">
              <span>High-Intensity Runs</span>
              <span className="font-mono tabular-nums text-amber-400 font-semibold">{data.highIntensityRuns} runs</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-sm">
      
      {/* Header with Title & Metric Mode Segmented Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-zinc-100 tracking-tight">
              Speed &amp; Fatigue Decay over 90 Minutes
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              1st vs. 2nd Half
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time biometric decay tracking squad output drop-off across match intervals
          </p>
        </div>

        {/* Metric Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#09090b] rounded-lg border border-[#27272a] self-start sm:self-auto">
          <button
            onClick={() => setMetricMode('speed')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              metricMode === 'speed'
                ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Speed (km/h)
          </button>
          <button
            onClick={() => setMetricMode('workRate')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              metricMode === 'workRate'
                ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Work-Rate (W/kg)
          </button>
          <button
            onClick={() => setMetricMode('fatigueDecay')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              metricMode === 'fatigueDecay'
                ? 'bg-zinc-800 text-amber-400 font-semibold shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Decay Index (%)
          </button>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={FATIGUE_DECAY_SERIES} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="minute" 
              stroke="#71717a" 
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              tickFormatter={(v) => `${v}'`}
              dy={5}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              domain={metricMode === 'speed' ? [9, 17] : metricMode === 'workRate' ? [6, 13] : [0, 36]}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              iconType="circle"
            />
            
            {/* Half-time demarcation line */}
            <ReferenceLine 
              x={45} 
              stroke="#52525b" 
              strokeDasharray="4 4" 
              label={{ value: 'HALF-TIME', fill: '#a1a1aa', fontSize: 10, position: 'top' }} 
            />

            {metricMode === 'speed' && (
              <>
                <Line 
                  name="1st Half Speed (km/h)" 
                  type="monotone" 
                  dataKey="firstHalfSpeed" 
                  stroke="#10b981" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#10b981', stroke: '#09090b', strokeWidth: 2 }}
                />
                <Line 
                  name="2nd Half Speed (km/h)" 
                  type="monotone" 
                  dataKey="secondHalfSpeed" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#06b6d4', stroke: '#09090b', strokeWidth: 2 }}
                />
              </>
            )}

            {metricMode === 'workRate' && (
              <>
                <Line 
                  name="1st Half Power (W/kg)" 
                  type="monotone" 
                  dataKey="firstHalfWorkRate" 
                  stroke="#10b981" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#10b981' }}
                  activeDot={{ r: 5, fill: '#10b981' }}
                />
                <Line 
                  name="2nd Half Power (W/kg)" 
                  type="monotone" 
                  dataKey="secondHalfWorkRate" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#06b6d4' }}
                  activeDot={{ r: 5, fill: '#06b6d4' }}
                />
              </>
            )}

            {metricMode === 'fatigueDecay' && (
              <>
                <ReferenceLine 
                  y={20} 
                  stroke="#ef4444" 
                  strokeDasharray="3 3" 
                  label={{ value: 'CRITICAL FATIGUE >20%', fill: '#ef4444', fontSize: 10, position: 'right' }} 
                />
                <Line 
                  name="Fatigue Decay %" 
                  type="monotone" 
                  dataKey="fatigueDecayPct" 
                  stroke="#f59e0b" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#f59e0b' }}
                  activeDot={{ r: 5, fill: '#f59e0b' }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Insight */}
      <div className="mt-3 pt-3 border-t border-[#27272a] flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
        <div className="flex items-center gap-1.5">
          <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
          <span>Second-half output drops sharply after min 65' (-21.4% velocity decay on flanks)</span>
        </div>
        <div className="font-mono text-zinc-300 tabular-nums text-[11px]">
          Median Work-Rate: <span className="text-emerald-400 font-semibold">10.4 W/kg</span>
        </div>
      </div>

    </div>
  );
};

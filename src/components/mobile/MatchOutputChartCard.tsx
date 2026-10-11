import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import { TrendingDown } from 'lucide-react';
import { MATCH_OUTPUT_DECAY, MATCHDAY_TRENDS } from '../../data/mobileMockData';

export const MatchOutputChartCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'90m' | 'matchdays'>('90m');

  const strokeColor = '#CCFF00';
  const gridLineColor = '#243023';
  const axisTextColor = '#9EAB9C';

  // Custom Minimalist Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1F291E]/95 backdrop-blur-md border border-[#CCFF00]/40 rounded-xl px-2.5 py-1.5 shadow-xl text-xs z-50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-white font-bold">{data.minute}</span>
            <span className="font-mono text-[#CCFF00] font-black">{data.outputPct}%</span>
            <span className="text-[10px] text-zinc-400 font-mono">{data.workRate} km/h</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full px-4">
      <div className="rounded-2xl bg-[#1F291E] border border-white/[0.08] p-3.5 shadow-md">
        
        {/* Header & Minimalist Timeframe Switch */}
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
              <h3 className="text-xs font-black text-white uppercase font-mono tracking-wider">
                OUTPUT DECAY
              </h3>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
              90' metabolic curve
            </p>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-white/[0.06] rounded-full">
            <button
              onClick={() => setActiveTab('90m')}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full transition-all cursor-pointer ${
                activeTab === '90m'
                  ? 'bg-[#CCFF00] text-[#131A12] font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              90' LIVE
            </button>
            <button
              onClick={() => setActiveTab('matchdays')}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'matchdays'
                  ? 'bg-[#CCFF00] text-[#131A12] font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              TRENDS
            </button>
          </div>
        </div>

        {activeTab === '90m' ? (
          <>
            <div className="h-36 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MATCH_OUTPUT_DECAY}
                  margin={{ top: 6, right: 6, left: -28, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="neonLimeGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                      <stop offset="90%" stopColor={strokeColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="minute"
                    stroke={axisTextColor}
                    fontSize={9}
                    tickLine={false}
                    axisLine={{ stroke: gridLineColor }}
                    dy={2}
                  />

                  <YAxis
                    stroke={axisTextColor}
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    domain={[60, 105]}
                    tickFormatter={(v) => `${v}%`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <ReferenceLine
                    x="45'"
                    stroke="#334431"
                    strokeDasharray="2 2"
                    label={{ value: 'HT', fill: axisTextColor, fontSize: 8, position: 'top' }}
                  />

                  <Area
                    type="monotone"
                    dataKey="outputPct"
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill="url(#neonLimeGlow)"
                    activeDot={{
                      r: 4,
                      fill: strokeColor,
                      stroke: '#131A12',
                      strokeWidth: 2,
                    }}
                    dot={{
                      r: 2,
                      fill: strokeColor,
                      strokeWidth: 0,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-400">76' Live · 78% Output</span>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <TrendingDown className="w-3 h-3" />
                <span>-22% 2nd Half</span>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-1.5 my-1">
            {MATCHDAY_TRENDS.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#243023] border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{item.matchday}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/[0.08] text-zinc-300 font-mono">
                      {item.result}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                    {item.distance}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black font-mono text-[#CCFF00]">
                    {item.score}
                  </div>
                  <div className="text-[9px] text-zinc-500 font-mono">Readiness</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

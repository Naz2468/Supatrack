import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Zap, 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingDown, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Gauge, 
  Info 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine, 
  Cell 
} from 'recharts';
import { SquadMemberHealth } from '../../data/mobileMockData';

export type DrillDownMetricType = 'heartRate' | 'sprints' | 'distance' | 'recovery';

interface MetricDrillDownModalProps {
  isOpen: boolean;
  metricType: DrillDownMetricType;
  player: SquadMemberHealth;
  onClose: () => void;
  onSwitchMetric?: (type: DrillDownMetricType) => void;
}

// 1. Heart Rate Time Series Data (0' to 90')
const HR_MATCH_DATA = [
  { minute: "0'", bpm: 118, zone: 'Zone 1 Warmup', label: 'Kickoff' },
  { minute: "10'", bpm: 144, zone: 'Zone 3 Aerobic' },
  { minute: "20'", bpm: 168, zone: 'Zone 4 Threshold' },
  { minute: "30'", bpm: 162, zone: 'Zone 4 Threshold' },
  { minute: "40'", bpm: 174, zone: 'Zone 4 Threshold' },
  { minute: "45'", bpm: 172, zone: 'Zone 4 Threshold', label: '1st Half' },
  { minute: "HT", bpm: 148, zone: 'Zone 3 Recovery', label: '-24 bpm' },
  { minute: "55'", bpm: 169, zone: 'Zone 4 Threshold' },
  { minute: "65'", bpm: 178, zone: 'Zone 4 High' },
  { minute: "68'", bpm: 184, zone: 'Zone 5 Anaerobic', label: 'Peak 184' },
  { minute: "76'", bpm: 178, zone: 'Zone 4 Sustained', label: "Live 76'" },
  { minute: "85'", bpm: 175, zone: 'Zone 4 Sustained' },
  { minute: "90'", bpm: 173, zone: 'Zone 4 Final' },
];

// 2. Sprint Segments Data (15-min intervals)
const SPRINT_SEGMENTS_DATA = [
  { interval: "0'-15'", sprints: 8, avgSpeed: 28.4, topSpeed: 33.1 },
  { interval: "15'-30'", sprints: 9, avgSpeed: 31.2, topSpeed: 34.8, isPeak: true },
  { interval: "30'-45'", sprints: 6, avgSpeed: 27.6, topSpeed: 30.4 },
  { interval: "45'-60'", sprints: 5, avgSpeed: 25.8, topSpeed: 28.2 },
  { interval: "60'-75'", sprints: 2, avgSpeed: 22.4, topSpeed: 24.6, isDecay: true },
  { interval: "75'-90'", sprints: 1, avgSpeed: 20.6, topSpeed: 21.5, isDecay: true },
];

// 3. Distance & Pace Distribution Data (Match Quarters)
const DISTANCE_QUARTERS_DATA = [
  { segment: 'Q1 (0-22\')', cumulativeKm: 2.74, paceKmh: 7.4, hidKm: 0.78 },
  { segment: 'Q2 (23-45\')', cumulativeKm: 5.36, paceKmh: 7.1, hidKm: 0.72 },
  { segment: 'Q3 (46-68\')', cumulativeKm: 7.82, paceKmh: 6.5, hidKm: 0.54 },
  { segment: 'Q4 (69-90\')', cumulativeKm: 9.84, paceKmh: 5.6, hidKm: 0.37 },
];

// 4. Recovery & Physical Readiness Decay Curve Data (0' to 76' Live)
const READINESS_DECAY_DATA = [
  { minute: "0'", readiness: 100, status: 'Primed' },
  { minute: "15'", readiness: 94, status: 'Optimal' },
  { minute: "30'", readiness: 87, status: 'Optimal' },
  { minute: "45'", readiness: 79, status: 'Sub-Optimal' },
  { minute: "HT", readiness: 84, status: 'Partial Recovery' },
  { minute: "55'", readiness: 77, status: 'Moderate Load' },
  { minute: "65'", readiness: 70, status: 'Fatigue Threshold' },
  { minute: "68'", readiness: 66, status: 'Critical Strain' },
  { minute: "76'", readiness: 61, status: 'Sub Recommended', isCurrent: true },
  { minute: "90'", readiness: 53, status: 'High Injury Risk' },
];

export const MetricDrillDownModal: React.FC<MetricDrillDownModalProps> = ({
  isOpen,
  metricType,
  player,
  onClose,
  onSwitchMetric,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#131A12] border border-white/[0.12] rounded-t-[32px] sm:rounded-[32px] p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative max-h-[92vh] overflow-y-auto text-white transition-all animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle for Mobile */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Top Floating Close Button - Circular Stark White */}
        <button
          onClick={onClose}
          aria-label="Close drill-down modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white text-[#131A12] flex items-center justify-center font-black hover:bg-zinc-200 active:scale-95 transition-all shadow-lg cursor-pointer z-10"
        >
          <X className="w-4 h-4 stroke-[2.8]" />
        </button>

        {/* Player ID Context Strip */}
        <div className="flex items-center gap-2 mb-3 pr-10">
          <div className="w-7 h-7 rounded-full bg-white text-[#131A12] font-mono font-black text-xs flex items-center justify-center shadow">
            #{player.number}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">{player.name}</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/[0.08] text-[#CCFF00]">
                {player.position}
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400">
              Live Matchday 24 · Minute 76'
            </p>
          </div>
        </div>

        {/* Metric Switcher Tab Pill Row */}
        <div className="flex items-center gap-1.5 p-1 bg-[#1F291E] border border-white/[0.08] rounded-2xl mb-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onSwitchMetric?.('heartRate')}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
              metricType === 'heartRate'
                ? 'bg-[#CCFF00] text-[#131A12] shadow-[0_0_12px_rgba(204,255,0,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Heart className="w-3 h-3 shrink-0" />
            <span>Heart Rate</span>
          </button>

          <button
            onClick={() => onSwitchMetric?.('sprints')}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
              metricType === 'sprints'
                ? 'bg-[#CCFF00] text-[#131A12] shadow-[0_0_12px_rgba(204,255,0,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Zap className="w-3 h-3 shrink-0" />
            <span>Sprints</span>
          </button>

          <button
            onClick={() => onSwitchMetric?.('distance')}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
              metricType === 'distance'
                ? 'bg-[#CCFF00] text-[#131A12] shadow-[0_0_12px_rgba(204,255,0,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Activity className="w-3 h-3 shrink-0" />
            <span>Distance</span>
          </button>

          <button
            onClick={() => onSwitchMetric?.('recovery')}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
              metricType === 'recovery'
                ? 'bg-[#CCFF00] text-[#131A12] shadow-[0_0_12px_rgba(204,255,0,0.35)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>Recovery</span>
          </button>
        </div>

        {/* =========================================================================
            A. HEART RATE MODAL CONTENT
           ========================================================================= */}
        {metricType === 'heartRate' && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-pulse" />
                <h2 className="text-base font-black text-white font-mono tracking-tight">
                  Heart Rate Intensity Over Match Time (BPM)
                </h2>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Real-time photoplethysmography (PPG) cardiac load profile (0' - 90')
              </p>
            </div>

            {/* Smooth Area Chart */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#CCFF00] font-black">CUR: {player.heartRate} BPM</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-[#FF4D4D] font-black">PEAK: 184 BPM (68')</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-[#FF6B6B] border border-red-500/30">
                  Zone 5 Critical
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={HR_MATCH_DATA} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.45} />
                        <stop offset="60%" stopColor="#CCFF00" stopOpacity={0.08} />
                        <stop offset="100%" stopColor="#CCFF00" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="minute" 
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[100, 200]}
                      ticks={[120, 140, 160, 180]}
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    {/* Zone 5 Threshold Line (180 BPM) */}
                    <ReferenceLine 
                      y={180} 
                      stroke="#FF4D4D" 
                      strokeDasharray="3 3" 
                      strokeWidth={1.5}
                      label={{ 
                        value: 'Zone 5 (180+)', 
                        fill: '#FF6B6B', 
                        fontSize: 9, 
                        position: 'insideTopRight' 
                      }} 
                    />
                    {/* Zone 4 Threshold Line (160 BPM) */}
                    <ReferenceLine 
                      y={160} 
                      stroke="rgba(255, 255, 255, 0.2)" 
                      strokeDasharray="2 2" 
                      label={{ 
                        value: 'Zone 4 (160)', 
                        fill: '#9EAB9C', 
                        fontSize: 9, 
                        position: 'insideTopRight' 
                      }} 
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-[#161F15] border border-[#CCFF00]/50 rounded-xl px-2.5 py-1.5 shadow-xl text-xs font-mono">
                              <div className="text-white font-bold">{d.minute} — <span className="text-[#CCFF00] font-black">{d.bpm} BPM</span></div>
                              <div className="text-[10px] text-zinc-400">{d.zone}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="bpm" 
                      stroke="#CCFF00" 
                      strokeWidth={2.5} 
                      fill="url(#hrGradient)" 
                      dot={{ r: 3, fill: '#CCFF00', stroke: '#131A12', strokeWidth: 1.5 }}
                      activeDot={{ r: 5, fill: '#FFFFFF', stroke: '#CCFF00', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Zone Legend */}
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mt-2 pt-2 border-t border-white/[0.06] overflow-x-auto scrollbar-none gap-2">
                <span className="flex items-center gap-1 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Z1 Warmup (&lt;120)</span>
                <span className="flex items-center gap-1 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Z2-3 Aerobic (120-160)</span>
                <span className="flex items-center gap-1 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Z4 Threshold (160-180)</span>
                <span className="flex items-center gap-1 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]" />Z5 Anaerobic (180+)</span>
              </div>
            </div>

            {/* Sports Science Breakdown 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Peak BPM</div>
                <div className="text-xl font-black font-mono text-[#FF4D4D] mt-0.5">
                  184 <span className="text-[10px] text-zinc-400 font-normal">bpm</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Zone 5 Anaerobic at 68'
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Time in HR Zone 5</div>
                <div className="text-xl font-black font-mono text-[#CCFF00] mt-0.5">
                  8 <span className="text-[10px] text-zinc-400 font-normal">mins</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  High Cardiac Strain
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Recovery Rate</div>
                <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                  -24 <span className="text-[10px] text-zinc-400 font-normal">bpm</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Drop during half-time break
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Current Load</div>
                <div className="text-xl font-black font-mono text-white mt-0.5">
                  {player.heartRate} <span className="text-[10px] text-zinc-400 font-normal">bpm</span>
                </div>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                  Minute 76' Sustained
                </div>
              </div>
            </div>

            {/* Tactical Insight Callout Box */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-[#CCFF00]/40 shadow-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-black text-[#CCFF00] uppercase mb-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Tactical Insight</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                Sustained high cardiac load without adequate recovery indicates severe physiological strain.
              </p>
            </div>

            {/* Crisp Coaching Bullet Points */}
            <div className="p-3.5 rounded-2xl bg-[#243023]/60 border border-white/[0.06] text-xs space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                Coaching Staff Readout
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Cardiac Drift:</strong> Baseline HR drifted +9 bpm higher in 2nd half compared to equivalent match tempos in 1st half.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Zone 5 Threshold:</strong> Exceeded recommended 6-minute safe exposure ceiling by 33% due to high-press pressing bursts.</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            B. SPRINTS MODAL CONTENT
           ========================================================================= */}
        {metricType === 'sprints' && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#CCFF00]" />
                <h2 className="text-base font-black text-white font-mono tracking-tight">
                  Sprint Frequency & Velocity Profile
                </h2>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Match segmentation audit per 15-minute intervals (&gt;20 km/h)
              </p>
            </div>

            {/* Vertical Bar Chart */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#CCFF00] font-black">TOTAL: 31 RUNS</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-white font-bold">PEAK: 34.8 KM/H</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  -35% Decay
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPRINT_SEGMENTS_DATA} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="interval" 
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[0, 10]}
                      ticks={[2, 4, 6, 8, 10]}
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-[#161F15] border border-[#CCFF00]/50 rounded-xl px-2.5 py-1.5 shadow-xl text-xs font-mono">
                              <div className="text-white font-bold">{d.interval}</div>
                              <div className="text-[#CCFF00] font-black">{d.sprints} Sprints (&gt;20km/h)</div>
                              <div className="text-[10px] text-zinc-400">Avg: {d.avgSpeed} km/h · Top: {d.topSpeed} km/h</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="sprints" 
                      radius={[6, 6, 0, 0]}
                    >
                      {SPRINT_SEGMENTS_DATA.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isPeak ? '#CCFF00' : entry.isDecay ? '#FF6B6B' : '#7CB342'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Segment Legend */}
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mt-2 pt-2 border-t border-white/[0.06]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#CCFF00]" />Peak Output (15'-30')</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#7CB342]" />Nominal Burst</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FF6B6B]" />Severe Decay (&gt;65')</span>
              </div>
            </div>

            {/* Sports Science Breakdown 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Total Sprints (&gt;20km/h)</div>
                <div className="text-xl font-black font-mono text-white mt-0.5">
                  31 <span className="text-[10px] text-zinc-400 font-normal">runs</span>
                </div>
                <div className="text-[10px] text-[#CCFF00] font-mono mt-0.5">
                  74% in 1st half
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Top Burst Speed</div>
                <div className="text-xl font-black font-mono text-[#CCFF00] mt-0.5">
                  34.8 <span className="text-[10px] text-zinc-400 font-normal">km/h</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Logged at 22' counter-attack
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Velocity Decay</div>
                <div className="text-xl font-black font-mono text-[#FF4D4D] mt-0.5">
                  -35% <span className="text-[10px] text-zinc-400 font-normal">drop</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Decrease in accel after 65'
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">10m Accel Time</div>
                <div className="text-xl font-black font-mono text-amber-400 mt-0.5">
                  1.94s <span className="text-[10px] text-zinc-400 font-normal">(+0.32s)</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Slower explosive onset
                </div>
              </div>
            </div>

            {/* Tactical Insight Callout Box */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-[#CCFF00]/40 shadow-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-black text-[#CCFF00] uppercase mb-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Tactical Insight</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                High explosive output in the 1st half leading to sharp power degradation past the 65-minute mark.
              </p>
            </div>

            {/* Crisp Coaching Bullet Points */}
            <div className="p-3.5 rounded-2xl bg-[#243023]/60 border border-white/[0.06] text-xs space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                Coaching Staff Readout
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Front-Loaded Workload:</strong> 23 of 31 sprints occurred before half-time, exhausting fast-twitch motor units.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Transition Risk:</strong> Player cannot sustain defensive recovery runs on wing counter-attacks; recommend fresh legs.</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            C. DISTANCE MODAL CONTENT
           ========================================================================= */}
        {metricType === 'distance' && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#CCFF00]" />
                <h2 className="text-base font-black text-white font-mono tracking-tight">
                  Cumulative Distance & Pace Distribution
                </h2>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Quarter-by-quarter GPS volume and pace efficiency metrics
              </p>
            </div>

            {/* Dual Line / Area Chart */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#CCFF00] font-black">TOTAL: 9.84 KM</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-white font-bold">HID: 2.41 KM</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.08] text-white">
                  Target: 10.5 km
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DISTANCE_QUARTERS_DATA} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="distGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#CCFF00" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="segment" 
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[0, 11]}
                      ticks={[2, 4, 6, 8, 10]}
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-[#161F15] border border-[#CCFF00]/50 rounded-xl px-2.5 py-1.5 shadow-xl text-xs font-mono">
                              <div className="text-white font-bold">{d.segment}</div>
                              <div className="text-[#CCFF00] font-black">Cumulative: {d.cumulativeKm} km</div>
                              <div className="text-white">Avg Pace: {d.paceKmh} km/h</div>
                              <div className="text-[10px] text-zinc-400">High-Intensity: {d.hidKm} km</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cumulativeKm" 
                      stroke="#CCFF00" 
                      strokeWidth={2.5} 
                      fill="url(#distGradient)" 
                      dot={{ r: 4, fill: '#CCFF00', stroke: '#131A12', strokeWidth: 1.5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="paceKmh" 
                      stroke="#FFFFFF" 
                      strokeWidth={1.5} 
                      strokeDasharray="3 3"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mt-2 pt-2 border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-[#CCFF00] rounded-full" />Cumulative Distance (km)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-white border-dashed border-b" />Pace Efficiency (km/h)</span>
              </div>
            </div>

            {/* Walking / Jogging / Sprinting Split Bar */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="font-bold text-white uppercase">Movement Intensity Split</span>
                <span className="text-[#CCFF00] font-mono">100% Volume</span>
              </div>

              {/* Segmented Progress Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/[0.08] p-0.5 gap-0.5">
                <div className="h-full bg-zinc-400 rounded-l-full" style={{ width: '38%' }} title="Walking 38%" />
                <div className="h-full bg-emerald-400" style={{ width: '44%' }} title="Jogging 44%" />
                <div className="h-full bg-[#CCFF00] rounded-r-full shadow-[0_0_8px_#CCFF00]" style={{ width: '18%' }} title="High-Speed Running 18%" />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono mt-2 pt-1 text-zinc-300">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-zinc-400" />38% Walking</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-400" />44% Jogging</span>
                <span className="flex items-center gap-1 text-[#CCFF00] font-bold"><span className="w-2 h-2 rounded-sm bg-[#CCFF00]" />18% Sprinting</span>
              </div>
            </div>

            {/* Sports Science Breakdown 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Total Distance</div>
                <div className="text-xl font-black font-mono text-white mt-0.5">
                  9.84 <span className="text-[10px] text-zinc-400 font-normal">km</span>
                </div>
                <div className="text-[10px] text-[#CCFF00] font-mono mt-0.5">
                  Workload volume on target
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">High-Intensity Dist (HID)</div>
                <div className="text-xl font-black font-mono text-[#CCFF00] mt-0.5">
                  2.41 <span className="text-[10px] text-zinc-400 font-normal">km</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  24.5% of total volume
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Jogging Volume</div>
                <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                  4.33 <span className="text-[10px] text-zinc-400 font-normal">km</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  44% aerobic cruising
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Walking Recovery</div>
                <div className="text-xl font-black font-mono text-zinc-300 mt-0.5">
                  3.74 <span className="text-[10px] text-zinc-400 font-normal">km</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  38% low speed transition
                </div>
              </div>
            </div>

            {/* Tactical Insight Callout Box */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-[#CCFF00]/40 shadow-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-black text-[#CCFF00] uppercase mb-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Tactical Insight</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                Workload volume sits within target parameters, but pace efficiency drops during transitions in the 2nd half.
              </p>
            </div>

            {/* Crisp Coaching Bullet Points */}
            <div className="p-3.5 rounded-2xl bg-[#243023]/60 border border-white/[0.06] text-xs space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                Coaching Staff Readout
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Pace Degradation:</strong> Operating pace fell from 7.4 km/h in Q1 to 5.6 km/h in Q4, indicating muscular fatigue.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Coverage Consistency:</strong> Lateral wing coverage remained within tactical parameters despite slower recovery transitions.</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            D. RECOVERY MODAL CONTENT
           ========================================================================= */}
        {metricType === 'recovery' && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#CCFF00]" />
                <h2 className="text-base font-black text-white font-mono tracking-tight">
                  Physical Readiness & Fatigue Decay
                </h2>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Acute neuromuscular readiness tracking from kickoff (100%) to 76' (61%)
              </p>
            </div>

            {/* Step/Gauge Decay Curve Chart */}
            <div className="p-3.5 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#CCFF00] font-black">READINESS: 61%</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-amber-400 font-bold">ACWR: 1.28</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-[#FF6B6B] border border-red-500/30 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  Sub Advised
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={READINESS_DECAY_DATA} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="readinessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.45} />
                        <stop offset="60%" stopColor="#FF9F43" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#FF4D4D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="minute" 
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[40, 105]}
                      ticks={[50, 65, 80, 100]}
                      tick={{ fill: '#8FA18E', fontSize: 10, fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    {/* Safety Threshold Line at 70% */}
                    <ReferenceLine 
                      y={70} 
                      stroke="#FF4D4D" 
                      strokeDasharray="3 3" 
                      strokeWidth={1.5}
                      label={{ 
                        value: 'Safety Threshold (70%)', 
                        fill: '#FF6B6B', 
                        fontSize: 9, 
                        position: 'insideBottomRight' 
                      }} 
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-[#161F15] border border-[#CCFF00]/50 rounded-xl px-2.5 py-1.5 shadow-xl text-xs font-mono">
                              <div className="text-white font-bold">{d.minute} — <span className="text-[#CCFF00] font-black">{d.readiness}%</span></div>
                              <div className="text-[10px] text-zinc-400">{d.status}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="stepAfter" 
                      dataKey="readiness" 
                      stroke="#CCFF00" 
                      strokeWidth={2.5} 
                      fill="url(#readinessGradient)" 
                      dot={{ r: 3, fill: '#CCFF00', stroke: '#131A12', strokeWidth: 1.5 }}
                      activeDot={{ r: 5, fill: '#FFFFFF', stroke: '#CCFF00', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Threshold Status */}
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mt-2 pt-2 border-t border-white/[0.06]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#CCFF00]" />Kickoff 100%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />Half-Time 84%</span>
                <span className="flex items-center gap-1 text-[#FF6B6B] font-bold"><span className="w-2 h-2 rounded-full bg-[#FF4D4D]" />Live 76' (61%)</span>
              </div>
            </div>

            {/* Sports Science Breakdown 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Current Readiness</div>
                <div className="text-xl font-black font-mono text-[#FF4D4D] mt-0.5">
                  61% <span className="text-[10px] text-zinc-400 font-normal">score</span>
                </div>
                <div className="text-[10px] text-red-400 font-mono mt-0.5">
                  Sub Recommended
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Neuromuscular Fatigue</div>
                <div className="text-xl font-black font-mono text-amber-400 mt-0.5">
                  +14% <span className="text-[10px] text-zinc-400 font-normal">index</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Elevated CNS strain
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">ACWR Ratio</div>
                <div className="text-xl font-black font-mono text-[#CCFF00] mt-0.5">
                  1.28 <span className="text-[10px] text-zinc-400 font-normal">ratio</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Sweet Spot boundary
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Injury Risk Index</div>
                <div className="text-xl font-black font-mono text-[#FF4D4D] mt-0.5">
                  High <span className="text-[10px] text-zinc-400 font-normal">hamstring</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  +12% Stride Asymmetry
                </div>
              </div>
            </div>

            {/* Tactical Insight Callout Box */}
            <div className="p-3.5 rounded-2xl bg-[#241F1A] border border-amber-500/50 shadow-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-black text-amber-400 uppercase mb-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Tactical Insight</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                Fatigue decay has crossed safety threshold. Immediate substitution recommended to prevent acute hamstring strain.
              </p>
            </div>

            {/* Crisp Coaching Bullet Points */}
            <div className="p-3.5 rounded-2xl bg-[#243023]/60 border border-white/[0.06] text-xs space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                Coaching Staff Readout
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Threshold Breach:</strong> Readiness dropped under the 70% benchmark at 65', compounding with IMU gait asymmetry.</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
                <span><strong>Clinical Directive:</strong> Swap player before 80' to prevent acute structural hamstring pull during transition sprints.</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Action Bar */}
        <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-500">
            SupaTrack BioSensors · 100Hz RTK
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-[#131A12] text-xs font-black hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';
import { RoleMode } from './MobileHeader';

interface StatsGrid2x2Props {
  player: SquadMemberHealth;
  roleMode: RoleMode;
  onCardClick?: (cardType: string) => void;
}

export const StatsGrid2x2: React.FC<StatsGrid2x2Props> = ({
  player,
  onCardClick,
}) => {
  const isImuWarning = player.imu.status === 'Warning' || player.imu.deviationPct > 8;
  const acwrRatio = Number((player.strainScore / 13).toFixed(2));
  const isAcwrHigh = acwrRatio > 1.3;

  return (
    <div className="w-full px-4">
      {/* Minimal 2x2 Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* CARD 1: Supa Rating */}
        <div
          onClick={() => onCardClick?.('supaRating')}
          className="rounded-2xl bg-[#1F291E] border border-white/[0.08] p-3.5 flex flex-col justify-between hover:border-[#CCFF00]/40 transition-all cursor-pointer shadow-md active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="font-extrabold tracking-wider uppercase">SUPA RATING</span>
              <span className="text-[#CCFF00] font-black px-1.5 py-0.2 rounded bg-white/[0.06]">
                {player.position}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-3xl font-black font-mono text-[#CCFF00] tabular-nums">
                {player.supaRating.overallScore}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold">/100</span>
            </div>

            <p className="text-[11px] font-bold text-white mt-1 truncate">
              {player.supaRating.roleTitle}
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>EFF {player.supaRating.tacticalEfficiency}%</span>
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span>
              <span className="text-white font-bold">Rank #1</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Stride Asymmetry (MPU6050 IMU) */}
        <div
          onClick={() => onCardClick?.('imu')}
          className={`rounded-2xl border p-3.5 flex flex-col justify-between transition-all cursor-pointer shadow-md active:scale-[0.99] ${
            isImuWarning
              ? 'bg-[#241F1A] border-amber-500/40 hover:border-amber-400/70'
              : 'bg-[#1F291E] border-white/[0.08] hover:border-[#CCFF00]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="font-extrabold tracking-wider uppercase text-zinc-400">
                ASYMMETRY
              </span>
              {isImuWarning ? (
                <span className="text-amber-400 font-black px-1.5 py-0.2 rounded bg-amber-400/10 flex items-center gap-0.5">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  ALERT
                </span>
              ) : (
                <span className="text-[#CCFF00] font-black px-1.5 py-0.2 rounded bg-[#CCFF00]/10 flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  OK
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1 mt-1.5">
              <span className={`text-3xl font-black font-mono tabular-nums ${
                isImuWarning ? 'text-amber-400' : 'text-white'
              }`}>
                +{player.imu.deviationPct}%
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold">DEV</span>
            </div>

            <p className="text-[11px] font-bold text-zinc-200 mt-1 truncate">
              {isImuWarning ? 'Left Stride Bias' : 'Gait Symmetrical'}
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>{player.imu.groundContactTimeMs}ms GCT</span>
            <span className="text-white hover:text-[#CCFF00] flex items-center gap-0.5 font-bold">
              Inspect <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

        {/* CARD 3: Sprint Volume */}
        <div
          onClick={() => onCardClick?.('sprints')}
          className="rounded-2xl bg-[#1F291E] border border-white/[0.08] p-3.5 flex flex-col justify-between hover:border-[#CCFF00]/40 transition-all cursor-pointer shadow-md active:scale-[0.99] group"
          title="Click to view Sprint Frequency & Velocity Profile drill-down chart"
        >
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="font-extrabold tracking-wider uppercase group-hover:text-white transition-colors">SPRINTS</span>
              <span className="text-white font-bold">{player.distanceCoveredKm} km</span>
            </div>

            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-3xl font-black font-mono text-white tabular-nums group-hover:text-[#CCFF00] transition-colors">
                {player.sprintCount}
              </span>
              <span className="text-[10px] font-mono text-[#CCFF00] font-bold">&gt;20km/h</span>
            </div>

            <p className="text-[11px] font-bold text-zinc-300 mt-1 truncate">
              Max {player.topSpeedKmh} km/h
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400">Velocity Profile</span>
            <span className="text-[#CCFF00] text-[10px] font-mono font-bold flex items-center gap-0.5">
              Inspect <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

        {/* CARD 4: ACWR (Workload) */}
        <div
          onClick={() => onCardClick?.('recovery')}
          className="rounded-2xl bg-[#1F291E] border border-white/[0.08] p-3.5 flex flex-col justify-between hover:border-[#CCFF00]/40 transition-all cursor-pointer shadow-md active:scale-[0.99] group"
          title="Click to view Physical Readiness & Fatigue Decay drill-down chart"
        >
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="font-extrabold tracking-wider uppercase group-hover:text-white transition-colors">ACWR RATIO</span>
              <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                isAcwrHigh ? 'bg-amber-400/15 text-amber-400' : 'bg-[#CCFF00]/15 text-[#CCFF00]'
              }`}>
                {isAcwrHigh ? 'ELEVATED' : 'OPTIMAL'}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mt-1.5">
              <span className={`text-3xl font-black font-mono tabular-nums ${
                isAcwrHigh ? 'text-amber-400' : 'text-[#CCFF00]'
              }`}>
                {acwrRatio.toFixed(2)}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold">RATIO</span>
            </div>

            <p className="text-[11px] font-bold text-zinc-300 mt-1 truncate">
              {player.recoveryScore}% Recovery
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>{player.strainScore} Strain</span>
            <span className="text-[#CCFF00] text-[10px] font-mono font-bold flex items-center gap-0.5">
              Decay <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

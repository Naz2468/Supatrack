/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Heart,
  TrendingDown
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface IndividualBiometricsCardProps {
  player: SquadMemberHealth;
}

export const IndividualBiometricsCard: React.FC<IndividualBiometricsCardProps> = ({
  player,
}) => {
  const isImuWarning = player.imu.deviationPct > 8;

  return (
    <div className="w-full px-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Individual Biometrics & IMU
          </h2>
        </div>
        <span className="text-[11px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2.5 py-0.5 rounded-full border border-[#DCF0DF]">
          MPU6050 200Hz
        </span>
      </div>

      <div className="p-5 rounded-3xl bg-white border border-[#DCF0DF] shadow-xs space-y-4">
        
        {/* Metric 1: Stride Bias & Asymmetry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-600 font-bold flex items-center gap-1.5">
              <span>Stride Bias & Asymmetry</span>
              {isImuWarning ? (
                <span className="text-amber-600 font-bold flex items-center gap-1 text-[11px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <AlertTriangle className="w-3 h-3" />
                  +{player.imu.deviationPct}% Asym Alert
                </span>
              ) : (
                <span className="text-[#16A34A] font-bold text-[11px] bg-[#EBF7EE] px-2 py-0.5 rounded-full">
                  Nominal
                </span>
              )}
            </span>
            <span className="text-[#132216] font-bold">{player.imu.currentLeftPct}% L / {player.imu.currentRightPct}% R</span>
          </div>

          {/* Visual Stride Distribution Bar */}
          <div className="h-3 w-full bg-[#F5FAF6] rounded-full overflow-hidden p-0.5 flex border border-[#DEEEDE]">
            <div 
              style={{ width: `${player.imu.currentLeftPct}%` }}
              className="h-full bg-amber-400 rounded-l-full relative transition-all"
            />
            <div 
              style={{ width: `${player.imu.currentRightPct}%` }}
              className="h-full bg-[#16A34A] rounded-r-full relative transition-all"
            />
          </div>

          <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
            <span>Left Foot Contact ({player.imu.currentLeftPct}%)</span>
            <span>Baseline {player.imu.baselineFootedness}</span>
            <span>Right Foot Contact ({player.imu.currentRightPct}%)</span>
          </div>
        </div>

        {/* Metric 2 & 3: Ground Contact Time & Zone 5 Heart Rate */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F0F6F1]">
          <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Contact Time</span>
            </div>
            <div className="text-xl font-black text-[#132216]">
              {player.imu.groundContactTimeMs} <span className="text-xs font-normal text-zinc-400">ms</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium mt-0.5 block">
              Cadence: 184 steps/min
            </span>
          </div>

          <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-[#E5EFE6]">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Zone 5 Time</span>
            </div>
            <div className="text-xl font-black text-[#132216]">
              18:24 <span className="text-xs font-normal text-zinc-400">min</span>
            </div>
            <span className="text-[10px] text-rose-600 font-semibold mt-0.5 block">
              Max HR: {player.heartRate} bpm
            </span>
          </div>
        </div>

        {/* Metric 4: Recovery Readiness Meter */}
        <div className="p-3.5 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white text-[#16A34A] flex items-center justify-center shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#132216] block">
                Readiness Score: {player.recoveryScore}%
              </span>
              <span className="text-[11px] text-zinc-500 font-medium">
                HRV: 64ms · Strain: {player.strainScore}/21
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-[#16A34A] bg-white px-2.5 py-1 rounded-full border border-[#DCF0DF] shadow-xs">
            Optimal
          </span>
        </div>
      </div>
    </div>
  );
};

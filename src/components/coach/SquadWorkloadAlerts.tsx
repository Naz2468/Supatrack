/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Zap, 
  Heart, 
  CheckCircle2, 
  ChevronRight,
  Activity
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface SquadWorkloadAlertsProps {
  players: SquadMemberHealth[];
  onInspectPlayer: (player: SquadMemberHealth) => void;
  onFlagSub: (player: SquadMemberHealth) => void;
  flaggedPlayerIds: string[];
}

export const SquadWorkloadAlerts: React.FC<SquadWorkloadAlertsProps> = ({
  players,
  onInspectPlayer,
  onFlagSub,
  flaggedPlayerIds,
}) => {
  // Find high-risk athletes
  const highRiskPlayers = players.filter(
    (p) => 
      p.imu.deviationPct >= 10 || 
      p.fatigueStatus === 'Substitution Recommended' ||
      (p.strainScore / 13) >= 1.40
  );

  const cautionPlayers = players.filter(
    (p) => 
      !highRiskPlayers.includes(p) && 
      (p.fatigueStatus === 'Caution' || p.imu.deviationPct > 5)
  );

  return (
    <div className="w-full px-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Workload & Fatigue Alerts
          </h2>
        </div>
        <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          {highRiskPlayers.length} Critical · {cautionPlayers.length} Caution
        </span>
      </div>

      {/* Critical High-Risk Alert Cards */}
      <div className="space-y-2.5">
        {highRiskPlayers.map((player) => {
          const isFlagged = flaggedPlayerIds.includes(player.id);
          const acwr = (player.strainScore / 11.2).toFixed(2);

          return (
            <div
              key={player.id}
              className="p-4 rounded-3xl bg-white border border-rose-200 shadow-xs hover:border-rose-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-sm">
                    #{player.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-black text-[#132216]">
                        {player.name}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {player.position}
                      </span>
                    </div>
                    <p className="text-xs text-rose-600 font-semibold mt-0.5">
                      ACWR: {acwr} · Asymmetry: +{player.imu.deviationPct}%
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-[#132216] block">
                    {player.imu.groundContactTimeMs} ms
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    Ground Contact
                  </span>
                </div>
              </div>

              {/* Quick telemetry indicators */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-rose-100 text-center">
                <div className="bg-rose-50/60 rounded-xl p-2 border border-rose-100">
                  <span className="text-[10px] text-zinc-500 font-semibold block">Gait Bias</span>
                  <span className="text-xs font-black text-rose-700">
                    {player.imu.currentLeftPct}% L / {player.imu.currentRightPct}% R
                  </span>
                </div>
                <div className="bg-[#F8FAF8] rounded-xl p-2 border border-[#E5EFE6]">
                  <span className="text-[10px] text-zinc-500 font-semibold block">Heart Rate</span>
                  <span className="text-xs font-black text-[#132216]">
                    {player.heartRate} bpm
                  </span>
                </div>
                <div className="bg-[#F8FAF8] rounded-xl p-2 border border-[#E5EFE6]">
                  <span className="text-[10px] text-zinc-500 font-semibold block">Work Rate</span>
                  <span className="text-xs font-black text-[#132216]">
                    {player.distanceCoveredKm} km
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-2">
                <button
                  onClick={() => onInspectPlayer(player)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#F5FAF6] border border-[#DEEEDE] hover:bg-emerald-50 text-[#16A34A] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Biomechanics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onFlagSub(player)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    isFlagged
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {isFlagged ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-700" />
                      <span>Sub Flagged</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Flag Sub</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* Caution Row Summary */}
        {cautionPlayers.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#16A34A] flex items-center justify-center shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#132216] block">
                  {cautionPlayers.length} Athletes Approaching Workload Cap
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">
                  {cautionPlayers.map(p => `#${p.number} ${p.name.split(' ')[0]}`).join(', ')}
                </span>
              </div>
            </div>

            <button
              onClick={() => onInspectPlayer(cautionPlayers[0])}
              className="px-3 py-1.5 rounded-full bg-white text-[#16A34A] text-xs font-bold border border-[#DCF0DF] hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Bell, 
  BatteryCharging, 
  Wifi, 
  Camera, 
  ShieldCheck,
  Activity,
  Zap
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface PlayerHeaderProps {
  player: SquadMemberHealth;
  onOpenNotifications: () => void;
  onOpenSnapshots: () => void;
  unreadCount: number;
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  player,
  onOpenNotifications,
  onOpenSnapshots,
  unreadCount,
}) => {
  return (
    <header className="w-full px-5 pt-4 pb-2 space-y-3 bg-white text-[#132216]">
      {/* Top Bar: Athlete Passport Brand & Header Icons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] text-[#16A34A] flex items-center justify-center font-black text-sm shadow-xs">
            #{player.number}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 font-semibold">{player.position}</span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#EBF7EE] px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                Live Passport
              </span>
            </div>
            <h1 className="text-base font-black text-[#132216] leading-tight">
              {player.name}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSnapshots}
            className="w-9 h-9 rounded-full bg-[#F5FAF6] border border-[#DEEEDE] text-zinc-700 flex items-center justify-center hover:text-[#16A34A] active:scale-95 transition-colors cursor-pointer shadow-xs"
            title="UI Snapshots"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Alerts"
            className="w-9 h-9 rounded-full bg-[#F5FAF6] border border-[#DEEEDE] text-zinc-700 flex items-center justify-center hover:text-[#16A34A] active:scale-95 transition-colors relative cursor-pointer shadow-xs"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 px-1 min-w-[16px] h-4 bg-[#16A34A] text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Athlete Telemetry Sensor Strip */}
      <div className="p-3 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#16A34A] text-white text-[11px] font-bold shadow-xs">
            <Wifi className="w-3 h-3 animate-pulse" />
            <span>Vest Paired</span>
          </div>
          <span className="text-zinc-600 font-medium">{player.academyOrigin}</span>
          <span className="text-zinc-300 hidden sm:inline">·</span>
          <span className="text-zinc-500 font-medium hidden sm:inline">{player.positionGroup}</span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-600 font-semibold text-xs">
          <BatteryCharging className="w-4 h-4 text-[#16A34A]" />
          <span>94%</span>
        </div>
      </div>
    </header>
  );
};

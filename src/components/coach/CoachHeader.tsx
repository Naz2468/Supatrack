/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Radio, 
  Download, 
  Bell, 
  Wifi, 
  ShieldAlert,
  Activity,
  Users
} from 'lucide-react';

interface CoachHeaderProps {
  onExport: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  activeAlertCount: number;
}

export const CoachHeader: React.FC<CoachHeaderProps> = ({
  onExport,
  onOpenNotifications,
  unreadCount,
  activeAlertCount,
}) => {
  return (
    <header className="w-full px-5 pt-4 pb-2 space-y-3 bg-white text-[#132216]">
      {/* Top Branding & Direct Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] text-[#16A34A] flex items-center justify-center font-black shadow-xs">
            <Activity className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 font-semibold">Matchday 24</span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#EBF7EE] px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                76' LIVE
              </span>
            </div>
            <h1 className="text-base font-black text-[#132216] leading-tight">
              Coach Command
            </h1>
          </div>
        </div>

        {/* Quick Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5FAF6] border border-[#DEEEDE] text-[#16A34A] hover:bg-emerald-50 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            title="Export Squad Telemetry CSV"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Alerts"
            className="w-9 h-9 rounded-full bg-[#F5FAF6] border border-[#DEEEDE] text-zinc-700 flex items-center justify-center hover:text-[#16A34A] active:scale-95 transition-colors relative cursor-pointer shadow-xs"
          >
            <Bell className="w-4 h-4" />
            {(unreadCount > 0 || activeAlertCount > 0) && (
              <span className="absolute -top-0.5 -right-0.5 px-1 min-w-[16px] h-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {activeAlertCount > 0 ? activeAlertCount : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Squad-Wide Telemetry Monitoring Strip - Clean Retrowaves Green Pill */}
      <div className="p-3 rounded-2xl bg-[#EBF7EE] border border-[#DCF0DF] shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#16A34A] text-white text-[11px] font-bold shadow-xs">
            <Wifi className="w-3 h-3 animate-pulse" />
            <span>11 Synced</span>
          </div>
          <span className="text-zinc-600 font-medium">ESP-NOW 100Hz</span>
          <span className="text-zinc-300 hidden sm:inline">·</span>
          <span className="text-zinc-500 font-medium hidden sm:inline">RTK ±2cm</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-600 font-semibold">1-0 vs City</span>
          <span className="px-2 py-0.5 rounded-full bg-white text-[#16A34A] font-bold text-[10px] border border-[#DCF0DF]">
            MD24
          </span>
        </div>
      </div>
    </header>
  );
};

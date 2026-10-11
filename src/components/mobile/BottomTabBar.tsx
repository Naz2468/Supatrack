/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Activity, Users, BarChart3, MessageSquare } from 'lucide-react';

export type TabType = 'home' | 'squad' | 'reports' | 'chat';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadNotesCount?: number;
  customTabs?: TabConfig[];
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  unreadNotesCount = 0,
  customTabs,
}) => {
  const defaultTabs: TabConfig[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Activity,
    },
    {
      id: 'squad',
      label: 'Roster',
      icon: Users,
    },
    {
      id: 'reports',
      label: 'Telemetry',
      icon: BarChart3,
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageSquare,
      badge: unreadNotesCount,
    },
  ];

  const tabs = customTabs || defaultTabs;

  return (
    <div className="absolute bottom-3 left-3 right-3 z-40 pointer-events-none flex justify-center">
      <nav 
        aria-label="Floating Navigation Bar" 
        className="pointer-events-auto bg-white/95 backdrop-blur-2xl border border-[#DCF0DF] rounded-full p-1.5 shadow-[0_12px_36px_rgba(20,50,25,0.12)] flex items-center justify-between gap-1 max-w-[390px] w-full transition-all"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center transition-all duration-200 select-none cursor-pointer relative ${
                isActive
                  ? 'bg-[#16A34A] text-white px-4 h-11 rounded-full font-bold shadow-md shadow-emerald-600/25'
                  : 'w-11 h-11 rounded-full bg-[#F5FAF6] hover:bg-[#EBF7EE] text-zinc-500 hover:text-[#16A34A] border border-[#DEEEDE]'
              }`}
              title={tab.label}
            >
              <div className="flex items-center gap-1.5 shrink-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {isActive && (
                  <span className="text-xs font-bold tracking-tight whitespace-nowrap animate-in fade-in duration-150">
                    {tab.label}
                  </span>
                )}
              </div>

              {/* Notification Badge on inactive tabs */}
              {!isActive && tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#16A34A] text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

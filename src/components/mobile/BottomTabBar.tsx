import React from 'react';
import { Activity, Users, BarChart3, MessageSquare } from 'lucide-react';

export type TabType = 'home' | 'squad' | 'reports' | 'chat';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadNotesCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  unreadNotesCount,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Activity,
    },
    {
      id: 'squad' as TabType,
      label: 'Roster',
      icon: Users,
    },
    {
      id: 'reports' as TabType,
      label: 'Telemetry',
      icon: BarChart3,
    },
    {
      id: 'chat' as TabType,
      label: 'Chat',
      icon: MessageSquare,
      badge: unreadNotesCount,
    },
  ];

  return (
    <div className="fixed sm:absolute bottom-4 left-3 right-3 sm:left-4 sm:right-4 z-40 pointer-events-none flex justify-center">
      <nav 
        aria-label="Floating Navigation Bar" 
        className="pointer-events-auto bg-[#1F291E]/95 backdrop-blur-2xl border border-white/[0.12] rounded-[40px] p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex items-center justify-between gap-1 max-w-[390px] w-full transition-all"
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
                  ? 'bg-[#CCFF00] text-[#131A12] px-3.5 sm:px-4 h-11 rounded-full font-black shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                  : 'w-11 h-11 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white border border-white/[0.04]'
              }`}
              title={tab.label}
            >
              <div className="flex items-center gap-1.5 shrink-0">
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {isActive && (
                  <span className="text-xs font-bold tracking-tight font-sans whitespace-nowrap animate-in fade-in duration-150">
                    {tab.label}
                  </span>
                )}
              </div>

              {/* Notification Badge on inactive tabs */}
              {!isActive && tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CCFF00] text-[#131A12] font-mono font-black text-[9px] rounded-full flex items-center justify-center shadow-xs">
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


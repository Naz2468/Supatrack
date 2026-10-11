import React from 'react';
import { Home, BarChart2, Zap, Calendar, Settings } from 'lucide-react';

export type ConsumerTabType = 'home' | 'analysis' | 'live' | 'history' | 'settings';

interface ConsumerBottomNavProps {
  activeTab: ConsumerTabType;
  onTabChange: (tab: ConsumerTabType) => void;
  isLiveTrackingActive?: boolean;
}

export const ConsumerBottomNav: React.FC<ConsumerBottomNavProps> = ({
  activeTab,
  onTabChange,
  isLiveTrackingActive = false,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5EFE6] px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <nav aria-label="Consumer 5-Tab Navigation" className="max-w-md mx-auto flex items-center justify-between">
        {/* 1. Home (🏠) */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#16A34A]' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'home' ? 'bg-[#EBF7EE]' : ''}`}>
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Home</span>
        </button>

        {/* 2. Analysis (📊) */}
        <button
          onClick={() => onTabChange('analysis')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'analysis' ? 'text-[#16A34A]' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'analysis' ? 'bg-[#EBF7EE]' : ''}`}>
            <BarChart2 className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Analysis</span>
        </button>

        {/* 3. Live Session (⚡) - Center Prominent Action Button */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-5">
          <button
            onClick={() => onTabChange('live')}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
              activeTab === 'live' || isLiveTrackingActive
                ? 'bg-gradient-to-tr from-[#15803D] to-[#22C55E] text-white shadow-emerald-500/30 ring-4 ring-white'
                : 'bg-[#16A34A] text-white shadow-emerald-600/20 ring-4 ring-white hover:bg-[#15803D]'
            }`}
          >
            <Zap className={`w-5 h-5 fill-current stroke-[2.5] ${isLiveTrackingActive ? 'animate-pulse' : ''}`} />
          </button>
          <span
            className={`text-[10px] font-bold tracking-tight mt-1 ${
              activeTab === 'live' ? 'text-[#16A34A]' : 'text-zinc-500'
            }`}
          >
            Live
          </span>
        </div>

        {/* 4. History (📅) */}
        <button
          onClick={() => onTabChange('history')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'history' ? 'text-[#16A34A]' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'history' ? 'bg-[#EBF7EE]' : ''}`}>
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">History</span>
        </button>

        {/* 5. Settings (⚙️) */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'settings' ? 'text-[#16A34A]' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-[#EBF7EE]' : ''}`}>
            <Settings className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Settings</span>
        </button>
      </nav>
    </div>
  );
};

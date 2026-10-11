import React, { useState, useEffect } from 'react';
import { Wifi, Signal } from 'lucide-react';

interface MobileStatusBarProps {
  theme?: 'light' | 'dark';
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({ theme = 'dark' }) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const isLight = theme === 'light';

  return (
    <div className={`w-full pt-3 pb-2 px-6 flex items-center justify-between text-xs select-none ${
      isLight ? 'bg-white text-zinc-900 border-b border-[#F0F5F0]' : 'bg-transparent text-white'
    }`}>
      {/* Time */}
      <span className={`font-bold tracking-tight text-[13px] font-mono ${isLight ? 'text-zinc-900' : 'text-white'}`}>
        {time}
      </span>

      {/* Dynamic pill island accent */}
      <div className={`w-20 h-4 rounded-full flex items-center justify-center gap-1.5 px-2 ${
        isLight ? 'bg-zinc-100 border border-zinc-200' : 'bg-black/60 border border-white/[0.08]'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          isLight ? 'bg-[#16A34A]' : 'bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]'
        } animate-pulse`}></span>
        <span className={`text-[9px] font-mono font-black tracking-wider ${
          isLight ? 'text-[#16A34A]' : 'text-[#CCFF00]'
        }`}>LIVE</span>
      </div>

      {/* Connectivity Icons */}
      <div className={`flex items-center gap-2 ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className={`flex items-center gap-1 font-mono text-[11px] ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
          <span>98%</span>
          <div className={`w-5 h-2.5 rounded-xs border p-0.5 flex items-center ${isLight ? 'border-zinc-300' : 'border-zinc-500'}`}>
            <div className={`w-3.5 h-full rounded-2xs ${isLight ? 'bg-[#16A34A]' : 'bg-[#CCFF00]'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};


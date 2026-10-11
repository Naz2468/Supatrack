import React from 'react';
import { X, Bell, ShieldAlert, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationsSheet: React.FC<NotificationsSheetProps> = ({
  isOpen,
  onClose,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: '#7 Alvarez: Sub Advised',
      desc: '12% left asymmetry past 65\'.',
      time: '3m ago',
      type: 'urgent',
    },
    {
      id: 2,
      title: 'Squad Readiness',
      desc: '84% average nominal.',
      time: '24m ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Sensors Synced',
      desc: '11 RTK vests connected.',
      time: '76m ago',
      type: 'success',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-sm bg-[#1F291E] border border-white/[0.12] rounded-[32px] p-5 shadow-2xl relative mt-12 sm:mt-0 text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[#CCFF00]">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-black text-white uppercase font-mono tracking-tight">
              LIVE MATCH ALERTS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#131A12] flex items-center justify-center font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border text-xs ${
                n.type === 'urgent'
                  ? 'bg-[#243023] border-[#FF4D4D]/60 text-white'
                  : 'bg-[#243023] border-white/[0.06] text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-bold text-white text-[11px]">{n.title}</span>
                <span className="text-[10px] text-zinc-400 font-mono">{n.time}</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-snug">
                {n.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <button
            onClick={onClearAll}
            className="text-xs text-zinc-400 hover:text-white font-medium cursor-pointer"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-black rounded-full bg-[#CCFF00] text-[#131A12] shadow-sm hover:bg-[#B8F400] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

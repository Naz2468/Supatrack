/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-sm bg-white border border-[#DCF0DF] rounded-3xl p-5 shadow-2xl relative mt-12 sm:mt-0 text-[#132216] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0F6F1]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF7EE] flex items-center justify-center text-[#16A34A]">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-[#132216]">
              Match Alerts & Feed
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5FAF6] text-zinc-600 flex items-center justify-center font-bold hover:bg-[#EBF7EE] hover:text-[#16A34A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((item) => {
            const isUrgent = item.type === 'urgent';
            const isSuccess = item.type === 'success';

            return (
              <div 
                key={item.id} 
                className={`p-3.5 rounded-2xl border text-xs transition-colors ${
                  isUrgent 
                    ? 'bg-rose-50/70 border-rose-200' 
                    : isSuccess
                    ? 'bg-[#EBF7EE]/60 border-[#DCF0DF]'
                    : 'bg-[#F8FAF8] border-[#E5EFE6]'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className={`flex items-center gap-1.5 ${
                    isUrgent ? 'text-rose-700' : isSuccess ? 'text-[#16A34A]' : 'text-[#132216]'
                  }`}>
                    {isUrgent && <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                    {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />}
                    {item.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-[#F0F6F1] flex items-center justify-between">
          <button 
            onClick={onClearAll}
            className="text-xs text-zinc-400 hover:text-zinc-600 font-semibold cursor-pointer"
          >
            Clear all
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#16A34A] text-white text-xs font-bold hover:bg-[#15803D] transition-colors cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

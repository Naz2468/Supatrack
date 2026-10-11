/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Download, 
  Send, 
  CheckCircle2, 
  Radio, 
  Users,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SquadMemberHealth } from '../../data/mobileMockData';

interface CoachActionControlsProps {
  onExport: () => void;
  onBroadcastSub: () => void;
  onSendTacticalNote: (message: string) => void;
  suggestedSubPlayer?: SquadMemberHealth;
}

export const CoachActionControls: React.FC<CoachActionControlsProps> = ({
  onExport,
  onBroadcastSub,
  onSendTacticalNote,
  suggestedSubPlayer,
}) => {
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onSendTacticalNote(noteText.trim());
    setNoteText('');
    setIsNoteInputOpen(false);
  };

  return (
    <div className="w-full px-5 space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Direct Sideline Actions
        </span>
        <span className="text-[11px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2.5 py-0.5 rounded-full border border-[#DCF0DF]">
          Secure Telemetry Mesh
        </span>
      </div>

      {/* 2 Primary Direct Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* ACTION 1: SUB SUGGESTED */}
        <button
          onClick={onBroadcastSub}
          className="p-4 rounded-3xl bg-rose-50 border border-rose-200 hover:bg-rose-100/80 text-left transition-all cursor-pointer group shadow-xs active:scale-[0.98]"
        >
          <div className="flex items-center justify-between text-xs text-rose-700 font-bold mb-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Sub Advisory
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>

          <div className="text-sm font-black text-rose-950 leading-tight">
            {suggestedSubPlayer ? (
              <>#{suggestedSubPlayer.number} {suggestedSubPlayer.name}</>
            ) : (
              'Bench Standby'
            )}
          </div>
          <p className="text-[11px] text-rose-600 font-semibold mt-1">
            {suggestedSubPlayer
              ? `+${suggestedSubPlayer.imu.deviationPct}% Asymmetry past 65'`
              : 'All players within load tolerance'}
          </p>

          <div className="mt-3 pt-2.5 border-t border-rose-200/80 flex items-center justify-between text-[11px] font-bold text-rose-700">
            <span>Broadcast to Bench</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* ACTION 2: EXPORT REPORT */}
        <button
          onClick={onExport}
          className="p-4 rounded-3xl bg-[#EBF7EE] border border-[#DCF0DF] hover:bg-[#E2F4E6] text-left transition-all cursor-pointer group shadow-xs active:scale-[0.98]"
        >
          <div className="flex items-center justify-between text-xs text-[#16A34A] font-bold mb-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <Download className="w-4 h-4" />
              Match Export
            </span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#DCF0DF] text-[#16A34A] font-bold">
              CSV
            </span>
          </div>

          <div className="text-sm font-black text-[#132216] leading-tight">
            Squad Telemetry
          </div>
          <p className="text-[11px] text-zinc-500 font-medium mt-1">
            IMU gait, HR zones & sprint bursts
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#D5EBD8] flex items-center justify-between text-[11px] font-bold text-[#16A34A]">
            <span>Download MD24</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* QUICK DISPATCH BAR */}
      <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-[#E5EFE6]">
        {isNoteInputOpen ? (
          <form onSubmit={handleSend} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600">
                Staff Tactical Advisory
              </span>
              <button
                type="button"
                onClick={() => setIsNoteInputOpen(false)}
                className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type note to player feeds..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                autoFocus
                className="flex-1 px-3 py-2 text-xs bg-white border border-[#DCF0DF] rounded-xl text-[#132216] placeholder-zinc-400 focus:outline-none focus:border-[#16A34A]"
              />
              <button
                type="submit"
                disabled={!noteText.trim()}
                className="px-4 py-2 bg-[#16A34A] text-white rounded-xl text-xs font-bold disabled:opacity-40 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsNoteInputOpen(true)}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-600 hover:text-[#16A34A] transition-colors cursor-pointer py-0.5"
          >
            <span className="flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Dispatch quick tactical instruction to squad feeds</span>
            </span>
            <span className="text-[11px] text-[#16A34A] font-bold bg-[#EBF7EE] px-2 py-0.5 rounded-full border border-[#DCF0DF]">
              + Compose
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

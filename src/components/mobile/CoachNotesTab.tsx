/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CoachNote, COACH_NOTES } from '../../data/mobileMockData';
import { Send, User, Clock } from 'lucide-react';

export const CoachNotesTab: React.FC = () => {
  const [notes, setNotes] = useState<CoachNote[]>(COACH_NOTES);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newNote: CoachNote = {
      id: `c_${Date.now()}`,
      author: 'Head Coach',
      role: 'Staff',
      time: 'Just now',
      message: inputText.trim(),
      priority: 'normal',
      unread: false,
    };

    setNotes([newNote, ...notes]);
    setInputText('');
  };

  return (
    <div className="w-full px-5 space-y-3 pb-24">
      {/* Minimal Message Input */}
      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          placeholder="Send staff advisory note..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full pl-4 pr-11 py-3 text-xs bg-[#F5FAF6] border border-[#DEEEDE] rounded-2xl text-[#132216] placeholder-zinc-400 focus:outline-none focus:border-[#16A34A] focus:bg-white transition-all shadow-xs"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-[#16A34A] disabled:opacity-30 text-white font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4 stroke-[2.2]" />
        </button>
      </form>

      {/* Sleek Notes Feed */}
      <div className="space-y-2.5">
        {notes.map((note) => {
          const isUrgent = note.priority === 'urgent';

          return (
            <div
              key={note.id}
              className={`p-4 rounded-3xl border transition-all shadow-xs ${
                isUrgent
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-white border-[#DCF0DF]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isUrgent ? 'bg-amber-200 text-amber-900' : 'bg-[#EBF7EE] text-[#16A34A]'
                  }`}>
                    {note.author.slice(0, 1)}
                  </div>
                  <span className="text-xs font-black text-[#132216]">
                    {note.author}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                    isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-[#EBF7EE] text-[#16A34A]'
                  }`}>
                    {note.role}
                  </span>
                </div>

                <span className="text-[10px] text-zinc-400 font-medium">
                  {note.time}
                </span>
              </div>

              <p className="text-xs text-zinc-700 pl-8 leading-relaxed">
                {note.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

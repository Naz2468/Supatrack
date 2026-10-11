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
    <div className="w-full px-4 space-y-3 pb-24">
      {/* Minimal Message Input */}
      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          placeholder="Send staff advisory note..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-[#1F291E] border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00] transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#CCFF00] disabled:opacity-30 text-[#131A12] font-black flex items-center justify-center transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 stroke-[2.4]" />
        </button>
      </form>

      {/* Sleek Notes Feed */}
      <div className="space-y-2">
        {notes.map((note) => {
          const isUrgent = note.priority === 'urgent';

          return (
            <div
              key={note.id}
              className={`p-3 rounded-2xl border transition-all shadow-sm ${
                isUrgent
                  ? 'bg-[#241F1A] border-amber-500/40'
                  : 'bg-[#1F291E] border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.06] text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                    isUrgent ? 'bg-amber-400 text-[#131A12]' : 'bg-white text-[#131A12]'
                  }`}>
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-white text-xs">{note.author}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">({note.role})</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  {isUrgent && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">
                      FLAG
                    </span>
                  )}
                  <span>{note.time}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                {note.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

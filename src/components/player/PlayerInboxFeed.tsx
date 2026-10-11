/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Inbox, 
  Play, 
  Pause, 
  CheckCircle2, 
  MessageSquare, 
  Film, 
  Clock, 
  Send, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { COACH_NOTES, TACTICAL_CLIPS, TacticalClip, CoachNote } from '../../data/mobileMockData';

interface PlayerInboxFeedProps {
  onAcknowledge: (message: string) => void;
}

export const PlayerInboxFeed: React.FC<PlayerInboxFeedProps> = ({
  onAcknowledge,
}) => {
  const [activeTab, setActiveTab] = useState<'clips' | 'notes'>('clips');
  const [activePlayingClipId, setActivePlayingClipId] = useState<string | null>(null);
  const [clips, setClips] = useState<TacticalClip[]>(TACTICAL_CLIPS);
  const [notes, setNotes] = useState<CoachNote[]>(COACH_NOTES);
  const [acknowledgedClipIds, setAcknowledgedClipIds] = useState<string[]>([]);

  const handleTogglePlay = (clipId: string) => {
    if (activePlayingClipId === clipId) {
      setActivePlayingClipId(null);
    } else {
      setActivePlayingClipId(clipId);
    }
  };

  const handleAcknowledgeClip = (clip: TacticalClip) => {
    if (!acknowledgedClipIds.includes(clip.id)) {
      setAcknowledgedClipIds((prev) => [...prev, clip.id]);
      onAcknowledge(`Feedback acknowledged to ${clip.sender}: "${clip.title}"`);
    }
  };

  return (
    <div className="w-full px-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Personal Inbox · Coach Feed
          </h2>
        </div>

        {/* Sub-Tabs: Tactical Clips vs Coach Notes */}
        <div className="p-1 bg-[#F5FAF6] rounded-full border border-[#DEEEDE] flex items-center text-xs">
          <button
            onClick={() => setActiveTab('clips')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'clips'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Clips ({clips.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Notes ({notes.length})</span>
          </button>
        </div>
      </div>

      {/* CLIPS TAB */}
      {activeTab === 'clips' && (
        <div className="space-y-3">
          {clips.map((clip) => {
            const isPlaying = activePlayingClipId === clip.id;
            const isAcknowledged = acknowledgedClipIds.includes(clip.id);

            return (
              <div
                key={clip.id}
                className="p-4 rounded-3xl bg-white border border-[#DCF0DF] shadow-xs space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                      <span>{clip.sender}</span>
                      <span>·</span>
                      <span className="text-[#16A34A] font-bold">{clip.minute}</span>
                    </div>
                    <h3 className="text-sm font-black text-[#132216] mt-0.5">
                      {clip.title}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7EE] text-[#16A34A] border border-[#DCF0DF]">
                    {clip.duration}
                  </span>
                </div>

                {/* Video Clip Simulator Window */}
                <div className="relative aspect-video rounded-2xl bg-zinc-900 overflow-hidden flex items-center justify-center border border-zinc-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Play / Pause Button */}
                  <button
                    onClick={() => handleTogglePlay(clip.id)}
                    className="w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer z-10"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium z-10">
                    <span className="bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {isPlaying ? 'Playing clip...' : 'Tap to review play'}
                    </span>
                    <span className="bg-[#16A34A] px-2 py-0.5 rounded-full font-bold">
                      Tag: High Press
                    </span>
                  </div>
                </div>

                {/* Coach Note */}
                <p className="text-xs text-zinc-600 bg-[#F8FAF8] p-3 rounded-2xl border border-[#E5EFE6]">
                  "{clip.summary}"
                </p>

                {/* Acknowledge Button */}
                <button
                  onClick={() => handleAcknowledgeClip(clip)}
                  className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    isAcknowledged
                      ? 'bg-[#EBF7EE] text-[#16A34A] border border-[#DCF0DF]'
                      : 'bg-[#16A34A] hover:bg-[#15803D] text-white'
                  }`}
                >
                  {isAcknowledged ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Acknowledged to Staff</span>
                    </>
                  ) : (
                    <span>Acknowledge Clip Review</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* NOTES TAB */}
      {activeTab === 'notes' && (
        <div className="space-y-2.5">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-3xl bg-white border transition-all shadow-xs ${
                note.priority === 'urgent'
                  ? 'border-amber-300 bg-amber-50/40'
                  : 'border-[#DCF0DF]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#132216]">
                  {note.author} ({note.role})
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">
                  {note.time}
                </span>
              </div>
              <p className="text-xs text-zinc-700 mt-1 leading-relaxed">
                {note.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

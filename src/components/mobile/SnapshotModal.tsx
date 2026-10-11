import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { 
  X, 
  Camera, 
  Download, 
  Check, 
  Loader2, 
  Sparkles, 
  Layers, 
  Activity, 
  Users, 
  BarChart3, 
  MessageSquare,
  Eye,
  FileImage,
  AlertCircle
} from 'lucide-react';
import { SquadMemberHealth, SQUAD_MEMBERS } from '../../data/mobileMockData';
import { StatsGrid2x2 } from './StatsGrid2x2';
import { MatchOutputChartCard } from './MatchOutputChartCard';
import { SquadTab } from './SquadTab';
import { ReportsTab } from './ReportsTab';
import { CoachNotesTab } from './CoachNotesTab';
import { MobileStatusBar } from './MobileStatusBar';
import { RoleMode } from './MobileHeader';
import { useTheme } from '../../context/ThemeContext';

interface SnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePlayer: SquadMemberHealth;
  roleMode: RoleMode;
  onNotify: (msg: string) => void;
}

type SnapshotTarget = 'home' | 'squad' | 'reports' | 'chat';

export const SnapshotModal: React.FC<SnapshotModalProps> = ({
  isOpen,
  onClose,
  activePlayer,
  roleMode,
  onNotify,
}) => {
  const { isDark } = useTheme();
  const [downloadingTarget, setDownloadingTarget] = useState<string | null>(null);
  const [downloadedTargets, setDownloadedTargets] = useState<string[]>([]);
  const [activePreviewTab, setActivePreviewTab] = useState<SnapshotTarget>('home');

  const homeRef = useRef<HTMLDivElement>(null);
  const squadRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const livePreviewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const getTargetRef = (target: SnapshotTarget) => {
    switch (target) {
      case 'home': return homeRef.current;
      case 'squad': return squadRef.current;
      case 'reports': return reportsRef.current;
      case 'chat': return chatRef.current;
    }
  };

  const captureAndDownload = async (target: SnapshotTarget): Promise<boolean> => {
    const element = getTargetRef(target);
    if (!element) {
      onNotify(`Could not locate ${target} container`);
      return false;
    }

    setDownloadingTarget(target);
    try {
      // html-to-image toPng natively supports all modern CSS color formats (oklab, oklch, hex, rgb)
      const dataUrl = await toPng(element, {
        pixelRatio: 2, // High resolution retina 2x capture
        backgroundColor: '#131A12',
        cacheBust: true,
        skipFonts: true, // Prevents external stylesheet font parsing errors with oklab in Tailwind v4
      });

      const link = document.createElement('a');
      link.download = `supatrack-${target}-snapshot.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedTargets(prev => [...new Set([...prev, target])]);
      onNotify(`Downloaded ${target.toUpperCase()} snapshot (PNG)`);
      return true;
    } catch (err: any) {
      console.warn('html-to-image primary capture warning:', err);

      // Fallback: If offscreen container had layout calculation issue, capture visible livePreviewRef
      if (livePreviewRef.current && activePreviewTab === target) {
        try {
          const fallbackUrl = await toPng(livePreviewRef.current, {
            pixelRatio: 2,
            backgroundColor: '#131A12',
            skipFonts: true,
          });
          const link = document.createElement('a');
          link.download = `supatrack-${target}-snapshot.png`;
          link.href = fallbackUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadedTargets(prev => [...new Set([...prev, target])]);
          onNotify(`Downloaded ${target.toUpperCase()} snapshot (PNG)`);
          return true;
        } catch (fallbackErr) {
          console.error('Fallback capture error:', fallbackErr);
        }
      }

      onNotify(`Could not generate ${target} snapshot: ${err?.message || 'render error'}`);
      return false;
    } finally {
      setDownloadingTarget(null);
    }
  };

  const downloadAllSnapshots = async () => {
    setDownloadingTarget('all');
    onNotify('Capturing snapshots for all 4 views...');
    const targets: SnapshotTarget[] = ['home', 'squad', 'reports', 'chat'];
    for (const t of targets) {
      setActivePreviewTab(t);
      await captureAndDownload(t);
      // Stagger downloads so the browser handles multiple file triggers smoothly
      await new Promise(r => setTimeout(r, 600));
    }
    setDownloadingTarget(null);
    onNotify('All 4 view snapshots downloaded successfully!');
  };

  const targetsList = [
    {
      id: 'home' as SnapshotTarget,
      title: 'Home UI Snapshot',
      subtitle: 'Supa Rating, IMU Asymmetry, Workload & 90m Output Chart',
      icon: Activity,
      color: 'text-[#CCFF00]',
    },
    {
      id: 'squad' as SnapshotTarget,
      title: 'Squad/Players Snapshot',
      subtitle: 'Complete 11-man squad roster, ratings, and sub alerts',
      icon: Users,
      color: 'text-cyan-400',
    },
    {
      id: 'reports' as SnapshotTarget,
      title: 'Telemetry Report Snapshot',
      subtitle: 'Matchday physiological audit, HR zones & ACWR risk',
      icon: BarChart3,
      color: 'text-[#CCFF00]',
    },
    {
      id: 'chat' as SnapshotTarget,
      title: 'Chat/Coach Notes Snapshot',
      subtitle: 'Sports science advisories & staff tactical discussion',
      icon: MessageSquare,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#161F15] border border-white/[0.12] rounded-[32px] p-5 sm:p-6 shadow-2xl relative max-h-[92vh] flex flex-col text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00] shadow-[0_0_12px_rgba(204,255,0,0.2)]">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>UI Snapshot Exporter</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 font-bold">
                  PNG 2x Retina
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Export mobile view PNGs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-[#131A12] flex items-center justify-center font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Action Header: Download All Button */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-zinc-300 font-medium">
            Select view or bundle all:
          </span>

          <button
            onClick={downloadAllSnapshots}
            disabled={downloadingTarget !== null}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#CCFF00] hover:bg-[#B8F400] text-[#131A12] font-black text-xs shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {downloadingTarget === 'all' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Capturing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download All 4</span>
              </>
            )}
          </button>
        </div>

        {/* 4 Download Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {targetsList.map((target) => {
            const Icon = target.icon;
            const isDownloading = downloadingTarget === target.id;
            const isDownloaded = downloadedTargets.includes(target.id);

            return (
              <div
                key={target.id}
                className={`p-3.5 rounded-[24px] border transition-all flex flex-col justify-between ${
                  activePreviewTab === target.id
                    ? 'bg-[#243023] border-[#CCFF00]/60 shadow-lg'
                    : 'bg-[#1F291E] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-xl bg-white/[0.08] ${target.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">{target.title}</span>
                    </div>

                    <button
                      onClick={() => setActivePreviewTab(target.id)}
                      className={`text-[11px] font-mono flex items-center gap-1 cursor-pointer ${
                        activePreviewTab === target.id ? 'text-[#CCFF00] font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-snug mb-3">
                    {target.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Format: 860×1720 PNG
                  </span>

                  <button
                    onClick={() => captureAndDownload(target.id)}
                    disabled={isDownloading || downloadingTarget !== null}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                      isDownloaded
                        ? 'bg-white/[0.1] text-[#CCFF00] border border-[#CCFF00]/30'
                        : 'bg-[#CCFF00] hover:bg-[#B8F400] text-[#131A12] shadow-sm active:scale-95'
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Capturing...</span>
                      </>
                    ) : isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Download PNG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Canvas Preview Panel */}
        <div className="border-t border-white/[0.08] pt-3 flex-1 flex flex-col min-h-[220px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <span>Selected Preview:</span>
              <span className="text-[#CCFF00] uppercase font-mono font-black">
                {activePreviewTab}
              </span>
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Capturing at 2x resolution
            </span>
          </div>

          <div 
            ref={livePreviewRef}
            className="flex-1 bg-[#131A12] rounded-2xl border border-white/[0.08] p-3 overflow-y-auto max-h-[260px] no-scrollbar"
          >
            {activePreviewTab === 'home' && (
              <div className="space-y-3">
                <StatsGrid2x2 player={activePlayer} roleMode={roleMode} />
                <MatchOutputChartCard />
              </div>
            )}
            {activePreviewTab === 'squad' && (
              <SquadTab onSelectPlayer={() => {}} />
            )}
            {activePreviewTab === 'reports' && (
              <ReportsTab onExport={() => {}} />
            )}
            {activePreviewTab === 'chat' && (
              <CoachNotesTab />
            )}
          </div>
        </div>

        {/* Offscreen Fixed Render Containers for html-to-image Capture */}
        <div 
          style={{ 
            position: 'fixed', 
            left: '-6000px', 
            top: '0px', 
            width: '420px', 
            zIndex: -100, 
            pointerEvents: 'none',
            visibility: 'visible'
          }}
        >
          
          {/* 1. HOME UI SNAPSHOT NODE */}
          <div 
            ref={homeRef}
            className="w-[410px] bg-[#131A12] text-white p-4 pb-8 space-y-4 font-sans rounded-[32px] border border-white/[0.1]"
          >
            <MobileStatusBar />
            <div className="p-4 rounded-[24px] bg-[#1F291E] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#CCFF00] font-bold">SupaTrack // Home UI</span>
                <h2 className="text-base font-bold mt-0.5">{activePlayer.name} (Passport)</h2>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/40 font-bold">
                Score: 1-0 Live 76'
              </span>
            </div>
            <StatsGrid2x2 player={activePlayer} roleMode={roleMode} />
            <MatchOutputChartCard />
          </div>

          {/* 2. SQUAD/PLAYERS SNAPSHOT NODE */}
          <div 
            ref={squadRef}
            className="w-[410px] bg-[#131A12] text-white p-4 pb-8 space-y-4 font-sans rounded-[32px] border border-white/[0.1]"
          >
            <MobileStatusBar />
            <div className="p-4 rounded-[24px] bg-[#1F291E] border border-white/[0.08]">
              <span className="text-[11px] font-mono text-[#CCFF00] font-bold">SupaTrack // Squad Roster</span>
              <h2 className="text-base font-bold mt-0.5">Matchday Squad (11 Active)</h2>
            </div>
            <SquadTab onSelectPlayer={() => {}} />
          </div>

          {/* 3. TELEMETRY REPORT SNAPSHOT NODE */}
          <div 
            ref={reportsRef}
            className="w-[410px] bg-[#131A12] text-white p-4 pb-8 space-y-4 font-sans rounded-[32px] border border-white/[0.1]"
          >
            <MobileStatusBar />
            <div className="p-4 rounded-[24px] bg-[#1F291E] border border-white/[0.08]">
              <span className="text-[11px] font-mono text-[#CCFF00] font-bold">SupaTrack // Telemetry Reports</span>
              <h2 className="text-base font-bold mt-0.5">Matchday Physiological Audit</h2>
            </div>
            <ReportsTab onExport={() => {}} />
          </div>

          {/* 4. CHAT/COACH NOTES SNAPSHOT NODE */}
          <div 
            ref={chatRef}
            className="w-[410px] bg-[#131A12] text-white p-4 pb-8 space-y-4 font-sans rounded-[32px] border border-white/[0.1]"
          >
            <MobileStatusBar />
            <div className="p-4 rounded-[24px] bg-[#1F291E] border border-white/[0.08]">
              <span className="text-[11px] font-mono text-[#CCFF00] font-bold">SupaTrack // Coach Notes</span>
              <h2 className="text-base font-bold mt-0.5">Sports Science Staff Communications</h2>
            </div>
            <CoachNotesTab />
          </div>

        </div>

      </div>
    </div>
  );
};

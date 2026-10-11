/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MobileStatusBar } from './components/mobile/MobileStatusBar';
import { MobileHeader, RoleMode } from './components/mobile/MobileHeader';
import { StatsGrid2x2 } from './components/mobile/StatsGrid2x2';
import { MatchOutputChartCard } from './components/mobile/MatchOutputChartCard';
import { BottomTabBar, TabType } from './components/mobile/BottomTabBar';
import { SquadTab } from './components/mobile/SquadTab';
import { ReportsTab } from './components/mobile/ReportsTab';
import { CoachNotesTab } from './components/mobile/CoachNotesTab';
import { PlayerHealthSheet } from './components/mobile/PlayerHealthSheet';
import { MetricDrillDownModal, DrillDownMetricType } from './components/mobile/MetricDrillDownModal';
import { NotificationsSheet } from './components/mobile/NotificationsSheet';
import { SnapshotModal } from './components/mobile/SnapshotModal';
import { SQUAD_MEMBERS, SquadMemberHealth } from './data/mobileMockData';
import { useTheme } from './context/ThemeContext';
import { 
  Smartphone, 
  Maximize2, 
  Radio, 
  CheckCircle2, 
  Download, 
  Sparkles,
  Flame,
  ShieldAlert,
  Compass, 
  Zap, 
  UserCheck,
  Camera,
  Sun,
  Moon,
  Heart,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [roleMode, setRoleMode] = useState<RoleMode>('coach');
  const [activePlayer, setActivePlayer] = useState<SquadMemberHealth>(SQUAD_MEMBERS[0]); // Mateo Alvarez #7
  const [inspectedPlayer, setInspectedPlayer] = useState<SquadMemberHealth | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [flaggedPlayerIds, setFlaggedPlayerIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState(true);
  const [activeDrillDownMetric, setActiveDrillDownMetric] = useState<DrillDownMetricType | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleFlagSub = (player: SquadMemberHealth) => {
    if (!flaggedPlayerIds.includes(player.id)) {
      setFlaggedPlayerIds((prev) => [...prev, player.id]);
      triggerToast(`Alert flagged to bench: Sub advisory for #${player.number} ${player.name}`);
    }
  };

  const handleExportTelemetry = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Player,Number,Position,SupaRating,IMUAsymmetryPct,FootednessBaseline,HR,Recovery,Strain,AvgSprintKmh,Status\n" +
      SQUAD_MEMBERS.map(p => `"${p.name}",${p.number},${p.position},${p.supaRating.overallScore},${p.imu.deviationPct}%,${p.imu.baselineFootedness},${p.heartRate},${p.recoveryScore}%,${p.strainScore},${p.sprintAvgKmh},${p.fatigueStatus}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "supatrack-matchday3-telemetry.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Telemetry & IMU report downloaded (CSV)");
  };

  const handleCardClick = (cardType: string) => {
    if (cardType === 'supaRating') {
      setInspectedPlayer(activePlayer);
    } else if (cardType === 'imu') {
      setInspectedPlayer(activePlayer);
    } else if (cardType === 'workload' || cardType === 'sprints') {
      setActiveDrillDownMetric('sprints');
    } else if (cardType === 'distance') {
      setActiveDrillDownMetric('distance');
    } else if (cardType === 'readiness' || cardType === 'recovery') {
      setActiveDrillDownMetric('recovery');
    } else if (cardType === 'heartRate') {
      setActiveDrillDownMetric('heartRate');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C120C] text-white flex flex-col items-center justify-start antialiased selection:bg-[#CCFF00]/30 selection:text-[#CCFF00] py-0 sm:py-6 transition-colors duration-200">
      
      {/* Desktop Device Viewport Frame Switcher */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md px-4 mb-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00] animate-pulse"></div>
          <span className="font-bold text-white font-sans uppercase tracking-tight">SupaTrack Mobile</span>
          <span className="text-zinc-600">·</span>
          <span className="text-[11px] font-mono text-[#CCFF00]">
            {roleMode === 'coach' ? 'Coach Command' : 'Player Passport'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSnapshotModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#131A12] hover:bg-zinc-100 transition-all text-[11px] font-bold active:scale-95 shadow-md cursor-pointer"
            title="Download UI Snapshots (Home, Squad, Telemetry, Coach Notes)"
          >
            <Camera className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Snapshots</span>
          </button>

          <button
            onClick={() => setIsPhoneFrameMode(!isPhoneFrameMode)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1F291E] border border-white/[0.1] hover:border-[#CCFF00]/40 text-zinc-300 transition-colors cursor-pointer"
          >
            {isPhoneFrameMode ? (
              <>
                <Maximize2 className="w-3 h-3 text-zinc-400" />
                <span className="text-[11px] font-mono">Expand</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3 text-[#CCFF00]" />
                <span className="text-[11px] font-mono">Phone</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Mobile App Container (390px - 440px or full on mobile) */}
      <div 
        className={`w-full transition-all duration-300 relative flex flex-col bg-[#131A12] text-white overflow-hidden ${
          isPhoneFrameMode
            ? 'sm:max-w-[430px] sm:rounded-[44px] sm:border-[6px] sm:border-[#1F291E] sm:shadow-[0_0_60px_rgba(0,0,0,0.85)] sm:ring-1 sm:ring-white/[0.1] min-h-screen sm:min-h-[860px]'
            : 'max-w-xl rounded-none sm:rounded-3xl border-0 sm:border border-white/[0.08] shadow-2xl min-h-screen'
        }`}
      >
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-b from-[#CCFF00]/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>

        {/* 1. Mobile Status Bar */}
        <MobileStatusBar />

        {/* 2. Mobile Header & Role Toggle */}
        <MobileHeader
          onBack={() => {
            if (activeTab !== 'home') {
              setActiveTab('home');
            } else {
              triggerToast('SupaTrack Dashboard Home');
            }
          }}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSnapshots={() => setIsSnapshotModalOpen(true)}
          unreadCount={unreadNotifications}
          roleMode={roleMode}
          onToggleRole={(mode) => {
            setRoleMode(mode);
            triggerToast(mode === 'coach' ? 'Switched to Coach Command Center' : 'Switched to Player Passport View');
          }}
          selectedPlayer={activePlayer}
          onSelectPlayer={(p) => setActivePlayer(p)}
          onInspectPlayer={(p) => setInspectedPlayer(p)}
        />

        {/* Main Tab View Canvas */}
        <div className="flex-1 overflow-y-auto pt-3 pb-4 space-y-4">
          
          {activeTab === 'home' && (
            <>
              {/* Player Carousel Strip in Player Passport Mode */}
              {roleMode === 'player' && (
                <div className="px-4 space-y-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {SQUAD_MEMBERS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePlayer(p)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                          activePlayer.id === p.id
                            ? 'bg-[#CCFF00] text-[#131A12] shadow-[0_0_12px_rgba(204,255,0,0.4)]'
                            : 'bg-[#1F291E] text-zinc-300 border border-white/[0.08] hover:text-white'
                        }`}
                      >
                        <span className="font-black">#{p.number}</span>
                        <span className="font-sans font-medium">{p.name.split(' ')[1] || p.name}</span>
                        <span className="text-[10px] opacity-80">({p.supaRating.overallScore})</span>
                      </button>
                    ))}
                  </div>

                  {/* 4 Interactive Player Passport Metric Tiles */}
                  <div className="p-3 rounded-2xl bg-[#1F291E] border border-white/[0.08] shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                        <span className="text-xs font-mono font-black uppercase text-white tracking-wider">
                          Passport Telemetry
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#CCFF00] font-bold flex items-center gap-0.5">
                        <span>Tap tile for drill-down</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Heart Rate */}
                      <button
                        onClick={() => setActiveDrillDownMetric('heartRate')}
                        className="p-2.5 rounded-xl bg-[#243023] border border-white/[0.06] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] transition-all text-left group cursor-pointer active:scale-[0.98]"
                        title="Click to view Heart Rate Intensity drill-down chart"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span className="group-hover:text-white transition-colors">HEART RATE</span>
                          <Heart className="w-3 h-3 text-[#FF4D4D]" />
                        </div>
                        <div className="text-lg font-mono font-black text-white mt-0.5 group-hover:text-[#CCFF00] transition-colors tabular-nums">
                          {activePlayer.heartRate} <span className="text-[10px] text-zinc-400 font-normal">bpm</span>
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 mt-0.5 flex items-center justify-between">
                          <span>Peak 184</span>
                          <span className="text-[#CCFF00] flex items-center gap-0.5 font-bold">Chart <ArrowUpRight className="w-2 h-2" /></span>
                        </div>
                      </button>

                      {/* Recovery */}
                      <button
                        onClick={() => setActiveDrillDownMetric('recovery')}
                        className="p-2.5 rounded-xl bg-[#243023] border border-white/[0.06] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] transition-all text-left group cursor-pointer active:scale-[0.98]"
                        title="Click to view Physical Readiness & Fatigue Decay drill-down chart"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span className="group-hover:text-white transition-colors">RECOVERY</span>
                          <Sparkles className="w-3 h-3 text-[#CCFF00]" />
                        </div>
                        <div className="text-lg font-mono font-black text-[#CCFF00] mt-0.5 tabular-nums">
                          {activePlayer.recoveryScore}%
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 mt-0.5 flex items-center justify-between">
                          <span>Readiness</span>
                          <span className="text-[#CCFF00] flex items-center gap-0.5 font-bold">Decay <ArrowUpRight className="w-2 h-2" /></span>
                        </div>
                      </button>

                      {/* Sprints */}
                      <button
                        onClick={() => setActiveDrillDownMetric('sprints')}
                        className="p-2.5 rounded-xl bg-[#243023] border border-white/[0.06] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] transition-all text-left group cursor-pointer active:scale-[0.98]"
                        title="Click to view Sprint Frequency & Velocity Profile drill-down chart"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span className="group-hover:text-white transition-colors">SPRINTS</span>
                          <Zap className="w-3 h-3 text-cyan-400" />
                        </div>
                        <div className="text-lg font-mono font-black text-white mt-0.5 group-hover:text-cyan-400 transition-colors tabular-nums">
                          {activePlayer.sprintCount} <span className="text-[10px] text-cyan-400 font-normal">runs</span>
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 mt-0.5 flex items-center justify-between">
                          <span>Top 34.8 km/h</span>
                          <span className="text-[#CCFF00] flex items-center gap-0.5 font-bold">Profile <ArrowUpRight className="w-2 h-2" /></span>
                        </div>
                      </button>

                      {/* Distance */}
                      <button
                        onClick={() => setActiveDrillDownMetric('distance')}
                        className="p-2.5 rounded-xl bg-[#243023] border border-white/[0.06] hover:border-[#CCFF00]/50 hover:bg-[#2A3829] transition-all text-left group cursor-pointer active:scale-[0.98]"
                        title="Click to view Cumulative Distance & Pace Distribution drill-down chart"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span className="group-hover:text-white transition-colors">DISTANCE</span>
                          <Activity className="w-3 h-3 text-[#CCFF00]" />
                        </div>
                        <div className="text-lg font-mono font-black text-white mt-0.5 group-hover:text-[#CCFF00] transition-colors tabular-nums">
                          {activePlayer.distanceCoveredKm} <span className="text-[10px] text-zinc-400 font-normal">km</span>
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 mt-0.5 flex items-center justify-between">
                          <span>HID 2.41 km</span>
                          <span className="text-[#CCFF00] flex items-center gap-0.5 font-bold">Pace <ArrowUpRight className="w-2 h-2" /></span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Core Integrated Features & Statistics Grid (2x2 Card Layout) */}
              <StatsGrid2x2
                player={activePlayer}
                roleMode={roleMode}
                onCardClick={handleCardClick}
              />

              {/* 3. Match Activity Line Chart Section */}
              <MatchOutputChartCard />
            </>
          )}

          {activeTab === 'squad' && (
            <SquadTab onSelectPlayer={(player) => {
              setActivePlayer(player);
              setInspectedPlayer(player);
            }} />
          )}

          {activeTab === 'reports' && (
            <ReportsTab onExport={handleExportTelemetry} />
          )}

          {activeTab === 'chat' && (
            <CoachNotesTab />
          )}

        </div>

        {/* 4. Bottom Mobile Navigation Bar */}
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
          }}
          unreadNotesCount={1}
        />

        {/* Dynamic Island Home Indicator Bar */}
        <div className="w-full pb-1 pt-0 flex justify-center bg-[#F8FAFC] dark:bg-[#121212] select-none pointer-events-none transition-colors">
          <div className="w-32 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mb-1"></div>
        </div>

      </div>

      {/* Slide-Up Player Health Detail Sheet */}
      <PlayerHealthSheet
        player={inspectedPlayer}
        onClose={() => setInspectedPlayer(null)}
        onFlagSub={handleFlagSub}
        isFlagged={inspectedPlayer ? flaggedPlayerIds.includes(inspectedPlayer.id) : false}
      />

      {/* Interactive Metric Drill-Down Modal (Heart Rate, Sprints, Distance, Recovery) */}
      {activeDrillDownMetric && (
        <MetricDrillDownModal
          isOpen={true}
          metricType={activeDrillDownMetric}
          player={activePlayer}
          onClose={() => setActiveDrillDownMetric(null)}
          onSwitchMetric={(metric) => setActiveDrillDownMetric(metric)}
        />
      )}

      {/* Notification Alerts Sheet */}
      <NotificationsSheet
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClearAll={() => {
          setUnreadNotifications(0);
          triggerToast('All notifications marked as read');
        }}
      />

      {/* High-Resolution UI Snapshot Exporter Modal */}
      <SnapshotModal
        isOpen={isSnapshotModalOpen}
        onClose={() => setIsSnapshotModalOpen(false)}
        activePlayer={activePlayer}
        roleMode={roleMode}
        onNotify={triggerToast}
      />

      {/* Toast Confirmation Pill */}
      {toastMessage && (
        <div className="fixed bottom-20 z-50 bg-white dark:bg-[#1e1e1e] border border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00FF88] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MobileStatusBar } from './components/mobile/MobileStatusBar';
import { ConsumerApp } from './components/consumer/ConsumerApp';
import { CoachDashboard } from './components/coach/CoachDashboard';
import { PlayerDashboard } from './components/player/PlayerDashboard';
import { SnapshotModal } from './components/mobile/SnapshotModal';
import { BottomTabBar, TabType, TabConfig } from './components/mobile/BottomTabBar';
import { SQUAD_MEMBERS, SquadMemberHealth } from './data/mobileMockData';
import { 
  Smartphone, 
  Maximize2, 
  Camera, 
  CheckCircle2, 
  Users, 
  User, 
  Activity,
  Radar,
  Trophy,
  Heart,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export type DashboardMode = 'consumer' | 'coach' | 'player';

export default function App() {
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>('consumer');
  const [coachTab, setCoachTab] = useState<TabType>('home');
  const [playerTab, setPlayerTab] = useState<TabType>('home');
  const [activePlayer, setActivePlayer] = useState<SquadMemberHealth>(SQUAD_MEMBERS[0]); // Mateo Alvarez #7
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState(true);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const coachTabs: TabConfig[] = [
    {
      id: 'home',
      label: 'Command',
      icon: Activity,
    },
    {
      id: 'squad',
      label: 'Radar',
      icon: Radar,
    },
    {
      id: 'reports',
      label: 'Ranks',
      icon: Trophy,
    },
    {
      id: 'chat',
      label: 'Dispatch',
      icon: MessageSquare,
      badge: 1,
    },
  ];

  const playerTabs: TabConfig[] = [
    {
      id: 'home',
      label: 'Passport',
      icon: Activity,
    },
    {
      id: 'squad',
      label: 'Badges',
      icon: Trophy,
    },
    {
      id: 'reports',
      label: 'Biometrics',
      icon: Heart,
    },
    {
      id: 'chat',
      label: 'Inbox',
      icon: MessageSquare,
      badge: 2,
    },
  ];

  const currentTab = dashboardMode === 'coach' ? coachTab : playerTab;
  const setCurrentTab = dashboardMode === 'coach' ? setCoachTab : setPlayerTab;
  const currentTabs = dashboardMode === 'coach' ? coachTabs : playerTabs;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start antialiased py-0 sm:py-6 transition-colors duration-200 bg-[#F2F6F3] text-zinc-900 selection:bg-[#16A34A]/20 selection:text-[#16A34A]">
      
      {/* 
        EXTERNAL ENVIRONMENT TEST BAR (Top System Chrome)
        Allows switching between the Public Consumer Fitness App, Coach Command, and Player Passport.
      */}
      <div className="w-full max-w-md px-3 sm:px-4 mb-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        
        {/* Standalone Dashboard Route Selector */}
        <div className="flex items-center gap-1 p-1 rounded-2xl border border-zinc-200/80 bg-white shadow-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => {
              setDashboardMode('consumer');
              triggerToast('Loaded Public Consumer Fitness App');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              dashboardMode === 'consumer'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONSUMER</span>
          </button>

          <button
            onClick={() => {
              setDashboardMode('coach');
              triggerToast('Loaded Standalone Coach Command Dashboard');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              dashboardMode === 'coach'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>COACH</span>
          </button>

          <button
            onClick={() => {
              setDashboardMode('player');
              triggerToast('Loaded Standalone Player Passport Dashboard');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              dashboardMode === 'player'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>PLAYER</span>
          </button>
        </div>

        {/* Viewport & Snapshot Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => setIsSnapshotModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 transition-all text-[11px] font-bold active:scale-95 shadow-xs cursor-pointer"
            title="Download UI Snapshots"
          >
            <Camera className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Snapshots</span>
          </button>

          <button
            onClick={() => setIsPhoneFrameMode(!isPhoneFrameMode)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 transition-colors cursor-pointer"
          >
            {isPhoneFrameMode ? (
              <>
                <Maximize2 className="w-3 h-3" />
                <span className="text-[11px] font-medium">Expand</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3 text-[#16A34A]" />
                <span className="text-[11px] font-medium">Phone</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Mobile App Viewport Container */}
      <div 
        className={`w-full transition-all duration-300 relative flex flex-col overflow-hidden bg-white text-zinc-900 ${
          isPhoneFrameMode
            ? 'sm:max-w-[430px] sm:rounded-[44px] sm:border-[8px] sm:border-[#E2ECE3] sm:shadow-[0_20px_60px_rgba(20,50,25,0.08)] min-h-screen sm:min-h-[860px]'
            : 'max-w-xl rounded-none sm:rounded-3xl border-0 sm:border border-zinc-200 shadow-xl min-h-screen'
        }`}
      >
        {/* 1. Mobile Status Bar (9:41, 5G, Battery) in Clean Light Mode */}
        <MobileStatusBar theme="light" />

        {/* 2. Standalone Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto relative bg-white">
          {dashboardMode === 'consumer' ? (
            <ConsumerApp onNotify={triggerToast} />
          ) : dashboardMode === 'coach' ? (
            <CoachDashboard
              activeTab={coachTab}
              onTabChange={setCoachTab}
              hideBottomNav={true}
              onNotify={triggerToast}
              onOpenSnapshots={() => setIsSnapshotModalOpen(true)}
            />
          ) : (
            <PlayerDashboard
              activeTab={playerTab}
              onTabChange={setPlayerTab}
              hideBottomNav={true}
              onNotify={triggerToast}
              onOpenSnapshots={() => setIsSnapshotModalOpen(true)}
              initialPlayer={activePlayer}
            />
          )}
        </main>

        {/* 3. Floating Bottom Navigation Bar for Coach & Player */}
        {dashboardMode !== 'consumer' && (
          <BottomTabBar
            activeTab={currentTab}
            onTabChange={setCurrentTab}
            unreadNotesCount={dashboardMode === 'coach' ? 1 : 2}
            customTabs={currentTabs}
          />
        )}

        {/* Dynamic Island Home Indicator Bar */}
        <div className="w-full pb-1 pt-0 flex justify-center bg-transparent select-none pointer-events-none z-50">
          <div className="w-32 h-1 rounded-full mb-1 bg-zinc-300"></div>
        </div>
      </div>

      {/* High-Resolution UI Snapshot Exporter Modal */}
      <SnapshotModal
        isOpen={isSnapshotModalOpen}
        onClose={() => setIsSnapshotModalOpen(false)}
        activePlayer={activePlayer}
        roleMode={dashboardMode === 'consumer' ? 'player' : dashboardMode}
        onNotify={triggerToast}
      />

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className={`fixed bottom-6 z-50 text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200 border ${
          dashboardMode === 'consumer'
            ? 'bg-white text-zinc-900 border-[#16A34A]/40 shadow-emerald-900/10'
            : 'bg-[#1F291E] text-white border-[#CCFF00]/50 shadow-black/80'
        }`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${
            dashboardMode === 'consumer' ? 'text-[#16A34A]' : 'text-[#CCFF00]'
          }`} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

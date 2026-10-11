/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayerHeader } from './PlayerHeader';
import { PersonalPerformanceCard } from './PersonalPerformanceCard';
import { IndividualBiometricsCard } from './IndividualBiometricsCard';
import { SquadBenchmarkBadges } from './SquadBenchmarkBadges';
import { PlayerInboxFeed } from './PlayerInboxFeed';
import { MetricDrillDownModal, DrillDownMetricType } from '../mobile/MetricDrillDownModal';
import { PlayerHealthSheet } from '../mobile/PlayerHealthSheet';
import { NotificationsSheet } from '../mobile/NotificationsSheet';
import { BottomTabBar, TabType, TabConfig } from '../mobile/BottomTabBar';
import { SQUAD_MEMBERS, SquadMemberHealth } from '../../data/mobileMockData';
import { 
  Activity, 
  Trophy, 
  Heart, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface PlayerDashboardProps {
  onNotify: (message: string) => void;
  onOpenSnapshots: () => void;
  initialPlayer?: SquadMemberHealth;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  hideBottomNav?: boolean;
}

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({
  onNotify,
  onOpenSnapshots,
  initialPlayer = SQUAD_MEMBERS[0], // Mateo Alvarez #7
  activeTab: controlledTab,
  onTabChange: controlledOnTabChange,
  hideBottomNav = false,
}) => {
  const [internalTab, setInternalTab] = useState<TabType>('home');
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = (tab: TabType) => {
    if (controlledOnTabChange) {
      controlledOnTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };
  const [player, setPlayer] = useState<SquadMemberHealth>(initialPlayer);
  const [activeDrillDownMetric, setActiveDrillDownMetric] = useState<DrillDownMetricType | null>(null);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

  return (
    <div className="w-full flex flex-col space-y-4 pb-28 min-h-[calc(100vh-80px)] bg-white text-[#132216]">
      {/* 1. Athlete Header (Strictly for Athlete Passport) */}
      <PlayerHeader
        player={player}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSnapshots={onOpenSnapshots}
        unreadCount={2}
      />

      {/* TAB CONTENT: Clean, focused, matching consumer look */}
      {activeTab === 'home' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Personal Match Performance Card (Supa Rating, Top Speed, Distance, Sprints + Drill Down) */}
          <PersonalPerformanceCard
            player={player}
            onOpenMetricDrillDown={(metric) => setActiveDrillDownMetric(metric)}
            onInspectOverview={() => setIsOverviewOpen(true)}
          />

          {/* Quick Shortcuts to other tabs - Clean Retrowaves Green Cards */}
          <div className="px-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('squad')}
              className="p-4 rounded-3xl bg-[#EBF7EE] border border-[#DCF0DF] hover:bg-[#E2F4E6] transition-all text-left flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block">Squad Rank</span>
                <span className="text-sm font-black text-[#132216]">#1 Max Speed</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className="p-4 rounded-3xl bg-[#EBF7EE] border border-[#DCF0DF] hover:bg-[#E2F4E6] transition-all text-left flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block">IMU Gait</span>
                <span className="text-sm font-black text-[#132216]">200Hz Sensors</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'squad' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Squad Benchmarking Badges */}
          <SquadBenchmarkBadges player={player} />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Individual Biometrics & Recovery */}
          <IndividualBiometricsCard player={player} />
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Personal Inbox/Feed for direct notes and tactical clips sent by Coach */}
          <PlayerInboxFeed
            onAcknowledge={(msg) => onNotify(msg)}
          />
        </div>
      )}

      {/* Floating Bottom Tab Bar Navigation */}
      {!hideBottomNav && (
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadNotesCount={2}
          customTabs={playerTabs}
        />
      )}

      {/* Full Sports Science Biomechanics Sheet (Athlete Passport drill-down) */}
      <PlayerHealthSheet
        player={isOverviewOpen ? player : null}
        onClose={() => setIsOverviewOpen(false)}
        onFlagSub={() => onNotify('Requesting trainer review for left calf tightening')}
        isFlagged={false}
      />

      {/* Athlete Notifications Drawer */}
      <NotificationsSheet
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClearAll={() => onNotify('Athlete alerts cleared')}
      />

      {/* Interactive Metric Drill-Down Modal (Heart Rate, Sprints, Distance, Recovery) */}
      {activeDrillDownMetric && (
        <MetricDrillDownModal
          isOpen={!!activeDrillDownMetric}
          metricType={activeDrillDownMetric}
          player={player}
          onClose={() => setActiveDrillDownMetric(null)}
          onSwitchMetric={(metric) => setActiveDrillDownMetric(metric)}
        />
      )}
    </div>
  );
};

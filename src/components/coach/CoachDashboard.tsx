/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CoachHeader } from './CoachHeader';
import { PitchRadarHeatmap } from './PitchRadarHeatmap';
import { SquadWorkloadAlerts } from './SquadWorkloadAlerts';
import { SquadLeaderboard } from './SquadLeaderboard';
import { CoachActionControls } from './CoachActionControls';
import { SQUAD_MEMBERS, SquadMemberHealth } from '../../data/mobileMockData';
import { PlayerHealthSheet } from '../mobile/PlayerHealthSheet';
import { MetricDrillDownModal, DrillDownMetricType } from '../mobile/MetricDrillDownModal';
import { NotificationsSheet } from '../mobile/NotificationsSheet';
import { BottomTabBar, TabType, TabConfig } from '../mobile/BottomTabBar';
import { CoachNotesTab } from '../mobile/CoachNotesTab';
import { 
  Activity, 
  Radar, 
  Trophy, 
  MessageSquare,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface CoachDashboardProps {
  onNotify: (message: string) => void;
  onOpenSnapshots: () => void;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  hideBottomNav?: boolean;
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({
  onNotify,
  onOpenSnapshots,
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
  const [players, setPlayers] = useState<SquadMemberHealth[]>(SQUAD_MEMBERS);
  const [selectedPlayer, setSelectedPlayer] = useState<SquadMemberHealth>(SQUAD_MEMBERS[0]);
  const [inspectedPlayer, setInspectedPlayer] = useState<SquadMemberHealth | null>(null);
  const [flaggedPlayerIds, setFlaggedPlayerIds] = useState<string[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeDrillDownMetric, setActiveDrillDownMetric] = useState<DrillDownMetricType | null>(null);

  // Sub suggested player (e.g. Mateo Alvarez #7 with +12% asymmetry)
  const suggestedSubPlayer = players.find(
    (p) => p.fatigueStatus === 'Substitution Recommended' || p.imu.deviationPct >= 10
  );

  const handleFlagSub = (player: SquadMemberHealth) => {
    if (!flaggedPlayerIds.includes(player.id)) {
      setFlaggedPlayerIds((prev) => [...prev, player.id]);
      onNotify(`Sub Advisory flagged to Bench: #${player.number} ${player.name} (+${player.imu.deviationPct}% Asymmetry)`);
    } else {
      onNotify(`Sub Advisory already broadcast for #${player.number} ${player.name}`);
    }
  };

  const handleExportSquad = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Player,Number,Position,Group,SupaRating,IMUAsymmetryPct,FootednessBaseline,GCT_ms,HR_bpm,RecoveryScore,StrainScore,AvgSprintKmh,TopSpeedKmh,DistanceKm,FatigueStatus\n' +
      players
        .map(
          (p) =>
            `"${p.name}",${p.number},${p.position},${p.positionGroup},${p.supaRating.overallScore},${p.imu.deviationPct}%,${p.imu.baselineFootedness},${p.imu.groundContactTimeMs},${p.heartRate},${p.recoveryScore}%,${p.strainScore},${p.sprintAvgKmh},${p.topSpeedKmh},${p.distanceCoveredKm},"${p.fatigueStatus}"`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'supatrack-squad-telemetry-md24.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify('Full Squad Telemetry Report Exported (CSV)');
  };

  const handleSendTacticalNote = (msg: string) => {
    onNotify(`Tactical note dispatched to squad feeds: "${msg.substring(0, 32)}..."`);
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

  return (
    <div className="w-full flex flex-col space-y-4 pb-28 min-h-[calc(100vh-80px)] bg-white text-[#132216]">
      {/* 1. Clean Coach Header */}
      <CoachHeader
        onExport={handleExportSquad}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={3}
        activeAlertCount={suggestedSubPlayer ? 1 : 0}
      />

      {/* TAB CONTENT: Clean, readable, matching consumer layout */}
      {activeTab === 'home' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Direct Sideline Action Controls (SUB SUGGESTED, EXPORT REPORT) */}
          <CoachActionControls
            onExport={handleExportSquad}
            onBroadcastSub={() => {
              if (suggestedSubPlayer) {
                handleFlagSub(suggestedSubPlayer);
              } else {
                onNotify('No critical substitution thresholds currently breached.');
              }
            }}
            onSendTacticalNote={handleSendTacticalNote}
            suggestedSubPlayer={suggestedSubPlayer}
          />

          {/* High-Risk Workload Alerts */}
          <SquadWorkloadAlerts
            players={players}
            onInspectPlayer={(p) => setInspectedPlayer(p)}
            onFlagSub={handleFlagSub}
            flaggedPlayerIds={flaggedPlayerIds}
          />

          {/* Quick Tab Jump Shortcuts - Clean Retrowaves Green Cards */}
          <div className="px-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('squad')}
              className="p-4 rounded-3xl bg-[#EBF7EE] border border-[#DCF0DF] hover:bg-[#E2F4E6] transition-all text-left flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block">Pitch Radar</span>
                <span className="text-sm font-black text-[#132216]">11 Active Nodes</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className="p-4 rounded-3xl bg-[#EBF7EE] border border-[#DCF0DF] hover:bg-[#E2F4E6] transition-all text-left flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block">Leaderboard</span>
                <span className="text-sm font-black text-[#132216]">Squad Rankings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'squad' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Live Pitch Radar / Tactical Heatmap Grid */}
          <PitchRadarHeatmap
            players={players}
            selectedPlayer={selectedPlayer}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
            onInspectPlayer={(p) => setInspectedPlayer(p)}
            onFlagSub={handleFlagSub}
            flaggedPlayerIds={flaggedPlayerIds}
          />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Live Squad Ranking Leaderboard */}
          <SquadLeaderboard
            players={players}
            onInspectPlayer={(p) => setInspectedPlayer(p)}
          />
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="px-5">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Sideline Dispatch & Staff Notes
            </h3>
          </div>
          <CoachNotesTab />
        </div>
      )}

      {/* Floating Bottom Tab Bar Navigation */}
      {!hideBottomNav && (
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadNotesCount={1}
          customTabs={coachTabs}
        />
      )}

      {/* Player Sports Science Biomechanics Sheet on inspection */}
      <PlayerHealthSheet
        player={inspectedPlayer}
        onClose={() => setInspectedPlayer(null)}
        onFlagSub={handleFlagSub}
        isFlagged={inspectedPlayer ? flaggedPlayerIds.includes(inspectedPlayer.id) : false}
      />

      {/* Notifications Drawer */}
      <NotificationsSheet
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClearAll={() => onNotify('All coach alerts cleared')}
      />

      {/* Interactive Metric Drill-Down Modal if triggered */}
      {activeDrillDownMetric && inspectedPlayer && (
        <MetricDrillDownModal
          isOpen={!!activeDrillDownMetric}
          metricType={activeDrillDownMetric}
          player={inspectedPlayer}
          onClose={() => setActiveDrillDownMetric(null)}
          onSwitchMetric={(metric) => setActiveDrillDownMetric(metric)}
        />
      )}
    </div>
  );
};

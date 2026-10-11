import React, { useState } from 'react';
import { 
  Activity, 
  Calendar, 
  Download, 
  Play, 
  Pause, 
  Radio, 
  AlertTriangle, 
  ChevronDown,
  Check,
  ShieldAlert
} from 'lucide-react';

interface HeaderProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onOpenExport: () => void;
  selectedSession: string;
  onSelectSession: (session: string) => void;
  activeAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isSimulating,
  onToggleSimulation,
  onOpenExport,
  selectedSession,
  onSelectSession,
  activeAlertCount,
}) => {
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Matchday 3 · Today, Oct 9');

  const sessions = [
    { id: 'md3', label: 'Live Session: Matchday 3', subtitle: 'vs. Manchester City (H) · 76 min elapsed' },
    { id: 'md2', label: 'Archive: Matchday 2', subtitle: 'vs. Real Madrid (A) · Full 90 min data' },
    { id: 'md1', label: 'Archive: Matchday 1', subtitle: 'vs. Bayern Munich (H) · Full 90 min data' },
    { id: 'training', label: 'Training Camp: Microcycle 4', subtitle: 'High-intensity tactical sprint drills' },
  ];

  return (
    <header className="border-b border-[#27272a] bg-[#09090b]/95 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Brand Zone & Live Indicator */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black tracking-wider text-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>Supremos FC // Performance & Telemetry Engine</span>
              </h1>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>100Hz RTK GPS Telemetry</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>FIFA EPTS Certified</span>
              </div>
            </div>
          </div>

          {/* Live match status indicator (pulsing green dot reading "Live Session: Matchday 3") */}
          <div className="relative">
            <button
              onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-600 transition-all text-xs font-medium text-zinc-200"
              title="Change Matchday Session"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">{selectedSession}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-1" />
            </button>

            {isSessionDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-lg bg-[#18181b] border border-[#27272a] shadow-2xl p-1.5 z-50">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Select Telemetry Session
                </div>
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSession(s.label);
                      setIsSessionDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-md text-xs transition-colors flex items-start justify-between ${
                      selectedSession === s.label
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-zinc-100">{s.label}</div>
                      <div className="text-[11px] text-zinc-400">{s.subtitle}</div>
                    </div>
                    {selectedSession === s.label && (
                      <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeAlertCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-medium animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>{activeAlertCount} Substitution Flag</span>
            </div>
          )}
        </div>

        {/* Controls Zone: Date Range Picker, Live Simulator & Quick Export */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-end">
          
          {/* Live RTK GPS Simulation Toggle */}
          <button
            onClick={onToggleSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
              isSimulating
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
                : 'bg-[#18181b] text-zinc-400 border-[#27272a] hover:text-zinc-200'
            }`}
            title="Toggle live telemetry update stream"
          >
            {isSimulating ? (
              <>
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Sim Streaming</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-zinc-400" />
                <span>Resume Stream</span>
              </>
            )}
          </button>

          {/* Date Range Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-[#18181b] border border-[#27272a] text-zinc-200 hover:border-zinc-600 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span className="tabular-nums font-mono">{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isDateRangeOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#18181b] border border-[#27272a] shadow-xl p-2 z-50 text-xs">
                <div className="px-2 py-1 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Timeline Filter
                </div>
                {[
                  'Matchday 3 · Today, Oct 9',
                  'Past 7 Days (Microcycle)',
                  'Past 30 Days (Mesocycle)',
                  'Full 2026/27 Campaign',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setDateRange(item);
                      setIsDateRangeOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                      dateRange === item
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Export Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all shrink-0 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Telemetry</span>
          </button>
        </div>

      </div>
    </header>
  );
};

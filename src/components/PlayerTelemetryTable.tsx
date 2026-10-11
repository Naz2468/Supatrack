import React, { useState, useMemo } from 'react';
import { PlayerTelemetry, PlayerPosition, PositionGroup, PlayerStatus } from '../types/telemetry';
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  ShieldAlert, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Download,
  Filter,
  UserCheck
} from 'lucide-react';

interface PlayerTelemetryTableProps {
  players: PlayerTelemetry[];
  onSelectPlayer: (player: PlayerTelemetry) => void;
  onExportCsv: () => void;
}

type SortColumn = 
  | 'name' 
  | 'position' 
  | 'academyOrigin' 
  | 'totalDistanceMeters' 
  | 'sprintCount' 
  | 'maxSpeedKmh' 
  | 'recoveryRateScore' 
  | 'status';

export const PlayerTelemetryTable: React.FC<PlayerTelemetryTableProps> = ({
  players,
  onSelectPlayer,
  onExportCsv,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedPositionGroup, setSelectedPositionGroup] = useState<string>('All');
  const [sortColumn, setSortColumn] = useState<SortColumn>('totalDistanceMeters');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedPlayers = useMemo(() => {
    return players
      .filter((p) => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          p.name.toLowerCase().includes(query) ||
          p.position.toLowerCase().includes(query) ||
          p.academyOrigin.toLowerCase().includes(query) ||
          p.number.toString().includes(query);

        // Status filter
        const matchesStatus = 
          selectedStatusFilter === 'All' || p.status === selectedStatusFilter;

        // Position group filter
        const matchesGroup = 
          selectedPositionGroup === 'All' || p.positionGroup === selectedPositionGroup;

        return matchesQuery && matchesStatus && matchesGroup;
      })
      .sort((a, b) => {
        let valA: any = a[sortColumn];
        let valB: any = b[sortColumn];

        if (typeof valA === 'string') {
          return sortDirection === 'asc' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        }

        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
  }, [players, searchQuery, selectedStatusFilter, selectedPositionGroup, sortColumn, sortDirection]);

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
      : <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />;
  };

  const getStatusChip = (status: PlayerStatus) => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>Optimal</span>
          </span>
        );
      case 'Monitor':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/40">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span>Monitor</span>
          </span>
        );
      case 'Sub-Recommended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-950/80 text-red-300 border border-red-800/80 animate-pulse">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            <span>Sub-Recommended</span>
          </span>
        );
    }
  };

  return (
    <section aria-label="Player Telemetry Table" className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-sm">
      
      {/* Table Toolbar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#27272a]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-zinc-100 tracking-tight">
              Player Telemetry &amp; Workload Matrix
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              {filteredAndSortedPlayers.length} Active Profiles
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Micro-telemetry records gathered from GPS tracking vests and physiological sensors
          </p>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter by player, position, academy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#09090b] border border-[#27272a] rounded-md text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          {/* Quick Table Export */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#09090b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>CSV Export</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs: Position Groups & Status Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        
        {/* Position Group Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#09090b] rounded-lg border border-[#27272a]">
          {['All', 'Forwards', 'Midfielders', 'Defenders', 'Goalkeepers'].map((group) => (
            <button
              key={group}
              onClick={() => setSelectedPositionGroup(group)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedPositionGroup === group
                  ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-zinc-500 text-[11px] mr-1 hidden sm:inline">Status Filter:</span>
          {['All', 'Optimal', 'Monitor', 'Sub-Recommended'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatusFilter(status)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                selectedStatusFilter === status
                  ? status === 'Sub-Recommended'
                    ? 'bg-red-950/60 text-red-300 border-red-700/60 font-semibold'
                    : status === 'Monitor'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-700/60 font-semibold'
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 font-semibold'
                  : 'bg-[#09090b] text-zinc-400 border-[#27272a] hover:text-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Responsive Dense Data Table */}
      <div className="overflow-x-auto rounded-lg border border-[#27272a]">
        <table className="w-full text-left text-xs border-collapse">
          
          {/* Table Header */}
          <thead className="bg-[#09090b] text-zinc-400 uppercase tracking-wider text-[11px] font-semibold border-b border-[#27272a]">
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className="py-3 px-4 cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Player Name</span>
                  {renderSortIcon('name')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('position')}
                className="py-3 px-3 cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Position</span>
                  {renderSortIcon('position')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('academyOrigin')}
                className="py-3 px-3 cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Academy Origin</span>
                  {renderSortIcon('academyOrigin')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('totalDistanceMeters')}
                className="py-3 px-3 text-right cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Total Distance (m)</span>
                  {renderSortIcon('totalDistanceMeters')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('sprintCount')}
                className="py-3 px-3 text-right cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Sprint Count (&gt;20km/h)</span>
                  {renderSortIcon('sprintCount')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('maxSpeedKmh')}
                className="py-3 px-3 text-right cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Max Speed (km/h)</span>
                  {renderSortIcon('maxSpeedKmh')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('recoveryRateScore')}
                className="py-3 px-3 text-right cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Recovery Rate Score</span>
                  {renderSortIcon('recoveryRateScore')}
                </div>
              </th>

              <th 
                onClick={() => handleSort('status')}
                className="py-3 px-4 cursor-pointer hover:text-zinc-200 transition-colors group select-none whitespace-nowrap text-center"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Status</span>
                  {renderSortIcon('status')}
                </div>
              </th>

              <th className="py-3 px-3 text-center whitespace-nowrap text-[10px] text-zinc-500">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#27272a] bg-[#18181b]">
            {filteredAndSortedPlayers.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-zinc-500">
                  No telemetry records match your search query or filter.
                </td>
              </tr>
            ) : (
              filteredAndSortedPlayers.map((player) => {
                const isSelectedAlert = player.status === 'Sub-Recommended';
                const isMonitor = player.status === 'Monitor';

                return (
                  <tr
                    key={player.id}
                    onClick={() => onSelectPlayer(player)}
                    className={`hover:bg-zinc-800/40 transition-colors cursor-pointer group ${
                      isSelectedAlert ? 'bg-red-950/10' : isMonitor ? 'bg-amber-950/10' : ''
                    }`}
                  >
                    {/* Player Name & Number */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded font-mono font-bold text-xs flex items-center justify-center bg-zinc-800 text-zinc-200 border border-zinc-700 shrink-0">
                          #{player.number}
                        </span>
                        <div>
                          <div className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                            {player.name}
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono">
                            Vest #{player.number * 4 + 102} · {player.activeMinutes}m active
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px] font-semibold">
                        {player.position}
                      </span>
                    </td>

                    {/* Academy Origin */}
                    <td className="py-3 px-3 whitespace-nowrap text-zinc-300 font-medium">
                      {player.academyOrigin}
                    </td>

                    {/* Total Distance (m) */}
                    <td className="py-3 px-3 text-right whitespace-nowrap font-mono tabular-nums text-zinc-100 font-semibold">
                      {player.totalDistanceMeters.toLocaleString()} m
                    </td>

                    {/* Sprint Count */}
                    <td className="py-3 px-3 text-right whitespace-nowrap font-mono tabular-nums text-zinc-200">
                      <span className="text-cyan-400 font-semibold">{player.sprintCount}</span>
                      <span className="text-zinc-500 text-[11px] ml-1">({player.highIntensityDistanceMeters}m)</span>
                    </td>

                    {/* Max Speed (km/h) */}
                    <td className="py-3 px-3 text-right whitespace-nowrap font-mono tabular-nums text-emerald-400 font-bold">
                      {player.maxSpeedKmh.toFixed(1)} km/h
                    </td>

                    {/* Recovery Rate Score */}
                    <td className="py-3 px-3 text-right whitespace-nowrap font-mono tabular-nums">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <span className={`font-semibold ${
                          player.recoveryRateScore >= 80 
                            ? 'text-emerald-400' 
                            : player.recoveryRateScore >= 70 
                            ? 'text-amber-400' 
                            : 'text-red-400'
                        }`}>
                          {player.recoveryRateScore}%
                        </span>
                        <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className={`h-full rounded-full ${
                              player.recoveryRateScore >= 80 
                                ? 'bg-emerald-500' 
                                : player.recoveryRateScore >= 70 
                                ? 'bg-amber-500' 
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${player.recoveryRateScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status Chip */}
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      {getStatusChip(player.status)}
                    </td>

                    {/* Action inspect */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlayer(player);
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                        title="View Detailed Telemetry"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* Table Summary Footer */}
      <div className="mt-3.5 pt-3 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
        <div className="flex items-center gap-2">
          <span>Showing {filteredAndSortedPlayers.length} of {players.length} squad members</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Click any row for biometrics deep dive</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-zinc-300">
          <span>Outfield Distance Total: <strong className="text-white">114,200 m</strong></span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Avg Max Velocity: <strong className="text-emerald-400">32.6 km/h</strong></span>
        </div>
      </div>

    </section>
  );
};

import React, { useState } from 'react';
import { PlayerTelemetry, MatchKpis } from '../types/telemetry';
import { 
  X, 
  Download, 
  FileText, 
  FileCode, 
  Check, 
  Share2, 
  Layers
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: PlayerTelemetry[];
  kpis: MatchKpis;
  sessionName: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  players,
  kpis,
  sessionName,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json' | 'summary'>('csv');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    let content = '';
    let mimeType = 'text/plain';
    let filename = `supremos-fc-${sessionName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    if (selectedFormat === 'csv') {
      mimeType = 'text/csv;charset=utf-8;';
      filename += '-telemetry.csv';
      const headers = ['Number', 'Name', 'Position', 'PositionGroup', 'AcademyOrigin', 'TotalDistanceMeters', 'SprintCount', 'HighIntensityDistanceM', 'MaxSpeedKmh', 'HeartRateBpm', 'HRZone', 'RecoveryRatePct', 'FatigueIndex', 'ACWR', 'Status', 'StatusReason'];
      const rows = players.map(p => [
        p.number,
        `"${p.name}"`,
        p.position,
        p.positionGroup,
        `"${p.academyOrigin}"`,
        p.totalDistanceMeters,
        p.sprintCount,
        p.highIntensityDistanceMeters,
        p.maxSpeedKmh,
        p.currentHeartRate,
        p.hrZone,
        p.recoveryRateScore,
        p.fatigueIndex,
        p.acwr,
        p.status,
        `"${p.statusReason || ''}"`
      ]);
      content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (selectedFormat === 'json') {
      mimeType = 'application/json;charset=utf-8;';
      filename += '-telemetry.json';
      content = JSON.stringify({
        session: sessionName,
        timestamp: new Date().toISOString(),
        kpis,
        squadTelemetry: players,
      }, null, 2);
    } else {
      mimeType = 'text/plain;charset=utf-8;';
      filename += '-executive-summary.txt';
      content = `SUPREMOS FC // PERFORMANCE & TELEMETRY ENGINE
SESSION: ${sessionName}
GENERATED: ${new Date().toLocaleString()}

MATCH KPIS:
- Total Distance Covered: ${kpis.totalDistanceKm} km (+${kpis.distanceDeltaPct}% vs MD2)
- High-Intensity Sprints (>20km/h): ${kpis.highIntensitySprints} counts
- Average Work-Rate / Fatigue Index: ${kpis.avgWorkRateScore}% Optimal (${kpis.fatigueFlagsCount} flags)
- Tactical Execution Score: ${kpis.tacticalExecutionScore} / 10 (Pressing Efficiency: ${kpis.pressingEfficiencyPct}%)

SUBSTITUTION ALERTS:
${players.filter(p => p.status !== 'Optimal').map(p => `- #${p.number} ${p.name} (${p.position}) [${p.status}]: ${p.statusReason}`).join('\n')}

SQUAD OVERVIEW:
${players.map(p => `#${p.number} ${p.name.padEnd(20)} | ${p.position.padEnd(4)} | ${(p.totalDistanceMeters/1000).toFixed(2)} km | ${p.sprintCount} sprints | ${p.maxSpeedKmh} km/h | HR: ${p.currentHeartRate}bpm | ACWR: ${p.acwr}`).join('\n')}
`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-md shadow-2xl p-6 relative text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#27272a]">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Export Telemetry Data</h2>
            <p className="text-xs text-zinc-400">{sessionName}</p>
          </div>
        </div>

        {/* Format Selector */}
        <div className="space-y-2.5 mb-6">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Select Export Format
          </label>
          
          <button
            onClick={() => setSelectedFormat('csv')}
            className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
              selectedFormat === 'csv'
                ? 'bg-emerald-950/30 border-emerald-500 text-zinc-100'
                : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className={`w-4 h-4 ${selectedFormat === 'csv' ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <div>
                <div className="font-semibold text-zinc-200">CSV Spreadsheet Data</div>
                <div className="text-[11px] text-zinc-500">Full player records, sprint metrics, recovery &amp; ACWR</div>
              </div>
            </div>
            {selectedFormat === 'csv' && <Check className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setSelectedFormat('json')}
            className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
              selectedFormat === 'json'
                ? 'bg-emerald-950/30 border-emerald-500 text-zinc-100'
                : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileCode className={`w-4 h-4 ${selectedFormat === 'json' ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <div>
                <div className="font-semibold text-zinc-200">JSON Telemetry Stream</div>
                <div className="text-[11px] text-zinc-500">Raw EPTS data package for analytics integrations</div>
              </div>
            </div>
            {selectedFormat === 'json' && <Check className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setSelectedFormat('summary')}
            className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
              selectedFormat === 'summary'
                ? 'bg-emerald-950/30 border-emerald-500 text-zinc-100'
                : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className={`w-4 h-4 ${selectedFormat === 'summary' ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <div>
                <div className="font-semibold text-zinc-200">Executive Briefing Summary</div>
                <div className="text-[11px] text-zinc-500">Formatted text report for coaching &amp; medical staff</div>
              </div>
            </div>
            {selectedFormat === 'summary' && <Check className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={downloadSuccess}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

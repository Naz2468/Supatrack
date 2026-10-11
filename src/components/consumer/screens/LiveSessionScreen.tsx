import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Heart, 
  Gauge, 
  Timer, 
  Compass, 
  Mountain, 
  Flame, 
  Zap,
  Radio,
  CheckCircle2
} from 'lucide-react';

interface LiveSessionScreenProps {
  onFinishSession?: (summary: { distance: number; time: string; calories: number }) => void;
}

export const LiveSessionScreen: React.FC<LiveSessionScreenProps> = ({ onFinishSession }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(1368); // 22m 48s elapsed
  const [distanceKm, setDistanceKm] = useState(4.82);
  const [currentHr, setCurrentHr] = useState(154);
  const [cadenceSpm, setCadenceSpm] = useState(168);
  const [calories, setCalories] = useState(342);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setDistanceKm((prev) => Number((prev + 0.0035).toFixed(2)));
        setCalories((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
        // gentle HR oscillation
        setCurrentHr((prev) => 150 + Math.floor(Math.sin(Date.now() / 4000) * 8));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    setIsRunning(false);
    if (onFinishSession) {
      onFinishSession({
        distance: distanceKm,
        time: formatTime(seconds),
        calories,
      });
    }
  };

  return (
    <div className="min-h-full pb-24 bg-white text-[#132216]">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAF2EB]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping" />
          <span className="text-xs font-black text-[#132216] uppercase tracking-wider">
            Live Telemetry HUD
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#EBF7EE] text-[#16A34A] px-2.5 py-1 rounded-full text-[10px] font-bold">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>GPS 100Hz • BLE HRM Synced</span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Main Distance & Pace HUD Card */}
        <div className="bg-[#EBF7EE] rounded-3xl p-6 border border-[#DCF0DF] text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              {isRunning ? 'Session Active' : 'Session Paused'}
            </span>
          </div>

          {/* Big Distance Display */}
          <div className="flex items-baseline justify-center gap-2 my-2">
            <span className="text-6xl font-black text-[#132216] tracking-tight">{distanceKm}</span>
            <span className="text-xl font-bold text-[#16A34A]">km</span>
          </div>

          <div className="text-xs font-bold text-zinc-400">Total Distance Covered</div>

          {/* Sub-metrics strip */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#D5EBD8]">
            <div className="bg-white/90 rounded-2xl p-3 border border-[#DCF0DF]">
              <div className="flex items-center justify-center gap-1 text-zinc-400 mb-0.5">
                <Timer className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="text-[10px] font-bold uppercase">Elapsed Time</span>
              </div>
              <span className="text-2xl font-black text-[#132216] font-mono">{formatTime(seconds)}</span>
            </div>

            <div className="bg-white/90 rounded-2xl p-3 border border-[#DCF0DF]">
              <div className="flex items-center justify-center gap-1 text-zinc-400 mb-0.5">
                <Gauge className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="text-[10px] font-bold uppercase">Current Pace</span>
              </div>
              <span className="text-2xl font-black text-[#132216] font-mono">4'42"</span>
            </div>
          </div>
        </div>

        {/* Real-time Biometric Gauges */}
        <div className="grid grid-cols-2 gap-3">
          {/* Heart Rate Live Box */}
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Heart Rate</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#132216]">{currentHr}</span>
              <span className="text-xs font-bold text-zinc-400">bpm</span>
            </div>
            <span className="text-[10px] font-bold text-[#16A34A] block mt-1">Zone 3 Aerobic</span>
          </div>

          {/* Cadence Live Box */}
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Cadence</span>
              <Zap className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#132216]">{cadenceSpm}</span>
              <span className="text-xs font-bold text-zinc-400">spm</span>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 block mt-1">Optimal Stride Rhythm</span>
          </div>

          {/* Calories Burned */}
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Energy Burn</span>
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#132216]">{calories}</span>
              <span className="text-xs font-bold text-zinc-400">kcal</span>
            </div>
            <span className="text-[10px] font-semibold text-zinc-400 block mt-1">Active Metabolism</span>
          </div>

          {/* Elevation Gain */}
          <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#E5EFE6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Elevation</span>
              <Mountain className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#132216]">+54</span>
              <span className="text-xs font-bold text-zinc-400">m</span>
            </div>
            <span className="text-[10px] font-semibold text-zinc-400 block mt-1">Rolling Terrain</span>
          </div>
        </div>

        {/* Live Controls */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer ${
              isRunning
                ? 'bg-amber-500 shadow-amber-500/25'
                : 'bg-[#16A34A] shadow-emerald-600/25'
            }`}
          >
            {isRunning ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
          </button>

          <button
            onClick={handleStop}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/25 transition-transform active:scale-95 hover:bg-red-600 cursor-pointer"
          >
            <Square className="w-6 h-6 fill-current" />
          </button>
        </div>

        <p className="text-center text-[11px] text-zinc-400 font-medium">
          Tap Pause to hold splits • Tap Stop to save session & sync history
        </p>
      </div>
    </div>
  );
};

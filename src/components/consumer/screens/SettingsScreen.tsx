import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Radio, 
  Bell, 
  Download, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  Sliders, 
  Activity, 
  Heart,
  RotateCcw
} from 'lucide-react';
import { ConsumerProfile } from '../../../data/consumerData';

interface SettingsScreenProps {
  profile: ConsumerProfile;
  onEditProfile: () => void;
  onReplayOnboarding: () => void;
  onSignOut: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  profile,
  onEditProfile,
  onReplayOnboarding,
  onSignOut,
}) => {
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>('km');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [autoPause, setAutoPause] = useState(true);
  const [audioPace, setAudioPace] = useState(true);
  const [hrAlert, setHrAlert] = useState(true);

  return (
    <div className="min-h-full pb-24 bg-white text-[#132216]">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 pt-4 pb-3 border-b border-[#EAF2EB]">
        <h1 className="text-lg font-black text-[#132216] tracking-tight">System & Preferences</h1>
        <p className="text-xs text-zinc-400 font-medium">Sensors, telemetry calibration, and athlete account</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Profile Card */}
        <div className="bg-[#EBF7EE] rounded-3xl p-5 border border-[#DCF0DF] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-[#132216]">{profile.name}</span>
                <span className="text-[10px] font-bold text-[#16A34A] bg-white px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </div>
              <span className="text-xs text-[#48634E] block mt-0.5">{profile.email}</span>
              <span className="text-[11px] font-bold text-zinc-500 block mt-1">
                {profile.sport} • {profile.weightKg} kg • {profile.weeklyGoalKm} km Goal
              </span>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="text-xs font-bold text-[#16A34A] bg-white px-3 py-1.5 rounded-xl border border-[#D8EEDC] hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Connected Hardware & Telemetry Sensors */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#132216]">Connected Telemetry Sensors</h2>
            <span className="text-[10px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2 py-0.5 rounded-full">
              2 Active
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAF8] border border-[#EAF2EB]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white text-red-500 flex items-center justify-center border border-zinc-200">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#132216] block">Polar H10 Chest Strap</span>
                  <span className="text-[10px] text-zinc-400">BLE 100Hz Heart Rate & HRV</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2 py-0.5 rounded-full">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAF8] border border-[#EAF2EB]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white text-[#16A34A] flex items-center justify-center border border-zinc-200">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#132216] block">Dual-Band L1/L5 GPS</span>
                  <span className="text-[10px] text-zinc-400">High Precision Real-Time Route</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#16A34A] bg-[#EBF7EE] px-2 py-0.5 rounded-full">
                Locked
              </span>
            </div>
          </div>
        </div>

        {/* Units Configuration */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-xs space-y-4">
          <h2 className="text-sm font-black text-[#132216]">Units & Formats</h2>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-600">Distance Measurement</span>
            <div className="flex bg-[#F3F8F4] p-1 rounded-xl border border-[#DEEEDE]">
              <button
                onClick={() => setDistanceUnit('km')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  distanceUnit === 'km' ? 'bg-[#16A34A] text-white' : 'text-zinc-500'
                }`}
              >
                Kilometers (km)
              </button>
              <button
                onClick={() => setDistanceUnit('mi')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  distanceUnit === 'mi' ? 'bg-[#16A34A] text-white' : 'text-zinc-500'
                }`}
              >
                Miles (mi)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            <span className="text-xs font-bold text-zinc-600">Weight Unit</span>
            <div className="flex bg-[#F3F8F4] p-1 rounded-xl border border-[#DEEEDE]">
              <button
                onClick={() => setWeightUnit('kg')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  weightUnit === 'kg' ? 'bg-[#16A34A] text-white' : 'text-zinc-500'
                }`}
              >
                kg
              </button>
              <button
                onClick={() => setWeightUnit('lbs')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  weightUnit === 'lbs' ? 'bg-[#16A34A] text-white' : 'text-zinc-500'
                }`}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        {/* Training Alerts & Smart Features */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5EFE6] shadow-xs space-y-3">
          <h2 className="text-sm font-black text-[#132216]">Live Tracking Automation</h2>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="text-xs font-bold text-[#132216] block">Auto-Pause on Stop</span>
              <span className="text-[10px] text-zinc-400">Halts timer during street intersections</span>
            </div>
            <button
              onClick={() => setAutoPause(!autoPause)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoPause ? 'bg-[#16A34A]' : 'bg-zinc-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  autoPause ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-zinc-100">
            <div>
              <span className="text-xs font-bold text-[#132216] block">Audio Split Announcements</span>
              <span className="text-[10px] text-zinc-400">Pace voice cues at every kilometer</span>
            </div>
            <button
              onClick={() => setAudioPace(!audioPace)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                audioPace ? 'bg-[#16A34A]' : 'bg-zinc-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  audioPace ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-zinc-100">
            <div>
              <span className="text-xs font-bold text-[#132216] block">Max Cardiac Alert (&gt; 185 bpm)</span>
              <span className="text-[10px] text-zinc-400">Vibration warning when exceeding Zone 5</span>
            </div>
            <button
              onClick={() => setHrAlert(!hrAlert)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                hrAlert ? 'bg-[#16A34A]' : 'bg-zinc-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  hrAlert ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data Export & Flow Simulator */}
        <div className="space-y-2.5">
          <button
            onClick={() => alert('Exporting all 5 telemetry sessions as FIT & GPX files...')}
            className="w-full p-4 rounded-2xl bg-[#F0F8F1] hover:bg-[#E2F4E5] border border-[#DEEEDE] text-left flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4 text-[#16A34A]" />
              <span className="text-xs font-bold text-[#132216]">Export Telemetry Archive (FIT / GPX)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>

          <button
            onClick={onReplayOnboarding}
            className="w-full p-4 rounded-2xl bg-[#F8FAF8] hover:bg-[#F0F8F1] border border-zinc-200 text-left flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-[#16A34A]" />
              <div>
                <span className="text-xs font-bold text-[#132216] block">Test Onboarding & Auth Flow</span>
                <span className="text-[10px] text-zinc-400">Replays Welcome, Sign Up, Verified, Profile screens</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2">
          <button
            onClick={onSignOut}
            className="w-full py-3.5 rounded-2xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from SupaTrack</span>
          </button>
        </div>
      </div>
    </div>
  );
};

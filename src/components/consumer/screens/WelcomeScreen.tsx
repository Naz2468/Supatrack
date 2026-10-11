import React from 'react';
import { Activity, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onSkipToHome: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onSignIn,
  onSkipToHome,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-[#132216]">
      {/* Top Brand Header */}
      <div className="pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#16A34A] to-[#22C55E] flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[#132216]">SupaTrack</span>
            <span className="block text-[11px] font-semibold text-[#16A34A] tracking-wider uppercase">Fitness Telemetry</span>
          </div>
        </div>
        <button
          onClick={onSkipToHome}
          className="text-xs font-bold text-zinc-500 hover:text-[#16A34A] bg-[#F0F8F1] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          Skip Demo →
        </button>
      </div>

      {/* Hero Visual Card */}
      <div className="my-8 relative">
        <div className="bg-[#EBF7EE] rounded-3xl p-6 border border-[#D8EEDC] shadow-sm relative overflow-hidden">
          {/* Subtle graphic wave background */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#22C55E]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Telemetry Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white text-[#16A34A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Retrowaves Green Edition</span>
          </div>

          <h2 className="text-2xl font-black text-[#132216] tracking-tight leading-snug">
            Precision Telemetry for Every Kilometer.
          </h2>

          <p className="text-xs text-[#48634E] mt-2 font-medium leading-relaxed">
            Monitor real-time pace, heart rate strain zones, neuromuscular recovery, and sprint decay designed for solo athletes.
          </p>

          {/* Quick Metrics Preview Mockup */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className="bg-white/90 rounded-2xl p-2.5 border border-[#DCF0DF]">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Distance</span>
              <span className="text-sm font-black text-[#132216]">38.6 km</span>
              <span className="text-[9px] text-[#16A34A] font-bold block mt-0.5">+12% wk</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2.5 border border-[#DCF0DF]">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Avg Pace</span>
              <span className="text-sm font-black text-[#132216]">4'48"</span>
              <span className="text-[9px] text-[#16A34A] font-bold block mt-0.5">Optimal</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2.5 border border-[#DCF0DF]">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase block">Recovery</span>
              <span className="text-sm font-black text-[#16A34A]">86%</span>
              <span className="text-[9px] text-[#16A34A] font-bold block mt-0.5">Ready</span>
            </div>
          </div>
        </div>

        {/* Feature bullet list */}
        <div className="mt-6 space-y-3 px-1">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-[#2C3E2F]">Real-time Live Pace & Cadence HUD</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center shrink-0">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-[#2C3E2F]">Sports-Science Heart Rate Zone 1-5 Analysis</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-[#2C3E2F]">Fatigue Decay & Weekly Mileage Targets</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-2">
        <button
          onClick={onGetStarted}
          className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onSignIn}
          className="w-full py-3.5 rounded-2xl bg-[#F0F8F1] hover:bg-[#E2F4E5] text-[#16A34A] font-bold text-xs transition-colors cursor-pointer"
        >
          I already have an account • Sign In
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface VerifiedScreenProps {
  userName: string;
  onSetupProfile: () => void;
  onSkipToHome: () => void;
}

export const VerifiedScreen: React.FC<VerifiedScreenProps> = ({
  userName,
  onSetupProfile,
  onSkipToHome,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between items-center p-6 bg-white text-[#132216] text-center">
      <div className="w-full flex justify-end pt-2">
        <button
          onClick={onSkipToHome}
          className="text-xs font-bold text-zinc-400 hover:text-[#16A34A] cursor-pointer"
        >
          Skip
        </button>
      </div>

      <div className="max-w-xs flex flex-col items-center my-auto py-8">
        {/* Verification Icon Badge */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#EBF7EE] border-4 border-white shadow-xl flex items-center justify-center text-[#16A34A]">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 fill-current" />
          </div>
        </div>

        <span className="inline-block px-3 py-1 bg-[#EBF7EE] text-[#16A34A] text-xs font-bold rounded-full mb-3">
          Step 2 of 3 • Verified
        </span>

        <h1 className="text-2xl font-black text-[#132216] tracking-tight">
          You Are Verified!
        </h1>

        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
          Welcome to SupaTrack, <span className="font-bold text-[#132216]">{userName || 'Athlete'}</span>. Your solo athletic telemetry environment has been generated.
        </p>

        {/* Feature summary card */}
        <div className="w-full bg-[#F5FAF6] rounded-2xl p-4 mt-6 border border-[#DEEEDE] text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#223927]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Biometric sensors calibrated</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#223927]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Telemetry engine initialized</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#223927]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Zero cross-contamination confirmed</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3 pb-2">
        <button
          onClick={onSetupProfile}
          className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Complete Profile Setup</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onSkipToHome}
          className="w-full py-3 rounded-2xl text-xs font-bold text-zinc-500 hover:text-[#16A34A] transition-colors cursor-pointer"
        >
          Go directly to Dashboard
        </button>
      </div>
    </div>
  );
};

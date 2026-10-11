import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Check, Shield } from 'lucide-react';

interface SignUpScreenProps {
  onBack: () => void;
  onContinue: (name: string, email: string) => void;
  onSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onBack,
  onContinue,
  onSignIn,
}) => {
  const [name, setName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@retrowaves.fit');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(name, email);
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-[#132216]">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3 pt-2 mb-6">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#F0F8F1] flex items-center justify-center text-[#16A34A] hover:bg-[#E2F4E5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Step 1 of 3</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#132216] tracking-tight">Create An Account</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Start tracking your solo performance and fitness telemetry.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#132216] mb-1.5">Full Name</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Vance"
                className="w-full bg-[#F5FAF6] border border-[#DEEEDE] rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-[#132216] placeholder:text-zinc-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#132216] mb-1.5">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.vance@retrowaves.fit"
                className="w-full bg-[#F5FAF6] border border-[#DEEEDE] rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-[#132216] placeholder:text-zinc-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#132216] mb-1.5">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                className="w-full bg-[#F5FAF6] border border-[#DEEEDE] rounded-2xl py-3 pl-10 pr-11 text-xs font-medium text-[#132216] placeholder:text-zinc-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                agreed ? 'bg-[#16A34A] border-[#16A34A] text-white' : 'border-zinc-300 bg-white'
              }`}
            >
              {agreed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
            <span className="text-[11px] text-zinc-500 leading-tight">
              I agree to the <span className="font-semibold text-[#16A34A]">Terms of Service</span> and acknowledge athletic telemetry health disclosures.
            </span>
          </div>

          {/* Privacy badge */}
          <div className="bg-[#EBF7EE] rounded-2xl p-3 flex items-center gap-2.5 border border-[#DCF0DF]">
            <Shield className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span className="text-[10px] text-[#2C4A31] font-medium leading-tight">
              End-to-end encrypted biometric storage. Strictly private to your solo profile.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      <div className="text-center pt-6 pb-2">
        <span className="text-xs text-zinc-400">Already have an account? </span>
        <button
          onClick={onSignIn}
          className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

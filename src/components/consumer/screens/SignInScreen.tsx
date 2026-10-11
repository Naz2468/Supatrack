import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Zap, Shield } from 'lucide-react';

interface SignInScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  onSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onBack,
  onSuccess,
  onSignUp,
}) => {
  const [email, setEmail] = useState('alex.vance@retrowaves.fit');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
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
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sign In</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#132216] tracking-tight">Welcome Back</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Access your solo running records, heart rate zones, and fitness analytics.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#132216]">Password</label>
              <button
                type="button"
                className="text-[11px] font-semibold text-[#16A34A] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Demo Fast Login Pill */}
        <div className="mt-5 p-3.5 bg-[#EBF7EE] rounded-2xl border border-[#DCF0DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold text-xs">
              AV
            </div>
            <div>
              <span className="text-xs font-bold text-[#132216] block">Alex Vance (Pro Solo)</span>
              <span className="text-[10px] text-[#48634E] block">Preloaded 38.6 km Weekly Telemetry</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onSuccess}
            className="text-[11px] font-bold text-white bg-[#16A34A] px-3 py-1.5 rounded-xl hover:bg-[#15803D] cursor-pointer"
          >
            Quick In
          </button>
        </div>
      </div>

      <div className="text-center pt-6 pb-2">
        <span className="text-xs text-zinc-400">Don't have an account? </span>
        <button
          onClick={onSignUp}
          className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, Camera, Check, Heart, Scale, Ruler, Compass } from 'lucide-react';
import { ConsumerProfile } from '../../../data/consumerData';

interface ProfileSetupScreenProps {
  initialProfile: ConsumerProfile;
  onSave: (updatedProfile: ConsumerProfile) => void;
  onBack: () => void;
}

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  initialProfile,
  onSave,
  onBack,
}) => {
  const [profile, setProfile] = useState<ConsumerProfile>(initialProfile);
  const sports = ['Solo Running', 'Road Cycling', 'Trail Jogging', 'HIIT & Speed'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-[#132216]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#F0F8F1] flex items-center justify-center text-[#16A34A] hover:bg-[#E2F4E5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#16A34A] bg-[#EBF7EE] px-3 py-1 rounded-full">
            Profile Customization
          </span>
        </div>

        <div className="text-center mb-6">
          {/* Avatar with edit badge */}
          <div className="relative inline-block mx-auto mb-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#EBF7EE] shadow-md"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md hover:bg-[#15803D] cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <h1 className="text-xl font-black text-[#132216]">{profile.name}</h1>
          <p className="text-xs text-zinc-400">{profile.email}</p>
        </div>

        {/* Profile configuration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sport selection */}
          <div>
            <label className="block text-xs font-bold text-[#132216] mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Primary Athletic Activity</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sports.map((sp) => {
                const isSelected = profile.sport === sp;
                return (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => setProfile({ ...profile, sport: sp })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#EBF7EE] border-[#16A34A] text-[#132216] ring-1 ring-[#16A34A]'
                        : 'bg-[#F9FAF9] border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    {sp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Physical Stats: Weight & Height */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5FAF6] p-3 rounded-2xl border border-[#DEEEDE]">
              <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 mb-1">
                <Scale className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Weight (kg)</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, weightKg: Math.max(40, profile.weightKg - 1) })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-base font-black text-[#132216]">{profile.weightKg} kg</span>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, weightKg: profile.weightKg + 1 })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-[#F5FAF6] p-3 rounded-2xl border border-[#DEEEDE]">
              <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 mb-1">
                <Ruler className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Height (cm)</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, heightCm: Math.max(120, profile.heightCm - 1) })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-base font-black text-[#132216]">{profile.heightCm} cm</span>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, heightCm: profile.heightCm + 1 })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Resting HR & Weekly Goal */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5FAF6] p-3 rounded-2xl border border-[#DEEEDE]">
              <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 mb-1">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                <span>Resting HR</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, restingHr: Math.max(35, profile.restingHr - 1) })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-base font-black text-[#132216]">{profile.restingHr} bpm</span>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, restingHr: profile.restingHr + 1 })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-[#F5FAF6] p-3 rounded-2xl border border-[#DEEEDE]">
              <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 mb-1">
                <span className="text-[#16A34A] font-bold">🎯</span>
                <span>Weekly Target</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, weeklyGoalKm: Math.max(5, profile.weeklyGoalKm - 5) })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-base font-black text-[#132216]">{profile.weeklyGoalKm} km</span>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, weeklyGoalKm: profile.weeklyGoalKm + 5 })}
                  className="w-7 h-7 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-bold flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save & Go to Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

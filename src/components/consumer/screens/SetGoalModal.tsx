import React, { useState } from 'react';
import { X, Target, Check, Compass, Calendar, Flame, Timer, Zap } from 'lucide-react';

interface SetGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoalKm: number;
  onSaveGoal: (newGoalKm: number, goalType: string) => void;
}

export const SetGoalModal: React.FC<SetGoalModalProps> = ({
  isOpen,
  onClose,
  currentGoalKm,
  onSaveGoal,
}) => {
  if (!isOpen) return null;

  const [goalType, setGoalType] = useState<'distance' | 'sessions' | 'activeMinutes' | 'calories'>('distance');
  const [targetValue, setTargetValue] = useState<number>(currentGoalKm || 40);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const goalTypesConfig = [
    { id: 'distance', label: 'Distance', unit: 'km', step: 5, icon: Compass, defaultVal: 40 },
    { id: 'sessions', label: 'Workouts', unit: 'sessions', step: 1, icon: Target, defaultVal: 5 },
    { id: 'activeMinutes', label: 'Active Time', unit: 'mins', step: 15, icon: Timer, defaultVal: 180 },
    { id: 'calories', label: 'Calorie Burn', unit: 'kcal', step: 250, icon: Flame, defaultVal: 2800 },
  ];

  const activeConfig = goalTypesConfig.find((g) => g.id === goalType)!;

  const handleTypeSelect = (id: 'distance' | 'sessions' | 'activeMinutes' | 'calories') => {
    setGoalType(id);
    const config = goalTypesConfig.find((g) => g.id === id)!;
    setTargetValue(config.defaultVal);
  };

  const handleSave = () => {
    onSaveGoal(targetValue, goalType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-[#E5EFE6] max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F5F0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#132216]">Set Your Fitness Target</h2>
              <span className="text-[11px] font-semibold text-zinc-400">Sports Science Volume Goal</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F8F5] text-zinc-400 hover:text-zinc-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Goal Category Grid */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-[#132216] mb-2">Select Goal Metric</label>
          <div className="grid grid-cols-2 gap-2">
            {goalTypesConfig.map((item) => {
              const Icon = item.icon;
              const isSelected = goalType === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTypeSelect(item.id as any)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF7EE] border-[#16A34A] text-[#132216] shadow-xs'
                      : 'bg-[#F9FAF9] border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#16A34A] text-white' : 'bg-white text-zinc-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">{item.unit}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Stepper Value */}
        <div className="my-6 bg-[#F5FAF6] rounded-3xl p-5 border border-[#DEEEDE] text-center">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
            Target {activeConfig.label}
          </span>
          <div className="flex items-center justify-center gap-4 my-2">
            <button
              onClick={() => setTargetValue(Math.max(activeConfig.step, targetValue - activeConfig.step))}
              className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-zinc-700 text-lg font-black flex items-center justify-center hover:bg-zinc-100 shadow-xs active:scale-95 cursor-pointer"
            >
              -
            </button>
            <div className="min-w-[120px]">
              <span className="text-3xl font-black text-[#132216] tracking-tight">{targetValue}</span>
              <span className="text-sm font-bold text-[#16A34A] ml-1.5">{activeConfig.unit}</span>
            </div>
            <button
              onClick={() => setTargetValue(targetValue + activeConfig.step)}
              className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-zinc-700 text-lg font-black flex items-center justify-center hover:bg-zinc-100 shadow-xs active:scale-95 cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-[11px] text-[#48634E] font-medium block mt-1">
            Recommended baseline for steady aerobic enhancement
          </span>
        </div>

        {/* Frequency selector */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#132216] mb-1.5">Cycle Frequency</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFrequency('weekly')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                frequency === 'weekly'
                  ? 'bg-[#16A34A] text-white border-[#16A34A]'
                  : 'bg-[#F9FAF9] text-zinc-600 border-zinc-200'
              }`}
            >
              Weekly Cycle
            </button>
            <button
              onClick={() => setFrequency('monthly')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                frequency === 'monthly'
                  ? 'bg-[#16A34A] text-white border-[#16A34A]'
                  : 'bg-[#F9FAF9] text-zinc-600 border-zinc-200'
              }`}
            >
              Monthly Cycle
            </button>
          </div>
        </div>

        {/* Pace and Reminder toggle */}
        <div className="flex items-center justify-between p-3 bg-[#F8FAF8] rounded-2xl border border-zinc-200 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#16A34A]" />
            <div>
              <span className="text-xs font-bold text-[#132216] block">Smart Telemetry Pacing</span>
              <span className="text-[10px] text-zinc-400">Audio splits & milestone alerts</span>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              notificationsEnabled ? 'bg-[#16A34A]' : 'bg-zinc-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                notificationsEnabled ? 'left-5.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Save & Activate Target</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ConsumerBottomNav, ConsumerTabType } from './ConsumerBottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { AnalysisScreen } from './screens/AnalysisScreen';
import { LiveSessionScreen } from './screens/LiveSessionScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { SetGoalModal } from './screens/SetGoalModal';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { VerifiedScreen } from './screens/VerifiedScreen';
import { SignInScreen } from './screens/SignInScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { DistanceDeepDive } from './deepdives/DistanceDeepDive';
import { SprintsDeepDive } from './deepdives/SprintsDeepDive';
import { HeartRateDeepDive } from './deepdives/HeartRateDeepDive';
import { RecoveryDeepDive } from './deepdives/RecoveryDeepDive';
import { 
  INITIAL_CONSUMER_PROFILE, 
  ConsumerProfile, 
  WORKOUT_HISTORY, 
  WorkoutSession 
} from '../../data/consumerData';

export type ConsumerAuthState = 'authenticated' | 'welcome' | 'signup' | 'verified' | 'signin' | 'profile';
export type DeepDiveType = 'distance' | 'sprints' | 'heart_rate' | 'recovery' | null;

interface ConsumerAppProps {
  onNotify?: (message: string) => void;
}

export const ConsumerApp: React.FC<ConsumerAppProps> = ({ onNotify }) => {
  const [authState, setAuthState] = useState<ConsumerAuthState>('authenticated');
  const [activeTab, setActiveTab] = useState<ConsumerTabType>('home');
  const [activeDeepDive, setActiveDeepDive] = useState<DeepDiveType>(null);
  const [isSetGoalOpen, setIsSetGoalOpen] = useState(false);
  const [profile, setProfile] = useState<ConsumerProfile>(INITIAL_CONSUMER_PROFILE);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>(WORKOUT_HISTORY);

  const notify = (msg: string) => {
    if (onNotify) onNotify(msg);
  };

  const handleGoalSave = (newVal: number, type: string) => {
    if (type === 'distance') {
      setProfile((prev) => ({ ...prev, weeklyGoalKm: newVal }));
    }
    notify(`Fitness Target Activated: ${newVal} ${type === 'distance' ? 'km' : 'units'}`);
  };

  const handleFinishLiveSession = (summary: { distance: number; time: string; calories: number }) => {
    const newSession: WorkoutSession = {
      id: `w-${Date.now()}`,
      title: 'Solo Sunset Run',
      type: 'run',
      date: 'Just Now',
      timeAgo: 'Just now',
      distanceKm: summary.distance,
      durationMinutes: Math.round(summary.distance * 5.2),
      avgPace: "4'42\"/km",
      avgHr: 154,
      maxHr: 178,
      caloriesBurned: summary.calories,
      elevationM: 54,
      sprintsCount: 4,
      routeTitle: 'Solo Urban Circuit',
    };
    setWorkouts([newSession, ...workouts]);
    setActiveTab('history');
    notify(`Workout Logged: ${summary.distance} km covered (${summary.calories} kcal)`);
  };

  // 1. Auth Flow Renderers
  if (authState === 'welcome') {
    return (
      <WelcomeScreen
        onGetStarted={() => setAuthState('signup')}
        onSignIn={() => setAuthState('signin')}
        onSkipToHome={() => {
          setAuthState('authenticated');
          notify('Loaded Public Consumer Dashboard');
        }}
      />
    );
  }

  if (authState === 'signup') {
    return (
      <SignUpScreen
        onBack={() => setAuthState('welcome')}
        onContinue={(name, email) => {
          setProfile((prev) => ({ ...prev, name, email }));
          setAuthState('verified');
          notify('Account verified successfully');
        }}
        onSignIn={() => setAuthState('signin')}
      />
    );
  }

  if (authState === 'verified') {
    return (
      <VerifiedScreen
        userName={profile.name}
        onSetupProfile={() => setAuthState('profile')}
        onSkipToHome={() => {
          setAuthState('authenticated');
          notify('Welcome to SupaTrack!');
        }}
      />
    );
  }

  if (authState === 'signin') {
    return (
      <SignInScreen
        onBack={() => setAuthState('welcome')}
        onSuccess={() => {
          setAuthState('authenticated');
          notify(`Welcome back, ${profile.name}`);
        }}
        onSignUp={() => setAuthState('signup')}
      />
    );
  }

  if (authState === 'profile') {
    return (
      <ProfileSetupScreen
        initialProfile={profile}
        onSave={(updated) => {
          setProfile(updated);
          setAuthState('authenticated');
          notify('Profile preferences saved');
        }}
        onBack={() => setAuthState('authenticated')}
      />
    );
  }

  // 2. Deep Dive Overlays
  if (activeDeepDive === 'distance') {
    return <DistanceDeepDive onBack={() => setActiveDeepDive(null)} />;
  }

  if (activeDeepDive === 'sprints') {
    return <SprintsDeepDive onBack={() => setActiveDeepDive(null)} />;
  }

  if (activeDeepDive === 'heart_rate') {
    return <HeartRateDeepDive onBack={() => setActiveDeepDive(null)} />;
  }

  if (activeDeepDive === 'recovery') {
    return <RecoveryDeepDive onBack={() => setActiveDeepDive(null)} />;
  }

  // 3. Main Authenticated App View with fixed 5-Tab Navigation Bar
  return (
    <div className="relative min-h-full flex flex-col bg-white text-[#132216]">
      {/* Scrollable Viewport Canvas */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <HomeScreen
            profile={profile}
            workouts={workouts}
            onOpenLive={() => setActiveTab('live')}
            onOpenSetGoal={() => setIsSetGoalOpen(true)}
            onOpenDeepDive={(metric) => setActiveDeepDive(metric)}
            onOpenHistory={() => setActiveTab('history')}
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisScreen
            onOpenDeepDive={(metric) => setActiveDeepDive(metric)}
          />
        )}

        {activeTab === 'live' && (
          <LiveSessionScreen
            onFinishSession={handleFinishLiveSession}
          />
        )}

        {activeTab === 'history' && (
          <HistoryScreen
            workouts={workouts}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen
            profile={profile}
            onEditProfile={() => setAuthState('profile')}
            onReplayOnboarding={() => setAuthState('welcome')}
            onSignOut={() => {
              setAuthState('welcome');
              notify('Signed out from SupaTrack');
            }}
          />
        )}
      </div>

      {/* Fixed 5-Tab Bottom Navigation Bar */}
      <ConsumerBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveDeepDive(null);
        }}
        isLiveTrackingActive={activeTab === 'live'}
      />

      {/* Goal Setting Modal */}
      <SetGoalModal
        isOpen={isSetGoalOpen}
        onClose={() => setIsSetGoalOpen(false)}
        currentGoalKm={profile.weeklyGoalKm}
        onSaveGoal={handleGoalSave}
      />
    </div>
  );
};

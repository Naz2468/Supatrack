export interface ConsumerProfile {
  name: string;
  email: string;
  sport: string;
  avatar: string;
  weightKg: number;
  heightCm: number;
  restingHr: number;
  maxHr: number;
  weeklyGoalKm: number;
  membershipTier: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  type: 'run' | 'cycle' | 'trail' | 'hiit';
  date: string;
  timeAgo: string;
  distanceKm: number;
  durationMinutes: number;
  avgPace: string;
  avgHr: number;
  maxHr: number;
  caloriesBurned: number;
  elevationM: number;
  sprintsCount: number;
  routeTitle: string;
}

export interface DailyLoad {
  day: string;
  dateStr: string;
  distanceKm: number;
  activeMinutes: number;
  calories: number;
  completed: boolean;
}

export const INITIAL_CONSUMER_PROFILE: ConsumerProfile = {
  name: 'Alex Vance',
  email: 'alex.vance@retrowaves.fit',
  sport: 'Solo Running & Trail',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  weightKg: 68,
  heightCm: 178,
  restingHr: 52,
  maxHr: 194,
  weeklyGoalKm: 40.0,
  membershipTier: 'SupaTrack Pro Athlete',
};

export const WEEKLY_DAYS: DailyLoad[] = [
  { day: 'Mon', dateStr: 'Oct 06', distanceKm: 6.2, activeMinutes: 32, calories: 430, completed: true },
  { day: 'Tue', dateStr: 'Oct 07', distanceKm: 8.4, activeMinutes: 44, calories: 590, completed: true },
  { day: 'Wed', dateStr: 'Oct 08', distanceKm: 5.1, activeMinutes: 28, calories: 360, completed: true },
  { day: 'Thu', dateStr: 'Oct 09', distanceKm: 9.5, activeMinutes: 51, calories: 680, completed: true },
  { day: 'Fri', dateStr: 'Oct 10', distanceKm: 0.0, activeMinutes: 15, calories: 120, completed: true }, // Rest & Stretch
  { day: 'Sat', dateStr: 'Oct 11', distanceKm: 7.4, activeMinutes: 38, calories: 520, completed: true }, // Today
  { day: 'Sun', dateStr: 'Oct 12', distanceKm: 4.0, activeMinutes: 22, calories: 280, completed: false }, // Scheduled
];

export const WORKOUT_HISTORY: WorkoutSession[] = [
  {
    id: 'w-1',
    title: 'Morning Coastal Tempo Run',
    type: 'run',
    date: 'Today, Oct 11 • 7:15 AM',
    timeAgo: '4 hours ago',
    distanceKm: 7.4,
    durationMinutes: 38,
    avgPace: "5'08\"/km",
    avgHr: 152,
    maxHr: 178,
    caloriesBurned: 520,
    elevationM: 64,
    sprintsCount: 6,
    routeTitle: 'Bay Boardwalk Circuit',
  },
  {
    id: 'w-2',
    title: 'Sunset Interval Cadence Work',
    type: 'run',
    date: 'Thu, Oct 09 • 6:40 PM',
    timeAgo: '2 days ago',
    distanceKm: 9.5,
    durationMinutes: 51,
    avgPace: "4'52\"/km",
    avgHr: 158,
    maxHr: 184,
    caloriesBurned: 680,
    elevationM: 88,
    sprintsCount: 11,
    routeTitle: 'Greenfield Athletic Trail',
  },
  {
    id: 'w-3',
    title: 'Midweek Aerobic Base Jog',
    type: 'run',
    date: 'Wed, Oct 08 • 7:30 AM',
    timeAgo: '3 days ago',
    distanceKm: 5.1,
    durationMinutes: 28,
    avgPace: "5'29\"/km",
    avgHr: 141,
    maxHr: 156,
    caloriesBurned: 360,
    elevationM: 32,
    sprintsCount: 2,
    routeTitle: 'Riverside Loop',
  },
  {
    id: 'w-4',
    title: 'Threshold Sprints & Incline',
    type: 'run',
    date: 'Tue, Oct 07 • 6:15 PM',
    timeAgo: '4 days ago',
    distanceKm: 8.4,
    durationMinutes: 44,
    avgPace: "4'48\"/km",
    avgHr: 162,
    maxHr: 188,
    caloriesBurned: 590,
    elevationM: 112,
    sprintsCount: 9,
    routeTitle: 'Hilltop Park Perimeter',
  },
  {
    id: 'w-5',
    title: 'Easy Monday Warmup Run',
    type: 'run',
    date: 'Mon, Oct 06 • 8:00 AM',
    timeAgo: '5 days ago',
    distanceKm: 6.2,
    durationMinutes: 32,
    avgPace: "5'10\"/km",
    avgHr: 144,
    maxHr: 160,
    caloriesBurned: 430,
    elevationM: 45,
    sprintsCount: 3,
    routeTitle: 'Pine Avenue Pathway',
  },
];

export const HEART_RATE_ZONES = [
  { zone: 'Zone 5', name: 'Anaerobic Max', range: '> 174 bpm', minutes: 14, color: '#EF4444', pct: 8 },
  { zone: 'Zone 4', name: 'Threshold Speed', range: '158 - 173 bpm', minutes: 36, color: '#F97316', pct: 21 },
  { zone: 'Zone 3', name: 'Aerobic Pace', range: '142 - 157 bpm', minutes: 78, color: '#16A34A', pct: 45 },
  { zone: 'Zone 2', name: 'Fat Burning Base', range: '124 - 141 bpm', minutes: 32, color: '#3B82F6', pct: 18 },
  { zone: 'Zone 1', name: 'Active Recovery', range: '< 124 bpm', minutes: 14, color: '#10B981', pct: 8 },
];

export const SPRINT_INTERVALS = [
  { interval: '1', speedKmh: 28.4, durationSec: 5.2, accelMs2: 3.4 },
  { interval: '2', speedKmh: 31.2, durationSec: 6.1, accelMs2: 3.9 },
  { interval: '3', speedKmh: 32.4, durationSec: 7.0, accelMs2: 4.1 }, // Peak
  { interval: '4', speedKmh: 29.8, durationSec: 5.8, accelMs2: 3.6 },
  { interval: '5', speedKmh: 30.6, durationSec: 6.4, accelMs2: 3.8 },
  { interval: '6', speedKmh: 27.9, durationSec: 4.9, accelMs2: 3.2 },
];

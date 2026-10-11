export interface SparklinePoint {
  time: string;
  bpm: number;
}

export interface MatchDecayPoint {
  minute: string;
  outputPct: number; // 100 down to 72
  workRate: number; // km/h
  intensity: 'High' | 'Normal' | 'Fatigue';
}

export interface ImuBiomechanics {
  sensorModel: string; // 'MPU6050 6-Axis IMU (200Hz)'
  baselineFootedness: string; // 'Dominant Right (51% L / 49% R)'
  currentLeftPct: number; // e.g. 56
  currentRightPct: number; // e.g. 44
  deviationPct: number; // e.g. 12
  status: 'Nominal' | 'Warning' | 'Critical';
  warningMessage?: string;
  groundContactTimeMs: number; // e.g. 195ms
  impactGForce: number; // e.g. 3.4G
}

export interface SupaRatingBreakdown {
  overallScore: number; // 0 - 100
  roleTitle: string; // 'Inverted Winger Protocol'
  primaryTrait1: { name: string; score: number };
  primaryTrait2: { name: string; score: number };
  primaryTrait3: { name: string; score: number };
  tacticalEfficiency: number;
}

export interface SquadMemberHealth {
  id: string;
  number: number;
  name: string;
  position: string;
  positionGroup: 'FW' | 'MF' | 'DF' | 'GK';
  academyOrigin: string;
  heartRate: number;
  maxHeartRate: number;
  recoveryScore: number;
  strainScore: number; // e.g. 18.2 / 21
  fatigueStatus: 'Optimal' | 'Caution' | 'Substitution Recommended';
  sprintCount: number; // >20 km/h
  topSpeedKmh: number;
  distanceCoveredKm: number;
  sprintAvgKmh: number;
  batteryPct: number;
  pitchX?: number; // 0-100% horizontal coordinate on pitch
  pitchY?: number; // 0-100% vertical coordinate on pitch
  supaRating: SupaRatingBreakdown;
  imu: ImuBiomechanics;
  subAlert?: string;
}

export interface TacticalClip {
  id: string;
  title: string;
  minute: string;
  sender: string;
  role: string;
  duration: string;
  summary: string;
  tags: string[];
  reviewed: boolean;
}

export interface CoachNote {
  id: string;
  author: string;
  role: string;
  time: string;
  message: string;
  priority: 'normal' | 'urgent';
  unread: boolean;
}

export const HEART_RATE_SPARKLINE: SparklinePoint[] = [
  { time: '10m', bpm: 124 },
  { time: '20m', bpm: 136 },
  { time: '30m', bpm: 148 },
  { time: '40m', bpm: 142 },
  { time: '50m', bpm: 156 },
  { time: '60m', bpm: 162 },
  { time: '70m', bpm: 149 },
  { time: '76m', bpm: 142 },
];

export const MATCH_OUTPUT_DECAY: MatchDecayPoint[] = [
  { minute: "0'", outputPct: 100, workRate: 5.4, intensity: 'High' },
  { minute: "15'", outputPct: 97, workRate: 5.2, intensity: 'High' },
  { minute: "30'", outputPct: 93, workRate: 4.9, intensity: 'High' },
  { minute: "45'", outputPct: 88, workRate: 4.6, intensity: 'Normal' },
  { minute: "60'", outputPct: 84, workRate: 4.3, intensity: 'Normal' },
  { minute: "75'", outputPct: 78, workRate: 3.9, intensity: 'Fatigue' },
  { minute: "90'", outputPct: 72, workRate: 3.6, intensity: 'Fatigue' },
];

export const MATCHDAY_TRENDS = [
  { matchday: 'MD1 (Sep 18)', score: '91%', distance: '112.4 km', result: 'W 2-0' },
  { matchday: 'MD2 (Sep 26)', score: '88%', distance: '115.1 km', result: 'D 1-1' },
  { matchday: 'MD3 (Oct 09)', score: '84%', distance: '114.2 km', result: 'Live 76\'' },
];

export const SQUAD_MEMBERS: SquadMemberHealth[] = [
  {
    id: 'p7',
    number: 7,
    name: 'Mateo Alvarez',
    position: 'Right Wing',
    positionGroup: 'FW',
    academyOrigin: 'La Masia',
    heartRate: 184,
    maxHeartRate: 196,
    recoveryScore: 61,
    strainScore: 18.4,
    fatigueStatus: 'Substitution Recommended',
    sprintCount: 31,
    topSpeedKmh: 34.8,
    distanceCoveredKm: 9.84,
    sprintAvgKmh: 4.8,
    batteryPct: 88,
    pitchX: 80,
    pitchY: 82,
    supaRating: {
      overallScore: 88,
      roleTitle: 'Winger Protocol',
      primaryTrait1: { name: 'Burst Speed', score: 94 },
      primaryTrait2: { name: 'Final 3rd', score: 89 },
      primaryTrait3: { name: 'Recovery', score: 62 },
      tacticalEfficiency: 86.5,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Right Bias (49/51)',
      currentLeftPct: 56,
      currentRightPct: 44,
      deviationPct: 12,
      status: 'Warning',
      warningMessage: '⚠️ 12% Left Asymmetry. Sub advised.',
      groundContactTimeMs: 218,
      impactGForce: 3.8,
    },
    subAlert: 'Sprint drop-off. 12% left asymmetry. Sub advised.',
  },
  {
    id: 'p9',
    number: 9,
    name: 'Viktor Thorne',
    position: 'Center Forward',
    positionGroup: 'FW',
    academyOrigin: 'Ajax De Toekomst',
    heartRate: 156,
    maxHeartRate: 192,
    recoveryScore: 88,
    strainScore: 15.1,
    fatigueStatus: 'Optimal',
    sprintCount: 26,
    topSpeedKmh: 33.9,
    distanceCoveredKm: 10.12,
    sprintAvgKmh: 4.4,
    batteryPct: 92,
    pitchX: 84,
    pitchY: 50,
    supaRating: {
      overallScore: 91,
      roleTitle: 'Target Man Press & Box Acceleration',
      primaryTrait1: { name: 'Box Penetration', score: 93 },
      primaryTrait2: { name: 'Aerial Duel G-Force', score: 88 },
      primaryTrait3: { name: 'Pressing Workload', score: 91 },
      tacticalEfficiency: 92.0,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Neutral (50% L / 50% R)',
      currentLeftPct: 50.5,
      currentRightPct: 49.5,
      deviationPct: 1.0,
      status: 'Nominal',
      groundContactTimeMs: 192,
      impactGForce: 3.2,
    },
  },
  {
    id: 'p10',
    number: 10,
    name: 'Lucas De Silva',
    position: 'Attacking Mid',
    positionGroup: 'MF',
    academyOrigin: 'Sporting CP',
    heartRate: 168,
    maxHeartRate: 188,
    recoveryScore: 74,
    strainScore: 16.9,
    fatigueStatus: 'Caution',
    sprintCount: 22,
    topSpeedKmh: 31.4,
    distanceCoveredKm: 11.45,
    sprintAvgKmh: 4.3,
    batteryPct: 85,
    pitchX: 62,
    pitchY: 68,
    supaRating: {
      overallScore: 86,
      roleTitle: 'Advanced Playmaker Line-Breaking',
      primaryTrait1: { name: 'Between-Line Runs', score: 90 },
      primaryTrait2: { name: 'Turn Accelerations', score: 84 },
      primaryTrait3: { name: 'Stamina Retention', score: 78 },
      tacticalEfficiency: 87.8,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Left Bias (52% L / 48% R)',
      currentLeftPct: 53.5,
      currentRightPct: 46.5,
      deviationPct: 3.0,
      status: 'Nominal',
      groundContactTimeMs: 201,
      impactGForce: 2.9,
    },
    subAlert: 'High cumulative distance (11.45 km). Monitor aerobic fatigue past min 80.',
  },
  {
    id: 'p6',
    number: 6,
    name: 'Kofi Mensah',
    position: 'Defensive Mid',
    positionGroup: 'MF',
    academyOrigin: 'Supremos Youth Elite',
    heartRate: 164,
    maxHeartRate: 189,
    recoveryScore: 92,
    strainScore: 14.6,
    fatigueStatus: 'Optimal',
    sprintCount: 19,
    topSpeedKmh: 31.2,
    distanceCoveredKm: 11.62,
    sprintAvgKmh: 4.2,
    batteryPct: 90,
    pitchX: 45,
    pitchY: 50,
    supaRating: {
      overallScore: 93,
      roleTitle: 'CDM Recovery Speed & Workload Consistency',
      primaryTrait1: { name: 'Transition Recovery', score: 96 },
      primaryTrait2: { name: 'Workload Uniformity', score: 94 },
      primaryTrait3: { name: 'Lateral Interception', score: 89 },
      tacticalEfficiency: 94.2,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Neutral (50% L / 50% R)',
      currentLeftPct: 49.8,
      currentRightPct: 50.2,
      deviationPct: 0.4,
      status: 'Nominal',
      groundContactTimeMs: 188,
      impactGForce: 3.0,
    },
  },
  {
    id: 'p8',
    number: 8,
    name: 'Declan O\'Connor',
    position: 'Box-to-Box Mid',
    positionGroup: 'MF',
    academyOrigin: 'Cobham Academy',
    heartRate: 145,
    maxHeartRate: 185,
    recoveryScore: 94,
    strainScore: 14.2,
    fatigueStatus: 'Optimal',
    sprintCount: 20,
    topSpeedKmh: 30.8,
    distanceCoveredKm: 12.18,
    sprintAvgKmh: 4.1,
    batteryPct: 94,
    pitchX: 58,
    pitchY: 32,
    supaRating: {
      overallScore: 90,
      roleTitle: 'Central Engine & Spatial Coverage',
      primaryTrait1: { name: 'Aerobic Reserve', score: 97 },
      primaryTrait2: { name: 'Second-Ball Press', score: 88 },
      primaryTrait3: { name: 'Symmetry Load', score: 92 },
      tacticalEfficiency: 91.4,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Right Bias (48% L / 52% R)',
      currentLeftPct: 48.5,
      currentRightPct: 51.5,
      deviationPct: 1.0,
      status: 'Nominal',
      groundContactTimeMs: 194,
      impactGForce: 2.8,
    },
  },
  {
    id: 'p3',
    number: 3,
    name: 'Tariq Benali',
    position: 'Left Back',
    positionGroup: 'DF',
    academyOrigin: 'Carrington',
    heartRate: 172,
    maxHeartRate: 194,
    recoveryScore: 68,
    strainScore: 17.5,
    fatigueStatus: 'Caution',
    sprintCount: 24,
    topSpeedKmh: 33.7,
    distanceCoveredKm: 10.89,
    sprintAvgKmh: 4.5,
    batteryPct: 86,
    pitchX: 28,
    pitchY: 16,
    supaRating: {
      overallScore: 84,
      roleTitle: 'Flank Overlap & High-Sprint Recovery',
      primaryTrait1: { name: 'Wing Overlaps', score: 89 },
      primaryTrait2: { name: 'Defensive Recovery', score: 81 },
      primaryTrait3: { name: 'Sprint Repeat', score: 74 },
      tacticalEfficiency: 83.2,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Left Bias (53% L / 47% R)',
      currentLeftPct: 56.2,
      currentRightPct: 43.8,
      deviationPct: 6.4,
      status: 'Nominal',
      groundContactTimeMs: 204,
      impactGForce: 3.5,
    },
  },
  {
    id: 'p4',
    number: 4,
    name: 'Joaquim Ramos',
    position: 'Center Back',
    positionGroup: 'DF',
    academyOrigin: 'Sporting CP',
    heartRate: 138,
    maxHeartRate: 182,
    recoveryScore: 94,
    strainScore: 12.1,
    fatigueStatus: 'Optimal',
    sprintCount: 11,
    topSpeedKmh: 31.9,
    distanceCoveredKm: 9.24,
    sprintAvgKmh: 3.8,
    batteryPct: 97,
    supaRating: {
      overallScore: 92,
      roleTitle: 'Central Anchor & Aerial Interception',
      primaryTrait1: { name: 'Aerial Balance', score: 95 },
      primaryTrait2: { name: 'Sprint Recovery', score: 88 },
      primaryTrait3: { name: 'Gait Stability', score: 96 },
      tacticalEfficiency: 93.8,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Neutral (50% L / 50% R)',
      currentLeftPct: 50.1,
      currentRightPct: 49.9,
      deviationPct: 0.2,
      status: 'Nominal',
      groundContactTimeMs: 182,
      impactGForce: 3.1,
    },
    pitchX: 24,
    pitchY: 38,
  },
  {
    id: 'p1',
    number: 1,
    name: 'David Costa',
    position: 'Goalkeeper',
    positionGroup: 'GK',
    academyOrigin: 'Benfica Seixal',
    heartRate: 122,
    maxHeartRate: 170,
    recoveryScore: 98,
    strainScore: 8.5,
    fatigueStatus: 'Optimal',
    sprintCount: 4,
    topSpeedKmh: 24.2,
    distanceCoveredKm: 4.85,
    sprintAvgKmh: 3.1,
    batteryPct: 96,
    pitchX: 9,
    pitchY: 50,
    supaRating: {
      overallScore: 89,
      roleTitle: 'Sweeper Keeper Distribution',
      primaryTrait1: { name: 'Box Control', score: 92 },
      primaryTrait2: { name: 'Long Distribution', score: 88 },
      primaryTrait3: { name: 'Reaction Speed', score: 94 },
      tacticalEfficiency: 91.0,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Right Bias (50/50)',
      currentLeftPct: 50.0,
      currentRightPct: 50.0,
      deviationPct: 0.0,
      status: 'Nominal',
      groundContactTimeMs: 175,
      impactGForce: 2.1,
    },
  },
  {
    id: 'p5',
    number: 5,
    name: 'Gabriel Silva',
    position: 'Center Back',
    positionGroup: 'DF',
    academyOrigin: 'Santos Academy',
    heartRate: 142,
    maxHeartRate: 184,
    recoveryScore: 91,
    strainScore: 13.0,
    fatigueStatus: 'Optimal',
    sprintCount: 14,
    topSpeedKmh: 32.1,
    distanceCoveredKm: 9.40,
    sprintAvgKmh: 3.9,
    batteryPct: 93,
    pitchX: 24,
    pitchY: 62,
    supaRating: {
      overallScore: 88,
      roleTitle: 'Covering Defender & Diagonal Outlet',
      primaryTrait1: { name: 'Interception Pace', score: 90 },
      primaryTrait2: { name: 'Physical Duel', score: 92 },
      primaryTrait3: { name: 'Progression Pass', score: 84 },
      tacticalEfficiency: 89.4,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Right Bias (51/49)',
      currentLeftPct: 50.6,
      currentRightPct: 49.4,
      deviationPct: 1.2,
      status: 'Nominal',
      groundContactTimeMs: 189,
      impactGForce: 3.3,
    },
  },
  {
    id: 'p2',
    number: 2,
    name: 'Marcus Walker',
    position: 'Right Back',
    positionGroup: 'DF',
    academyOrigin: 'Man City Academy',
    heartRate: 162,
    maxHeartRate: 191,
    recoveryScore: 82,
    strainScore: 16.4,
    fatigueStatus: 'Optimal',
    sprintCount: 23,
    topSpeedKmh: 34.1,
    distanceCoveredKm: 10.72,
    sprintAvgKmh: 4.4,
    batteryPct: 89,
    pitchX: 30,
    pitchY: 84,
    supaRating: {
      overallScore: 87,
      roleTitle: 'Recovery Fullback Flank Lockdown',
      primaryTrait1: { name: 'Sprint Recovery', score: 93 },
      primaryTrait2: { name: '1v1 Containment', score: 88 },
      primaryTrait3: { name: 'Support Overlap', score: 82 },
      tacticalEfficiency: 86.9,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Right Bias (52/48)',
      currentLeftPct: 51.4,
      currentRightPct: 48.6,
      deviationPct: 2.8,
      status: 'Nominal',
      groundContactTimeMs: 196,
      impactGForce: 3.4,
    },
  },
  {
    id: 'p11',
    number: 11,
    name: 'Leo Rossi',
    position: 'Left Wing',
    positionGroup: 'FW',
    academyOrigin: 'Atalanta Zingonia',
    heartRate: 174,
    maxHeartRate: 195,
    recoveryScore: 71,
    strainScore: 17.8,
    fatigueStatus: 'Caution',
    sprintCount: 28,
    topSpeedKmh: 34.2,
    distanceCoveredKm: 10.15,
    sprintAvgKmh: 4.7,
    batteryPct: 84,
    pitchX: 76,
    pitchY: 18,
    supaRating: {
      overallScore: 89,
      roleTitle: 'Direct Winger Cut-Inside Velocity',
      primaryTrait1: { name: 'Take-On Burst', score: 92 },
      primaryTrait2: { name: 'Dribble Velocity', score: 91 },
      primaryTrait3: { name: 'Final Ball', score: 85 },
      tacticalEfficiency: 88.0,
    },
    imu: {
      sensorModel: 'MPU6050 6-Axis IMU (200Hz)',
      baselineFootedness: 'Right Bias (51/49)',
      currentLeftPct: 53.0,
      currentRightPct: 47.0,
      deviationPct: 4.0,
      status: 'Nominal',
      groundContactTimeMs: 202,
      impactGForce: 3.6,
    },
    subAlert: 'High sprint volume (28). Elevated cardiac strain.',
  },
];

export const TACTICAL_CLIPS: TacticalClip[] = [
  {
    id: 'clip-1',
    title: '68\' Flank Deceleration Decay',
    minute: "68'",
    sender: 'Dr. Vance (Sports Science)',
    role: 'Biomechanics Lead',
    duration: '0:24',
    summary: 'Sprint velocity dropped from 34.8 km/h to 22.4 km/h with 12% left limb loading bias. Sub advised to avoid acute hamstring strain.',
    tags: ['Velocity Decay', '+12% Stride Bias', 'High Risk'],
    reviewed: false,
  },
  {
    id: 'clip-2',
    title: '42\' High Press Recovery Run',
    minute: "42'",
    sender: 'Coach Bell (Tactical Lead)',
    role: 'Head Coach',
    duration: '0:35',
    summary: 'Elite recovery angle cutting off the half-space passing lane. Sustained 31.2 km/h across 48 meters.',
    tags: ['Counter-Press', 'Work Rate', 'Optimal'],
    reviewed: true,
  },
  {
    id: 'clip-3',
    title: '19\' Final Third Penetration & Shot',
    minute: "19'",
    sender: 'Coach Bell (Tactical Lead)',
    role: 'Head Coach',
    duration: '0:18',
    summary: 'Match-peak sprint burst recorded at 34.8 km/h (#1 across both squads). Excellent separation.',
    tags: ['Peak Sprint #1', 'Box Penetration', 'Benchmark'],
    reviewed: true,
  },
];

export const COACH_NOTES: CoachNote[] = [
  {
    id: 'c1',
    author: 'Dr. Vance',
    role: 'Sports Science',
    time: '3m ago',
    message: '#7 Alvarez: 12% left stride imbalance. Sub advised before 80\'.',
    priority: 'urgent',
    unread: true,
  },
  {
    id: 'c2',
    author: 'Coach Bell',
    role: 'Tactical Lead',
    time: '18m ago',
    message: '#6 Mensah: Supa Rating 93. Elite coverage, nominal gait.',
    priority: 'normal',
    unread: true,
  },
  {
    id: 'c3',
    author: 'Dr. Vance',
    role: 'Sports Science',
    time: 'HT',
    message: '2nd-half IMU baselines calibrated. All nominal.',
    priority: 'normal',
    unread: false,
  },
];

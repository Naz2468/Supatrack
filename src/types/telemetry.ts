export type PlayerPosition = 'FW' | 'W' | 'CAM' | 'CM' | 'CDM' | 'CB' | 'LB' | 'RB' | 'GK';
export type PositionGroup = 'Forwards' | 'Midfielders' | 'Defenders' | 'Goalkeepers';
export type PlayerStatus = 'Optimal' | 'Monitor' | 'Sub-Recommended';

export interface PlayerTelemetry {
  id: string;
  number: number;
  name: string;
  nickname?: string;
  position: PlayerPosition;
  positionGroup: PositionGroup;
  academyOrigin: string;
  totalDistanceMeters: number; // in meters (e.g. 10450)
  sprintCount: number; // >20 km/h
  highIntensityDistanceMeters: number; // >25 km/h distance in meters
  maxSpeedKmh: number; // e.g. 34.2
  currentHeartRate: number; // bpm
  maxHeartRate: number; // bpm
  hrZone: 1 | 2 | 3 | 4 | 5; // Heart rate zone
  recoveryRateScore: number; // % HRR (Heart Rate Recovery index)
  fatigueIndex: number; // 0-100 (higher = more fatigued)
  acwr: number; // Acute:Chronic Workload Ratio (e.g. 1.15)
  status: PlayerStatus;
  statusReason?: string;
  vestBattery: number; // %
  gpsSignal: 'Strong' | 'Nominal' | 'Calibrating';
  activeMinutes: number;
  avatarUrl?: string;
}

export interface MatchFatigueDataPoint {
  minute: number; // 0 to 90
  half: '1st' | '2nd';
  firstHalfSpeed: number; // avg team speed in km/h
  secondHalfSpeed: number; // avg team speed in km/h
  firstHalfWorkRate: number; // metabolic power W/kg
  secondHalfWorkRate: number; // metabolic power W/kg
  fatigueDecayPct: number; // % drop from peak baseline
  highIntensityRuns: number;
}

export interface PositionSprintStats {
  positionGroup: PositionGroup;
  countHighSpeed: number; // 20 - 25 km/h
  countMaxSprint: number; // > 25 km/h
  targetBaseline: number;
  totalAvgDistanceKm: number;
}

export interface MatchKpis {
  totalDistanceKm: number;
  distanceDeltaPct: number;
  highIntensitySprints: number;
  sprintsDeltaPct: number;
  avgWorkRateScore: number;
  fatigueFlagsCount: number;
  tacticalExecutionScore: number;
  pressingEfficiencyPct: number;
}

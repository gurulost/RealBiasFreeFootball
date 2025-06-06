export interface RankingData {
  id: number;
  rank: number;
  rating: string;
  deltaRank: number | null;
  qualityWins: string[] | null;
  record: string | null;
  season: number;
  week: number;
  trackType: 'live' | 'retro';
  teamId: number;
  team?: {
    id: number;
    school: string;
    mascot: string | null;
    abbreviation: string | null;
    conference: string | null;
    color: string | null;
    alternateColor: string | null;
  };
}

export interface ConferenceStrengthData {
  id: number;
  conference: string;
  strength: string;
  biasMetric: string | null;
  season: number;
  week: number;
}

export interface BiasAuditData {
  id: number;
  biasMetric: string;
  maxDeviation: string | null;
  isWithinTarget: boolean;
  autoTuneTriggered: boolean;
  season: number;
  week: number;
  createdAt: Date;
}

export interface SystemStatus {
  currentWeek: number;
  currentSeason: number;
  biasMetric: number;
  systemStatus: string;
  lastUpdate: string;
  totalTeams: number;
  liveRankingsCount: number;
  retroRankingsCount: number;
}

export interface AlgorithmParameters {
  id: number;
  season: number;
  marginCap: number;
  decayLambda: string;
  shrinkageK: number;
  winProbC: string;
  riskElasticity: string;
  surpriseGamma: string;
  surpriseCap: number;
  bowlBonus: string;
  pagerankDamping: string;
  frozenAt: Date | null;
}

export interface ScoutCandidate {
  objectName: string;
  nObs: number;

  // Observation and orbit information
  arc: string;
  rmsN: string;
  moid: string;
  caDist: string | null;
  vInf: string | null;

  // Physical and observation details
  H: string;
  Vmag: string;
  ra: string;
  dec: string;
  elong: string;
  rate: string;

  // Uncertainty information
  unc: string;
  uncP1: string;

  // Scout scores
  rating: number;
  phaScore: number;
  neoScore: number;
  neo1kmScore: number;
  geocentricScore: number;
  ieoScore: number;
  tisserandScore: number;

  // Timestamps
  lastRun: string;
  tEphem: string;
}

export interface ScoutApiSignature {
  source: string;
  version: string;
}

export interface ScoutApiResponse {
  data: ScoutCandidate[];
  count: string;
  signature: ScoutApiSignature;
  error?: string;
}

export function getHighestRiskIndicator(candidate: ScoutCandidate): number {
  return Math.max(candidate.phaScore, candidate.neoScore);
}

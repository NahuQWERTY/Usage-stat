
export type Position = 'Forward' | 'Winger' | 'Midfielder' | 'Defender';

export interface PlayerRaw {
  id: string;
  name: string;
  team: string;
  position: Position;
  minutes_played: number;
  passes_attempted: number;
  progressive_carries: number;
  shots: number;
  turnovers: number; // dispossessed + miscontrols
  xg: number;
  xa: number;
  teamColor: string;
}

export type Archetype = 'Superstar' | 'Assassin' | 'Black Hole' | 'Passenger';

export interface ProcessedPlayer extends PlayerRaw {
  buPercent: number;
  pur: number;
  uer: number;
  archetype: Archetype;
}

export const POSITION_BASELINES: Record<Position, number> = {
  Forward: 0.04,
  Winger: 0.09,
  Midfielder: 0.11,
  Defender: 0.06
};

export const TEAM_TOTAL_ACTIONS = 600;

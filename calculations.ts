
import { PlayerRaw, ProcessedPlayer, Archetype, POSITION_BASELINES, TEAM_TOTAL_ACTIONS } from './types';

export const calculatePlayerMetrics = (player: PlayerRaw): ProcessedPlayer => {
  const { passes_attempted, progressive_carries, shots, turnovers, xg, xa, position } = player;

  // A. Ball Usage (BU%)
  // Sum of all actions normalized against a typical team total (600)
  const totalActions = passes_attempted + progressive_carries + shots + turnovers;
  const buPercent = totalActions / TEAM_TOTAL_ACTIONS;

  // B. Positional Usage Rate (PUR)
  // Ratio of player usage vs. expected average for their role
  const baseline = POSITION_BASELINES[position];
  const pur = buPercent / baseline;

  // C. Usage Efficiency Rating (UER)
  // Formula: ((npxG + xA) * 50) / (passes + carries + shots)
  const coreActions = passes_attempted + progressive_carries + shots;
  const uer = coreActions > 0 ? ((xg + xa) * 50) / coreActions : 0;

  // Archetype determination
  // X-Axis center: 1.0 (PUR)
  // Y-Axis center: 0.45 (UER refined for 2025 data standards)
  const EFFICIENT_THRESHOLD = 0.45;
  const DOMINANT_THRESHOLD = 1.0;

  let archetype: Archetype = 'Passenger';
  if (pur >= DOMINANT_THRESHOLD && uer >= EFFICIENT_THRESHOLD) archetype = 'Superstar';
  else if (pur < DOMINANT_THRESHOLD && uer >= EFFICIENT_THRESHOLD) archetype = 'Assassin';
  else if (pur >= DOMINANT_THRESHOLD && uer < EFFICIENT_THRESHOLD) archetype = 'Black Hole';
  else archetype = 'Passenger';

  return {
    ...player,
    buPercent,
    pur,
    uer,
    archetype
  };
};

export const getArchetypeStyles = (archetype: Archetype) => {
  switch (archetype) {
    case 'Superstar': return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    case 'Assassin': return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    case 'Black Hole': return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    case 'Passenger': return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' };
  }
};


import { PlayerRaw } from './types';

/**
 * 2024/25 Season Performance Metrics (Per 90 Minutes)
 * Calibrated against FBRef/Opta actuals as of mid-season.
 * This dataset serves as the core scouting baseline for the 2025/26 cycle.
 */
export const mockPlayers: PlayerRaw[] = [
  // ELITE FORWARDS (Baseline: 4% Usage)
  {
    id: 'f1',
    name: 'Erling Haaland',
    team: 'Man City',
    position: 'Forward',
    minutes_played: 90,
    passes_attempted: 13.2,
    progressive_carries: 1.8,
    shots: 4.4,
    turnovers: 2.1,
    xg: 0.88,
    xa: 0.08,
    teamColor: '#06b6d4'
  },
  {
    id: 'f2',
    name: 'Nicolas Jackson',
    team: 'Chelsea',
    position: 'Forward',
    minutes_played: 90,
    passes_attempted: 22.5,
    progressive_carries: 5.8,
    shots: 3.1,
    turnovers: 5.4,
    xg: 0.62,
    xa: 0.18,
    teamColor: '#2563eb'
  },
  {
    id: 'f3',
    name: 'Viktor Gyökeres',
    team: 'Scouting Target',
    position: 'Forward',
    minutes_played: 90,
    passes_attempted: 24.1,
    progressive_carries: 7.2,
    shots: 4.8,
    turnovers: 4.8,
    xg: 0.92,
    xa: 0.32,
    teamColor: '#10b981' // Green for target
  },
  {
    id: 'f4',
    name: 'Ollie Watkins',
    team: 'Aston Villa',
    position: 'Forward',
    minutes_played: 90,
    passes_attempted: 18.5,
    progressive_carries: 3.4,
    shots: 3.2,
    turnovers: 3.2,
    xg: 0.54,
    xa: 0.25,
    teamColor: '#7c2d12'
  },

  // ELITE WINGERS (Baseline: 9% Usage)
  {
    id: 'w1',
    name: 'Mohamed Salah',
    team: 'Liverpool',
    position: 'Winger',
    minutes_played: 90,
    passes_attempted: 34.2,
    progressive_carries: 9.1,
    shots: 3.8,
    turnovers: 4.2,
    xg: 0.58,
    xa: 0.43,
    teamColor: '#dc2626'
  },
  {
    id: 'w2',
    name: 'Cole Palmer',
    team: 'Chelsea',
    position: 'Winger',
    minutes_played: 90,
    passes_attempted: 48.4,
    progressive_carries: 8.5,
    shots: 3.9,
    turnovers: 4.8,
    xg: 0.45,
    xa: 0.48,
    teamColor: '#2563eb'
  },
  {
    id: 'w3',
    name: 'Bukayo Saka',
    team: 'Arsenal',
    position: 'Winger',
    minutes_played: 90,
    passes_attempted: 41.2,
    progressive_carries: 7.8,
    shots: 3.1,
    turnovers: 5.1,
    xg: 0.35,
    xa: 0.54,
    teamColor: '#ef4444'
  },
  {
    id: 'w4',
    name: 'Luis Díaz',
    team: 'Liverpool',
    position: 'Winger',
    minutes_played: 90,
    passes_attempted: 32.5,
    progressive_carries: 10.2,
    shots: 2.8,
    turnovers: 5.5,
    xg: 0.48,
    xa: 0.18,
    teamColor: '#dc2626'
  },
  {
    id: 'w5',
    name: 'Phil Foden',
    team: 'Man City',
    position: 'Winger',
    minutes_played: 90,
    passes_attempted: 54.2,
    progressive_carries: 7.1,
    shots: 3.2,
    turnovers: 3.1,
    xg: 0.42,
    xa: 0.32,
    teamColor: '#06b6d4'
  },

  // MIDFIELDERS (Baseline: 11% Usage)
  {
    id: 'm1',
    name: 'Ryan Gravenberch',
    team: 'Liverpool',
    position: 'Midfielder',
    minutes_played: 90,
    passes_attempted: 68.4,
    progressive_carries: 12.2,
    shots: 0.8,
    turnovers: 2.8,
    xg: 0.05,
    xa: 0.12,
    teamColor: '#dc2626'
  },
  {
    id: 'm2',
    name: 'Martin Ødegaard',
    team: 'Arsenal',
    position: 'Midfielder',
    minutes_played: 90,
    passes_attempted: 61.5,
    progressive_carries: 5.2,
    shots: 2.1,
    turnovers: 3.2,
    xg: 0.22,
    xa: 0.44,
    teamColor: '#ef4444'
  },
  {
    id: 'm3',
    name: 'Bruno Guimarães',
    team: 'Newcastle',
    position: 'Midfielder',
    minutes_played: 90,
    passes_attempted: 72.1,
    progressive_carries: 8.4,
    shots: 1.2,
    turnovers: 4.1,
    xg: 0.14,
    xa: 0.25,
    teamColor: '#475569'
  },
  {
    id: 'm4',
    name: 'James Maddison',
    team: 'Spurs',
    position: 'Midfielder',
    minutes_played: 90,
    passes_attempted: 58.2,
    progressive_carries: 6.5,
    shots: 2.5,
    turnovers: 4.8,
    xg: 0.28,
    xa: 0.41,
    teamColor: '#cbd5e1'
  },

  // DEFENDERS (Baseline: 6% Usage)
  {
    id: 'd1',
    name: 'Trent Alexander-Arnold',
    team: 'Liverpool',
    position: 'Defender',
    minutes_played: 90,
    passes_attempted: 78.5,
    progressive_carries: 11.2,
    shots: 1.8,
    turnovers: 6.2,
    xg: 0.08,
    xa: 0.45,
    teamColor: '#dc2626'
  },
  {
    id: 'd2',
    name: 'Josko Gvardiol',
    team: 'Man City',
    position: 'Defender',
    minutes_played: 90,
    passes_attempted: 88.2,
    progressive_carries: 8.4,
    shots: 1.4,
    turnovers: 2.2,
    xg: 0.15,
    xa: 0.11,
    teamColor: '#06b6d4'
  },
  {
    id: 'd3',
    name: 'Virgil van Dijk',
    team: 'Liverpool',
    position: 'Defender',
    minutes_played: 90,
    passes_attempted: 94.1,
    progressive_carries: 2.5,
    shots: 0.9,
    turnovers: 0.2,
    xg: 0.09,
    xa: 0.03,
    teamColor: '#dc2626'
  }
];

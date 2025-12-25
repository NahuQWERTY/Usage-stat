
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ProcessedPlayer } from '../types';
import { getArchetypeStyles } from '../calculations';

interface PlayerTableProps {
  players: ProcessedPlayer[];
}

type SortKey = keyof ProcessedPlayer | 'actions';

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  const [sortKey, setSortKey] = useState<SortKey>('pur');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let valA: any = a[sortKey as keyof ProcessedPlayer];
    let valB: any = b[sortKey as keyof ProcessedPlayer];

    if (sortKey === 'actions') {
      valA = a.passes_attempted + a.progressive_carries + a.shots;
      valB = b.passes_attempted + b.progressive_carries + b.shots;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/80 border-b border-slate-800">
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer group" onClick={() => handleSort('name')}>
              <div className="flex items-center gap-2">
                Player <SortIcon column="name" />
              </div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('team')}>
              <div className="flex items-center gap-2">
                Team <SortIcon column="team" />
              </div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('pur')}>
              <div className="flex items-center gap-2">
                Usage (PUR) <SortIcon column="pur" />
              </div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('uer')}>
              <div className="flex items-center gap-2">
                Efficiency (UER) <SortIcon column="uer" />
              </div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('xg')}>
              <div className="flex items-center gap-2">
                npxG+xA <SortIcon column="xg" />
              </div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('actions')}>
              <div className="flex items-center gap-2">
                Actions <SortIcon column="actions" />
              </div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Archetype</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {sortedPlayers.map((player) => {
            const styles = getArchetypeStyles(player.archetype);
            const totalActions = player.passes_attempted + player.progressive_carries + player.shots;
            return (
              <tr key={player.id} className="hover:bg-slate-900/40 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-slate-800 border border-slate-700 text-slate-400">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">{player.name}</div>
                      <div className="text-xs text-slate-500">{player.position}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">{player.team}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="text-sm font-bold text-slate-100 mono">{player.pur.toFixed(2)}x</div>
                   <div className="w-16 h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500" 
                        style={{ width: `${Math.min(player.pur * 50, 100)}%` }} 
                      />
                   </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-100 mono whitespace-nowrap">
                   {player.uer.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-100 mono whitespace-nowrap">
                   {(player.xg + player.xa).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-100 mono whitespace-nowrap">
                   {totalActions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles.bg} ${styles.color} border ${styles.border}`}>
                      {player.archetype}
                   </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;

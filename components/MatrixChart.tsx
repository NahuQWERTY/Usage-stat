
import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  ReferenceArea,
  Cell
} from 'recharts';
import { ProcessedPlayer } from '../types';
import { getArchetypeStyles } from '../calculations';

interface MatrixChartProps {
  data: ProcessedPlayer[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const player = payload[0].payload as ProcessedPlayer;
    const styles = getArchetypeStyles(player.archetype);

    return (
      <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[220px]">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{player.team}</p>
            <h4 className="text-base font-bold text-slate-100 leading-tight">{player.name}</h4>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${styles.bg} ${styles.color} border ${styles.border}`}>
            {player.archetype}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Usage (PUR)</p>
            <p className="text-sm font-bold text-slate-100 mono">{player.pur.toFixed(2)}x</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Efficiency (UER)</p>
            <p className="text-sm font-bold text-slate-100 mono">{player.uer.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">xG + xA (p90)</p>
            <p className="text-sm font-bold text-slate-100 mono">{(player.xg + player.xa).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Core Actions</p>
            <p className="text-sm font-bold text-slate-100 mono">{Math.round(player.passes_attempted + player.progressive_carries + player.shots)}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const MatrixChart: React.FC<MatrixChartProps> = ({ data }) => {
  const EFFICIENT_THRESHOLD = 0.4;
  const DOMINANT_THRESHOLD = 1.0;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        
        {/* Quadrant Areas - Domains slightly extended for clear view */}
        {/* Superstar - Top Right */}
        <ReferenceArea x1={DOMINANT_THRESHOLD} x2={2.5} y1={EFFICIENT_THRESHOLD} y2={3.0} fill="rgba(34, 197, 94, 0.05)" />
        {/* Assassin - Top Left */}
        <ReferenceArea x1={0} x2={DOMINANT_THRESHOLD} y1={EFFICIENT_THRESHOLD} y2={3.0} fill="rgba(59, 130, 246, 0.05)" />
        {/* Black Hole - Bottom Right */}
        <ReferenceArea x1={DOMINANT_THRESHOLD} x2={2.5} y1={0} y2={EFFICIENT_THRESHOLD} fill="rgba(239, 68, 68, 0.05)" />
        {/* Passenger - Bottom Left */}
        <ReferenceArea x1={0} x2={DOMINANT_THRESHOLD} y1={0} y2={EFFICIENT_THRESHOLD} fill="rgba(100, 116, 139, 0.05)" />

        <XAxis 
          type="number" 
          dataKey="pur" 
          name="Positional Usage Rate" 
          domain={[0, 2.2]}
          stroke="#475569"
          tick={{ fontSize: 11, fontWeight: 'bold' }}
          label={{ 
            value: 'BALL DOMINANCE (PUR)', 
            position: 'insideBottom', 
            offset: -25, 
            fill: '#64748b', 
            fontSize: 10, 
            fontWeight: 800,
            letterSpacing: 1
          }}
          ticks={[0, 0.5, 1.0, 1.5, 2.0]}
        />
        <YAxis 
          type="number" 
          dataKey="uer" 
          name="Efficiency Rating" 
          domain={[0, 2.6]}
          stroke="#475569"
          tick={{ fontSize: 11, fontWeight: 'bold' }}
          label={{ 
            value: 'OUTPUT EFFICIENCY (UER)', 
            angle: -90, 
            position: 'insideLeft', 
            fill: '#64748b', 
            fontSize: 10, 
            fontWeight: 800,
            letterSpacing: 1,
            offset: -15
          }}
        />
        <ZAxis type="number" dataKey="xg" range={[50, 450]} />
        
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#334155' }} />
        
        <ReferenceLine x={DOMINANT_THRESHOLD} stroke="#475569" strokeDasharray="5 5" strokeWidth={2} />
        <ReferenceLine y={EFFICIENT_THRESHOLD} stroke="#475569" strokeDasharray="5 5" strokeWidth={2} />

        <Scatter name="Players" data={data}>
          {data.map((player, index) => (
            <Cell 
              key={`cell-${player.id}`} 
              fill={player.teamColor} 
              stroke={player.teamColor} 
              strokeWidth={2}
              fillOpacity={0.6}
              style={{ filter: `drop-shadow(0 0 8px ${player.teamColor})` }}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MatrixChart;

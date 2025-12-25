
import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Search, 
  Filter, 
  ChevronDown, 
  Info, 
  Activity, 
  Target, 
  Zap, 
  AlertTriangle 
} from 'lucide-react';
import { mockPlayers } from './data';
import { calculatePlayerMetrics, getArchetypeStyles } from './calculations';
import { ProcessedPlayer, Position } from './types';
import MatrixChart from './components/MatrixChart';
import PlayerTable from './components/PlayerTable';

const App: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | 'All'>('All');
  const [selectedTeam, setSelectedTeam] = useState<string | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const processedData = useMemo(() => {
    return mockPlayers.map(calculatePlayerMetrics);
  }, []);

  const filteredData = useMemo(() => {
    return processedData.filter(player => {
      const posMatch = selectedPosition === 'All' || player.position === selectedPosition;
      const teamMatch = selectedTeam === 'All' || player.team === selectedTeam;
      const searchMatch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          player.team.toLowerCase().includes(searchTerm.toLowerCase());
      return posMatch && teamMatch && searchMatch;
    });
  }, [processedData, selectedPosition, selectedTeam, searchTerm]);

  const teams = Array.from(new Set(mockPlayers.map(p => p.team))).sort();
  const positions: (Position | 'All')[] = ['All', 'Forward', 'Winger', 'Midfielder', 'Defender'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-100">Ball Usage Analyzer</h1>
              <p className="text-xs font-medium text-slate-500 mono uppercase tracking-widest">2025/26 Scouting Cycle // Season 24/25 Actuals</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search player..."
                  className="bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none w-64 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="h-8 w-px bg-slate-800" />
             <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-400">STATUS</div>
                <div className="text-xs text-cyan-400 flex items-center gap-1.5 justify-end">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                   DATA_SYNC_P90
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-5 h-5 text-purple-400" />
              <Info className="w-4 h-4 text-slate-600" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">Positional Usage (PUR)</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-100 mono">1.0</span>
              <span className="text-xs text-slate-500 mono">BASELINE</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Relative ball dominance vs. positional average.</p>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              <Info className="w-4 h-4 text-slate-600" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">Output Efficiency (UER)</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-100 mono">0.45</span>
              <span className="text-xs text-slate-500 mono">ELITE THRESHOLD</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Combined xG+xA per core ball action.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <Info className="w-4 h-4 text-slate-600" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">Ball Control Penalty</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-100 mono">HIGH</span>
              <span className="text-xs text-slate-500 mono">IMPACT</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Turnovers (p90) are weighted as high-cost usage events.</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-6 text-slate-100 font-semibold">
                <Filter className="w-4 h-4" />
                Scouting Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Position Group</label>
                  <div className="flex flex-wrap gap-2">
                    {positions.map(pos => (
                      <button
                        key={pos}
                        onClick={() => setSelectedPosition(pos)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedPosition === pos 
                            ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Club Affiliate</label>
                  <select 
                    className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                  >
                    <option value="All">All Clubs</option>
                    {teams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Archetype Key</h4>
                  <div className="space-y-3">
                    {['Superstar', 'Assassin', 'Black Hole', 'Passenger'].map(arch => {
                      const styles = getArchetypeStyles(arch as any);
                      return (
                        <div key={arch} className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${styles.color.replace('text', 'bg')}`} />
                          <span className="text-xs font-medium text-slate-300">{arch}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Matrix Chart */}
          <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <BarChart className="w-64 h-64 text-slate-100" />
             </div>
             <div className="mb-6 flex justify-between items-start">
               <div>
                  <h2 className="text-lg font-bold text-slate-100">Usage vs. Efficiency Matrix</h2>
                  <p className="text-sm text-slate-500">Mapping the relationship between ball dominance and creative output.</p>
               </div>
               <div className="px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                  <span className="text-[10px] font-bold text-cyan-400 mono uppercase tracking-tighter">CYCLE_25_26 // LIVE_p90</span>
               </div>
             </div>
             <div className="h-[500px] w-full">
                <MatrixChart data={filteredData} />
             </div>
          </div>
        </div>

        {/* Player Ranking Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
           <div className="p-6 border-b border-slate-800 flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-100">Detailed Player Breakdown</h2>
             <span className="text-xs text-slate-500 italic">Showing {filteredData.length} records</span>
           </div>
           <PlayerTable players={filteredData} />
        </div>
      </main>

      <footer className="border-t border-slate-900 py-12 bg-slate-950 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-sm">
           <div className="flex items-center gap-2">
             <Activity className="w-5 h-5" />
             <span className="font-bold text-slate-500">MONEYBALL.IO</span>
           </div>
           <p>© 2025 Advanced Analytics Engine. Data sourced from mid-season 24/25 FBRef/Opta indices.</p>
           <div className="flex gap-6">
             <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-cyan-400 transition-colors">Methodology</a>
             <a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

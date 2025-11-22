'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Datos de ejemplo para la tabla de posiciones
const standings = [
  { position: 1, team: "Arsenal", logo: "🔴", played: 28, won: 20, drawn: 5, lost: 3, gf: 65, ga: 24, gd: 41, points: 65, form: ["W", "W", "W", "D", "W"] },
  { position: 2, team: "Manchester City", logo: "🔵", played: 28, won: 19, drawn: 6, lost: 3, gf: 68, ga: 28, gd: 40, points: 63, form: ["W", "D", "W", "W", "W"] },
  { position: 3, team: "Liverpool", logo: "🔴", played: 28, won: 18, drawn: 7, lost: 3, gf: 62, ga: 30, gd: 32, points: 61, form: ["W", "W", "D", "W", "L"] },
  { position: 4, team: "Aston Villa", logo: "🦁", played: 28, won: 17, drawn: 5, lost: 6, gf: 54, ga: 38, gd: 16, points: 56, form: ["W", "W", "L", "W", "D"] },
  { position: 5, team: "Tottenham", logo: "⚪", played: 28, won: 16, drawn: 6, lost: 6, gf: 59, ga: 42, gd: 17, points: 54, form: ["L", "W", "W", "D", "W"] },
  { position: 6, team: "Newcastle", logo: "⚫", played: 28, won: 15, drawn: 5, lost: 8, gf: 56, ga: 41, gd: 15, points: 50, form: ["W", "L", "W", "W", "D"] },
  { position: 7, team: "Manchester Utd", logo: "🔴", played: 28, won: 14, drawn: 6, lost: 8, gf: 45, ga: 39, gd: 6, points: 48, form: ["D", "L", "W", "W", "L"] },
  { position: 8, team: "Chelsea", logo: "🔵", played: 28, won: 13, drawn: 7, lost: 8, gf: 51, ga: 42, gd: 9, points: 46, form: ["W", "D", "L", "W", "D"] },
];

// Próximos partidos
const upcomingMatches = [
  { date: "28 Oct 2025", time: "15:00", home: "Arsenal", homeLogo: "🔴", away: "Manchester City", awayLogo: "🔵", stadium: "Emirates Stadium" },
  { date: "28 Oct 2025", time: "17:30", home: "Liverpool", homeLogo: "🔴", away: "Tottenham", awayLogo: "⚪", stadium: "Anfield" },
  { date: "29 Oct 2025", time: "14:00", home: "Chelsea", homeLogo: "🔵", away: "Newcastle", awayLogo: "⚫", stadium: "Stamford Bridge" },
  { date: "29 Oct 2025", time: "16:30", home: "Aston Villa", homeLogo: "🦁", away: "Manchester Utd", awayLogo: "🔴", stadium: "Villa Park" },
];

// Top goleadores
const topScorers = [
  { position: 1, player: "Erling Haaland", team: "Manchester City", goals: 24, logo: "🔵" },
  { position: 2, player: "Mohamed Salah", team: "Liverpool", goals: 21, logo: "🔴" },
  { position: 3, player: "Harry Kane", team: "Bayern Múnich", goals: 20, logo: "⚪" },
  { position: 4, player: "Bukayo Saka", team: "Arsenal", goals: 18, logo: "🔴" },
  { position: 5, player: "Son Heung-min", team: "Tottenham", goals: 17, logo: "⚪" },
];

const competitionDetails: Record<number, any> = {
  1: {
    id: 1,
    name: "Premier League",
    country: "Inglaterra",
    logo: "🏴󐁧󐁢󐁥󐁮󐁧󐁿",
    season: "2024/25",
    teams: 20,
    description: "La Premier League es la máxima categoría del sistema de ligas de fútbol de Inglaterra. Es una de las ligas más competitivas y vistas del mundo, con equipos históricos y grandes estrellas internacionales.",
    founded: "1992",
    currentChampion: "Manchester City",
    mostTitles: "Manchester United (13 títulos)",
    standings: standings,
    upcomingMatches: upcomingMatches,
    topScorers: topScorers
  }
};

export default function CompeticionDetalle() {
  const params = useParams();
  const compId = Number(params.id);
  const comp = competitionDetails[compId] || competitionDetails[1]; // Default a Premier League

  const [activeTab, setActiveTab] = React.useState<'tabla' | 'partidos' | 'goleadores'>('tabla');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      
      {/* Breadcrumb */}
      <div className="border-b border-gray-800/50 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">Inicio</Link>
            <span className="text-gray-600">▶</span>
            <Link href="/competiciones" className="text-gray-400 hover:text-green-400 transition-colors">Competiciones</Link>
            <span className="text-gray-600">▶</span>
            <span className="text-green-400 font-semibold">{comp.name}</span>
          </div>
        </div>
      </div>

      {/* Header de la competición */}
      <section className="relative py-12 px-4 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            {/* Logo grande */}
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-gray-700">
              <span className="text-7xl">{comp.logo}</span>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-500 text-black text-sm font-bold px-4 py-1.5 rounded-full">
                  {comp.season}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{comp.country}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {comp.name}
              </h1>
              
              <p className="text-gray-400 text-lg mb-6 max-w-3xl">
                {comp.description}
              </p>
              
              {/* Stats rápidas */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                  <span className="text-gray-400 text-sm">Equipos: </span>
                  <span className="text-white font-bold">{comp.teams}</span>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                  <span className="text-gray-400 text-sm">Campeón actual: </span>
                  <span className="text-white font-bold">{comp.currentChampion}</span>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                  <span className="text-gray-400 text-sm">Fundada: </span>
                  <span className="text-white font-bold">{comp.founded}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs de navegación */}
      <section className="sticky top-16 z-20 backdrop-blur-xl bg-black/80 border-y border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            {[
              { id: 'tabla', label: 'Tabla de Posiciones', icon: '📊' },
              { id: 'partidos', label: 'Próximos Partidos', icon: '📅' },
              { id: 'goleadores', label: 'Goleadores', icon: '⚽' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-black shadow-lg shadow-green-500/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span className="hidden md:inline">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido según tab activo */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* TABLA DE POSICIONES */}
          {activeTab === 'tabla' && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-gray-400">#</th>
                      <th className="text-left p-4 text-sm font-bold text-gray-400">Equipo</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">PJ</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">G</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">E</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">P</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">GF</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">GC</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">DG</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">Pts</th>
                      <th className="text-center p-4 text-sm font-bold text-gray-400">Forma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.standings.map((team: any, index: number) => (
                      <tr 
                        key={team.position}
                        className={`border-t border-gray-800 hover:bg-gray-800/50 transition-colors ${
                          index < 4 ? 'border-l-4 border-l-green-500' : 
                          index < 6 ? 'border-l-4 border-l-blue-500' : 
                          index >= comp.standings.length - 3 ? 'border-l-4 border-l-red-500' : ''
                        }`}
                      >
                        <td className="p-4 text-center font-bold text-gray-400">{team.position}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{team.logo}</span>
                            <span className="font-bold">{team.team}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center text-gray-400">{team.played}</td>
                        <td className="p-4 text-center text-gray-400">{team.won}</td>
                        <td className="p-4 text-center text-gray-400">{team.drawn}</td>
                        <td className="p-4 text-center text-gray-400">{team.lost}</td>
                        <td className="p-4 text-center text-gray-400">{team.gf}</td>
                        <td className="p-4 text-center text-gray-400">{team.ga}</td>
                        <td className="p-4 text-center font-bold">{team.gd > 0 ? '+' : ''}{team.gd}</td>
                        <td className="p-4 text-center font-black text-green-400 text-lg">{team.points}</td>
                        <td className="p-4">
                          <div className="flex gap-1 justify-center">
                            {team.form.map((result: string, i: number) => (
                              <span 
                                key={i}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  result === 'W' ? 'bg-green-500 text-black' :
                                  result === 'D' ? 'bg-gray-500 text-white' :
                                  'bg-red-500 text-white'
                                }`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Leyenda */}
              <div className="flex flex-wrap gap-4 p-6 bg-gray-800/30 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-400">Champions League</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-400">Europa League</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-400">Descenso</span>
                </div>
              </div>
            </div>
          )}

          {/* PRÓXIMOS PARTIDOS */}
          {activeTab === 'partidos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comp.upcomingMatches.map((match: any, index: number) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10"
                >
                  {/* Fecha y hora */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">📅</span>
                      <span className="text-gray-400">{match.date}</span>
                    </div>
                    <div className="bg-green-500 text-black text-sm font-bold px-4 py-1.5 rounded-full">
                      {match.time}
                    </div>
                  </div>
                  
                  {/* Equipos */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Local */}
                    <div className="flex-1 text-right">
                      <div className="text-2xl mb-2">{match.homeLogo}</div>
                      <div className="font-bold text-lg">{match.home}</div>
                    </div>
                    
                    {/* VS */}
                    <div className="mx-6">
                      <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-black text-gray-400">
                        VS
                      </div>
                    </div>
                    
                    {/* Visitante */}
                    <div className="flex-1 text-left">
                      <div className="text-2xl mb-2">{match.awayLogo}</div>
                      <div className="font-bold text-lg">{match.away}</div>
                    </div>
                  </div>
                  
                  {/* Estadio */}
                  <div className="text-center pt-4 border-t border-gray-800">
                    <span className="text-sm text-gray-400">🏟️ {match.stadium}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TABLA DE GOLEADORES */}
          {activeTab === 'goleadores' && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
              <div className="p-6 bg-gray-800/30 border-b border-gray-800">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <span>⚽</span>
                  Top Goleadores de la Temporada
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {comp.topScorers.map((scorer: any, index: number) => (
                    <div 
                      key={scorer.position}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-800/50 ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-900/20 to-transparent border border-yellow-600/30' : ''
                      }`}
                    >
                      {/* Posición */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-black' :
                        index === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-800 text-white' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {scorer.position}
                      </div>
                      
                      {/* Logo del equipo */}
                      <div className="text-3xl">{scorer.logo}</div>
                      
                      {/* Info del jugador */}
                      <div className="flex-1">
                        <div className="font-bold text-lg">{scorer.player}</div>
                        <div className="text-sm text-gray-400">{scorer.team}</div>
                      </div>
                      
                      {/* Goles */}
                      <div className="text-right">
                        <div className="text-3xl font-black text-green-400">{scorer.goals}</div>
                        <div className="text-xs text-gray-400">goles</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
        </div>
      </section>

      {/* Botón volver */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Link 
          href="/competiciones"
          className="inline-flex items-center gap-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 border border-gray-700 hover:border-green-500 text-white hover:text-black font-bold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span className="text-xl">◀</span>
          Volver a competiciones
        </Link>
      </div>
    </div>
  );
}
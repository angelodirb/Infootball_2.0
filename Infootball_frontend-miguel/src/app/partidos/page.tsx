'use client';

import React from 'react';
import Link from 'next/link';

// Datos de ejemplo de partidos
const matchesData = {
  live: [
    {
      id: 1,
      competition: "Premier League",
      competitionLogo: "🏴󐁧󐁢󐁥󐁮󐁧󐁿",
      home: "Arsenal",
      homeLogo: "🔴",
      away: "Manchester City",
      awayLogo: "🔵",
      homeScore: 2,
      awayScore: 2,
      time: "78'",
      status: "live",
      stadium: "Emirates Stadium",
      events: [
        { minute: 12, type: "goal", team: "home", player: "Saka" },
        { minute: 34, type: "goal", team: "away", player: "Haaland" },
        { minute: 56, type: "goal", team: "home", player: "Martinelli" },
        { minute: 71, type: "goal", team: "away", player: "De Bruyne" },
      ]
    },
    {
      id: 2,
      competition: "La Liga",
      competitionLogo: "🇪🇸",
      home: "Real Madrid",
      homeLogo: "⚪",
      away: "Barcelona",
      awayLogo: "🔴🔵",
      homeScore: 1,
      awayScore: 0,
      time: "45+2'",
      status: "live",
      stadium: "Santiago Bernabéu",
      events: [
        { minute: 23, type: "goal", team: "home", player: "Vinicius Jr" },
      ]
    }
  ],
  today: [
    {
      id: 3,
      competition: "Premier League",
      competitionLogo: "🏴󐁧󐁢󐁥󐁮󐁧󐁿",
      home: "Liverpool",
      homeLogo: "🔴",
      away: "Chelsea",
      awayLogo: "🔵",
      time: "17:30",
      status: "upcoming",
      stadium: "Anfield",
      date: "Hoy"
    },
    {
      id: 4,
      competition: "Serie A",
      competitionLogo: "🇮🇹",
      home: "Inter de Milán",
      homeLogo: "⚫🔵",
      away: "AC Milan",
      awayLogo: "🔴⚫",
      time: "20:45",
      status: "upcoming",
      stadium: "San Siro",
      date: "Hoy"
    },
    {
      id: 5,
      competition: "Bundesliga",
      competitionLogo: "🇩🇪",
      home: "Bayern Múnich",
      homeLogo: "🔴",
      away: "Borussia Dortmund",
      awayLogo: "🟡⚫",
      time: "18:30",
      status: "upcoming",
      stadium: "Allianz Arena",
      date: "Hoy"
    }
  ],
  upcoming: [
    {
      id: 6,
      competition: "Champions League",
      competitionLogo: "⭐",
      home: "PSG",
      homeLogo: "🔴🔵",
      away: "Bayern Múnich",
      awayLogo: "🔴",
      time: "21:00",
      status: "upcoming",
      stadium: "Parc des Princes",
      date: "Mañana"
    },
    {
      id: 7,
      competition: "Copa Libertadores",
      competitionLogo: "🏆",
      home: "Boca Juniors",
      homeLogo: "🟡🔵",
      away: "River Plate",
      awayLogo: "🔴⚪",
      time: "21:30",
      status: "upcoming",
      stadium: "La Bombonera",
      date: "Mañana"
    },
    {
      id: 8,
      competition: "La Liga",
      competitionLogo: "🇪🇸",
      home: "Atlético Madrid",
      homeLogo: "🔴⚪",
      away: "Sevilla",
      awayLogo: "⚪🔴",
      time: "16:15",
      status: "upcoming",
      stadium: "Wanda Metropolitano",
      date: "29 Oct"
    }
  ],
  finished: [
    {
      id: 9,
      competition: "Premier League",
      competitionLogo: "🏴󐁧󐁢󐁥󐁮󐁧󐁿",
      home: "Manchester United",
      homeLogo: "🔴",
      away: "Tottenham",
      awayLogo: "⚪",
      homeScore: 2,
      awayScore: 3,
      status: "finished",
      stadium: "Old Trafford",
      date: "Ayer"
    },
    {
      id: 10,
      competition: "Serie A",
      competitionLogo: "🇮🇹",
      home: "Juventus",
      homeLogo: "⚫⚪",
      away: "Napoli",
      awayLogo: "🔵",
      homeScore: 1,
      awayScore: 1,
      status: "finished",
      stadium: "Allianz Stadium",
      date: "Ayer"
    }
  ]
};

const competitions = [
  { name: "Todos", icon: "🌍" },
  { name: "Premier League", icon: "🏴󐁧󐁢󐁥󐁮󐁧󐁿" },
  { name: "La Liga", icon: "🇪🇸" },
  { name: "Serie A", icon: "🇮🇹" },
  { name: "Bundesliga", icon: "🇩🇪" },
  { name: "Champions League", icon: "⭐" },
  { name: "Copa Libertadores", icon: "🏆" }
];

export default function PartidosPage() {
  const [selectedCompetition, setSelectedCompetition] = React.useState("Todos");
  const [activeTab, setActiveTab] = React.useState<'live' | 'today' | 'upcoming' | 'finished'>('live');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 px-4 overflow-hidden">
        {/* Efecto de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Partidos
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg ml-5">Sigue todos los partidos en vivo y próximos encuentros</p>
          </div>

          {/* Partidos en vivo destacados */}
          {matchesData.live.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matchesData.live.map((match) => (
                <Link href={`/partidos/${match.id}`} key={match.id}>
                  <div className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl border-2 border-red-500/50">
                      
                      {/* Badge LIVE pulsante */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-red-500/50 animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          EN VIVO
                        </span>
                      </div>

                      {/* Tiempo del partido */}
                      <div className="absolute top-6 right-6 z-10">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xl font-bold px-4 py-2 rounded-full border border-gray-700">
                          {match.time}
                        </span>
                      </div>

                      {/* Background decorativo */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),transparent)]"></div>
                      
                      {/* Contenido del partido */}
                      <div className="relative p-8">
                        {/* Competición */}
                        <div className="flex items-center gap-2 mb-6">
                          <span className="text-2xl">{match.competitionLogo}</span>
                          <span className="text-gray-400 text-sm font-semibold">{match.competition}</span>
                        </div>

                        {/* Equipos y marcador */}
                        <div className="flex items-center justify-between mb-6">
                          {/* Local */}
                          <div className="flex-1 text-center">
                            <div className="text-6xl mb-3">{match.homeLogo}</div>
                            <div className="font-bold text-xl mb-2">{match.home}</div>
                          </div>
                          
                          {/* Marcador */}
                          <div className="mx-8">
                            <div className="bg-black/50 backdrop-blur-md rounded-2xl px-8 py-4 border-2 border-green-500/30">
                              <div className="text-5xl font-black text-center">
                                <span className="text-green-400">{match.homeScore}</span>
                                <span className="text-gray-600 mx-3">-</span>
                                <span className="text-green-400">{match.awayScore}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Visitante */}
                          <div className="flex-1 text-center">
                            <div className="text-6xl mb-3">{match.awayLogo}</div>
                            <div className="font-bold text-xl mb-2">{match.away}</div>
                          </div>
                        </div>

                        {/* Estadio */}
                        <div className="text-center pt-4 border-t border-gray-800">
                          <span className="text-sm text-gray-400">🏟️ {match.stadium}</span>
                        </div>

                        {/* Últimos eventos */}
                        <div className="mt-4 space-y-2">
                          {match.events.slice(-2).reverse().map((event, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-2 text-sm flex items-center gap-2">
                              <span className="text-green-400 font-bold">{event.minute}'</span>
                              <span>{event.type === 'goal' ? '⚽' : '🟨'}</span>
                              <span className="text-gray-300">{event.player}</span>
                              <span className="text-gray-600">({event.team === 'home' ? match.home : match.away})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Borde brillante */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/70 transition-colors duration-300"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tabs de navegación */}
      <section className="sticky top-0 z-20 backdrop-blur-xl bg-black/80 border-y border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {[
              { id: 'live', label: 'En Vivo', icon: '🔴', count: matchesData.live.length },
              { id: 'today', label: 'Hoy', icon: '📅', count: matchesData.today.length },
              { id: 'upcoming', label: 'Próximos', icon: '⏰', count: matchesData.upcoming.length },
              { id: 'finished', label: 'Finalizados', icon: '✅', count: matchesData.finished.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-6 py-3 rounded-xl whitespace-nowrap font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-black shadow-lg shadow-green-500/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-black/30' : 'bg-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </span>
                {activeTab === tab.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros de Competición */}
      <section className="py-6 px-4 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {competitions.map((comp) => (
              <button
                key={comp.name}
                onClick={() => setSelectedCompetition(comp.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
                  selectedCompetition === comp.name
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{comp.icon}</span>
                  <span>{comp.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Partidos según tab */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Partidos del día */}
          {activeTab === 'today' && (
            <div className="space-y-4">
              {matchesData.today.map((match) => (
                <Link href={`/partidos/${match.id}`} key={match.id}>
                  <div className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Competición y hora */}
                      <div className="flex items-center gap-4 md:w-48">
                        <span className="text-3xl">{match.competitionLogo}</span>
                        <div>
                          <div className="text-sm text-gray-400">{match.competition}</div>
                          <div className="text-2xl font-bold text-green-400">{match.time}</div>
                        </div>
                      </div>

                      {/* Equipos */}
                      <div className="flex-1 flex items-center justify-between">
                        {/* Local */}
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-4xl">{match.homeLogo}</span>
                          <span className="font-bold text-lg">{match.home}</span>
                        </div>
                        
                        {/* VS */}
                        <div className="mx-6">
                          <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-black text-gray-400">
                            VS
                          </div>
                        </div>
                        
                        {/* Visitante */}
                        <div className="flex items-center gap-3 flex-1 justify-end">
                          <span className="font-bold text-lg text-right">{match.away}</span>
                          <span className="text-4xl">{match.awayLogo}</span>
                        </div>
                      </div>

                      {/* Flecha */}
                      <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-2xl">▶</span>
                      </div>
                    </div>

                    {/* Estadio */}
                    <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-400">
                      🏟️ {match.stadium}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Próximos partidos */}
          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchesData.upcoming.map((match) => (
                <Link href={`/partidos/${match.id}`} key={match.id}>
                  <div className="group h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                    
                    {/* Header */}
                    <div className="bg-gray-800/50 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{match.competitionLogo}</span>
                        <span className="text-sm font-semibold text-gray-300">{match.competition}</span>
                      </div>
                      <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">{match.date}</span>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      {/* Equipos */}
                      <div className="space-y-4 mb-6">
                        {/* Local */}
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{match.homeLogo}</span>
                          <span className="font-bold text-lg">{match.home}</span>
                        </div>
                        
                        {/* VS */}
                        <div className="flex items-center gap-2 pl-2">
                          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                            VS
                          </div>
                          <div className="text-2xl font-bold text-green-400">{match.time}</div>
                        </div>
                        
                        {/* Visitante */}
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{match.awayLogo}</span>
                          <span className="font-bold text-lg">{match.away}</span>
                        </div>
                      </div>

                      {/* Estadio */}
                      <div className="text-sm text-gray-400 pt-4 border-t border-gray-800">
                        🏟️ {match.stadium}
                      </div>
                    </div>

                    {/* Borde inferior */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Partidos finalizados */}
          {activeTab === 'finished' && (
            <div className="space-y-4">
              {matchesData.finished.map((match) => (
                <Link href={`/partidos/${match.id}`} key={match.id}>
                  <div className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300">
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Competición */}
                      <div className="flex items-center gap-4 md:w-48">
                        <span className="text-3xl">{match.competitionLogo}</span>
                        <div>
                          <div className="text-sm text-gray-400">{match.competition}</div>
                          <div className="text-xs bg-gray-700 px-2 py-1 rounded">{match.date}</div>
                        </div>
                      </div>

                      {/* Equipos y resultado */}
                      <div className="flex-1 flex items-center justify-between">
                        {/* Local */}
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-4xl">{match.homeLogo}</span>
                          <span className="font-bold text-lg">{match.home}</span>
                        </div>
                        
                        {/* Marcador */}
                        <div className="mx-6 bg-gray-800 rounded-lg px-6 py-3">
                          <div className="text-3xl font-black">
                            <span>{match.homeScore}</span>
                            <span className="text-gray-600 mx-2">-</span>
                            <span>{match.awayScore}</span>
                          </div>
                        </div>
                        
                        {/* Visitante */}
                        <div className="flex items-center gap-3 flex-1 justify-end">
                          <span className="font-bold text-lg text-right">{match.away}</span>
                          <span className="text-4xl">{match.awayLogo}</span>
                        </div>
                      </div>

                      {/* Flecha */}
                      <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-2xl">▶</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Partidos en vivo (tab) */}
          {activeTab === 'live' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚽</div>
              <h3 className="text-2xl font-bold mb-2">No hay partidos en vivo ahora</h3>
              <p className="text-gray-400">Los partidos en vivo aparecen en la sección superior</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
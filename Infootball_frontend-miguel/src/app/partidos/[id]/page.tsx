'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const matchDetails: Record<number, any> = {
  1: {
    id: 1,
    competition: "Premier League",
    competitionLogo: "🏴󐁧󐁢󐁥󐁮󐁧󐁿",
    home: "Arsenal",
    homeLogo: "🔴",
    away: "Manchester City",
    awayLogo: "🔵",
    homeScore: 2,
    awayScore: 2,
    status: "live",
    time: "78'",
    stadium: "Emirates Stadium",
    date: "28 de octubre de 2025",
    referee: "Michael Oliver",
    attendance: "60,704",
    
    stats: {
      possession: { home: 48, away: 52 },
      shots: { home: 12, away: 15 },
      shotsOnTarget: { home: 6, away: 8 },
      corners: { home: 5, away: 7 },
      fouls: { home: 11, away: 9 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 0 }
    },
    
    events: [
      { minute: 12, type: 'goal', team: 'home', player: 'Bukayo Saka', assist: 'Martin Ødegaard' },
      { minute: 28, type: 'yellow', team: 'away', player: 'Rodri' },
      { minute: 34, type: 'goal', team: 'away', player: 'Erling Haaland', assist: 'Kevin De Bruyne' },
      { minute: 45, type: 'yellow', team: 'home', player: 'Thomas Partey' },
      { minute: 56, type: 'goal', team: 'home', player: 'Gabriel Martinelli', assist: 'Bukayo Saka' },
      { minute: 63, type: 'substitution', team: 'away', playerOut: 'Jack Grealish', playerIn: 'Phil Foden' },
      { minute: 68, type: 'yellow', team: 'away', player: 'Kyle Walker' },
      { minute: 71, type: 'goal', team: 'away', player: 'Kevin De Bruyne', assist: 'Phil Foden' },
      { minute: 75, type: 'substitution', team: 'home', playerOut: 'Martin Ødegaard', playerIn: 'Fabio Vieira' }
    ],
    
    lineups: {
      home: {
        formation: '4-3-3',
        starting: [
          { number: 1, name: 'David Raya', position: 'GK' },
          { number: 4, name: 'Ben White', position: 'DF' },
          { number: 6, name: 'Gabriel', position: 'DF' },
          { number: 15, name: 'Jakub Kiwior', position: 'DF' },
          { number: 35, name: 'Oleksandr Zinchenko', position: 'DF' },
          { number: 5, name: 'Thomas Partey', position: 'MF' },
          { number: 8, name: 'Martin Ødegaard', position: 'MF' },
          { number: 41, name: 'Declan Rice', position: 'MF' },
          { number: 7, name: 'Bukayo Saka', position: 'FW' },
          { number: 14, name: 'Eddie Nketiah', position: 'FW' },
          { number: 11, name: 'Gabriel Martinelli', position: 'FW' }
        ]
      },
      away: {
        formation: '4-2-3-1',
        starting: [
          { number: 31, name: 'Ederson', position: 'GK' },
          { number: 2, name: 'Kyle Walker', position: 'DF' },
          { number: 3, name: 'Rúben Dias', position: 'DF' },
          { number: 6, name: 'Nathan Aké', position: 'DF' },
          { number: 24, name: 'Joško Gvardiol', position: 'DF' },
          { number: 16, name: 'Rodri', position: 'MF' },
          { number: 82, name: 'Rico Lewis', position: 'MF' },
          { number: 47, name: 'Phil Foden', position: 'MF' },
          { number: 17, name: 'Kevin De Bruyne', position: 'MF' },
          { number: 10, name: 'Jack Grealish', position: 'MF' },
          { number: 9, name: 'Erling Haaland', position: 'FW' }
        ]
      }
    }
  }
};

export default function PartidoDetalle() {
  const params = useParams();
  const matchId = Number(params.id);
  const match = matchDetails[matchId] || matchDetails[1];

  const [activeTab, setActiveTab] = React.useState<'resumen' | 'estadisticas' | 'alineaciones'>('resumen');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      
      {/* Breadcrumb */}
      <div className="border-b border-gray-800/50 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">Inicio</Link>
            <span className="text-gray-600">▶</span>
            <Link href="/partidos" className="text-gray-400 hover:text-green-400 transition-colors">Partidos</Link>
            <span className="text-gray-600">▶</span>
            <span className="text-green-400 font-semibold">{match.home} vs {match.away}</span>
          </div>
        </div>
      </div>

      {/* Header del partido */}
      <section className="relative py-12 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Badge EN VIVO */}
          {match.status === 'live' && (
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-red-500/50 animate-pulse">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                EN VIVO - {match.time}
              </span>
            </div>
          )}

          {/* Competición */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-3xl">{match.competitionLogo}</span>
            <span className="text-xl font-bold text-gray-300">{match.competition}</span>
          </div>

          {/* Marcador principal */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Local */}
            <div className="text-center">
              <div className="text-8xl mb-4">{match.homeLogo}</div>
              <div className="text-3xl font-black mb-2">{match.home}</div>
            </div>
            
            {/* Marcador */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl px-12 py-8 border-4 border-green-500/30 shadow-2xl">
              <div className="text-7xl font-black text-center">
                <span className="text-green-400">{match.homeScore}</span>
                <span className="text-gray-600 mx-6">-</span>
                <span className="text-green-400">{match.awayScore}</span>
              </div>
            </div>
            
            {/* Visitante */}
            <div className="text-center">
              <div className="text-8xl mb-4">{match.awayLogo}</div>
              <div className="text-3xl font-black mb-2">{match.away}</div>
            </div>
          </div>

          {/* Info del partido */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏟️</span>
              <span>{match.stadium}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>{match.attendance} espectadores</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🟨</span>
              <span>Árbitro: {match.referee}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-20 backdrop-blur-xl bg-black/80 border-y border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4 justify-center">
            {[
              { id: 'resumen', label: 'Resumen', icon: '📋' },
              { id: 'estadisticas', label: 'Estadísticas', icon: '📊' },
              { id: 'alineaciones', label: 'Alineaciones', icon: '👥' }
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
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido según tab */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* RESUMEN - Eventos del partido */}
          {activeTab === 'resumen' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <span>⚡</span>
                  Eventos del partido
                </h3>
                
                <div className="space-y-4">
                  {match.events.map((event: any, index: number) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        event.team === 'home' ? 'bg-red-900/20' : 'bg-blue-900/20'
                      }`}
                    >
                      {/* Minuto */}
                      <div className="w-16 text-center">
                        <span className="text-green-400 font-bold text-lg">{event.minute}'</span>
                      </div>
                      
                      {/* Icono del evento */}
                      <div className="text-3xl">
                        {event.type === 'goal' && '⚽'}
                        {event.type === 'yellow' && '🟨'}
                        {event.type === 'red' && '🟥'}
                        {event.type === 'substitution' && '🔄'}
                      </div>
                      
                      {/* Descripción */}
                      <div className="flex-1">
                        <div className="font-bold text-lg">
                          {event.type === 'goal' && `GOL de ${event.player}`}
                          {event.type === 'yellow' && `Tarjeta amarilla - ${event.player}`}
                          {event.type === 'substitution' && `Sale ${event.playerOut}, entra ${event.playerIn}`}
                        </div>
                        {event.assist && (
                          <div className="text-sm text-gray-400">Asistencia: {event.assist}</div>
                        )}
                        <div className="text-sm text-gray-500 mt-1">
                          {event.team === 'home' ? match.home : match.away}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ESTADÍSTICAS */}
          {activeTab === 'estadisticas' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {Object.entries(match.stats).map(([key, value]: any) => {
                const labels: Record<string, string> = {
                  possession: 'Posesión',
                  shots: 'Tiros',
                  shotsOnTarget: 'Tiros a puerta',
                  corners: 'Córners',
                  fouls: 'Faltas',
                  yellowCards: 'Tarjetas amarillas',
                  redCards: 'Tarjetas rojas'
                };
                
                return (
                  <div key={key} className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-right flex-1">{value.home}</div>
                      <div className="text-gray-400 text-sm font-semibold px-8">{labels[key]}</div>
                      <div className="text-2xl font-bold flex-1">{value.away}</div>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                        style={{ width: `${(value.home / (value.home + value.away)) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute right-0 top-0 h-full bg-gradient-to-l from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${(value.away / (value.home + value.away)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ALINEACIONES */}
          {activeTab === 'alineaciones' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Local */}
              <div className="bg-gradient-to-br from-red-900/20 to-gray-950 rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{match.homeLogo}</span>
                  <div>
                    <h3 className="text-2xl font-black">{match.home}</h3>
                    <p className="text-gray-400 text-sm">{match.lineups.home.formation}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {match.lineups.home.starting.map((player: any) => (
                    <div key={player.number} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{player.name}</div>
                        <div className="text-xs text-gray-400">{player.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visitante */}
              <div className="bg-gradient-to-br from-blue-900/20 to-gray-950 rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{match.awayLogo}</span>
                  <div>
                    <h3 className="text-2xl font-black">{match.away}</h3>
                    <p className="text-gray-400 text-sm">{match.lineups.away.formation}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {match.lineups.away.starting.map((player: any) => (
                    <div key={player.number} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{player.name}</div>
                        <div className="text-xs text-gray-400">{player.position}</div>
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
          href="/partidos"
          className="inline-flex items-center gap-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 border border-gray-700 hover:border-green-500 text-white hover:text-black font-bold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span className="text-xl">◀</span>
          Volver a partidos
        </Link>
      </div>
    </div>
  );
}
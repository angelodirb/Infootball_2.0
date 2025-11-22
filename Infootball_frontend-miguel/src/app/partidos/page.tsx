'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { matchesApi } from '../../../lib/api';

interface Team {
  id: number;
  name: string;
  logo: string;
  country?: string;
}

interface Competition {
  id: number;
  name: string;
  logo: string;
  country?: string;
  season?: string;
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'finished';
  homeScore?: number | null;
  awayScore?: number | null;
  competition: Competition;
  venue?: string;
}

interface MatchEvent {
  minute: number;
  type: string;
  team: 'home' | 'away';
  player: string;
}

interface DisplayMatch {
  id: number;
  competition: string;
  competitionLogo: string;
  home: string;
  homeLogo: string;
  away: string;
  awayLogo: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  status: string;
  stadium: string;
  date?: string;
  events?: MatchEvent[];
}

const competitions = [
  { name: "Todos", icon: "🌍" },
  { name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "La Liga", icon: "🇪🇸" },
  { name: "Serie A", icon: "🇮🇹" },
  { name: "Bundesliga", icon: "🇩🇪" },
  { name: "Champions League", icon: "⭐" },
  { name: "Ligue 1", icon: "🇫🇷" }
];

export default function PartidosPage() {
  const [selectedCompetition, setSelectedCompetition] = useState("Todos");
  const [activeTab, setActiveTab] = useState<'live' | 'today' | 'upcoming' | 'finished'>('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchesData, setMatchesData] = useState<{
    live: DisplayMatch[];
    today: DisplayMatch[];
    upcoming: DisplayMatch[];
    finished: DisplayMatch[];
  }>({
    live: [],
    today: [],
    upcoming: [],
    finished: []
  });

  // Función para transformar los datos de la API al formato del UI
  const transformMatch = (match: Match): DisplayMatch => ({
    id: match.id,
    competition: match.competition?.name || 'Liga',
    competitionLogo: match.competition?.logo || '⚽',
    home: match.homeTeam?.name || 'Local',
    homeLogo: match.homeTeam?.logo || '🏠',
    away: match.awayTeam?.name || 'Visitante',
    awayLogo: match.awayTeam?.logo || '🚌',
    homeScore: match.homeScore ?? undefined,
    awayScore: match.awayScore ?? undefined,
    time: match.time || '00:00',
    status: match.status,
    stadium: match.venue || 'Estadio',
    date: match.date
  });

  // Cargar partidos
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener fecha actual y fechas cercanas
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        // Hacer llamadas en paralelo
        const [liveResponse, todayResponse, tomorrowResponse, yesterdayResponse] = await Promise.all([
          matchesApi.getLive().catch(() => []),
          matchesApi.getByDate(formatDate(today)).catch(() => []),
          matchesApi.getByDate(formatDate(tomorrow)).catch(() => []),
          matchesApi.getByDate(formatDate(yesterday)).catch(() => [])
        ]);

        // Procesar respuestas
        const liveMatches = Array.isArray(liveResponse) ? liveResponse : [];
        const todayMatches = Array.isArray(todayResponse) ? todayResponse : [];
        const tomorrowMatches = Array.isArray(tomorrowResponse) ? tomorrowResponse : [];
        const yesterdayMatches = Array.isArray(yesterdayResponse) ? yesterdayResponse : [];

        // Clasificar partidos
        const live: DisplayMatch[] = liveMatches.map(transformMatch);

        const today_scheduled = todayMatches
          .filter((m: Match) => m.status === 'scheduled')
          .map(transformMatch);

        const upcoming = tomorrowMatches
          .filter((m: Match) => m.status === 'scheduled')
          .map((m: Match) => ({
            ...transformMatch(m),
            date: 'Mañana'
          }));

        const finished = [
          ...todayMatches.filter((m: Match) => m.status === 'finished'),
          ...yesterdayMatches.filter((m: Match) => m.status === 'finished')
        ].map((m: Match) => ({
          ...transformMatch(m),
          date: m.date === formatDate(yesterday) ? 'Ayer' : 'Hoy'
        }));

        setMatchesData({
          live,
          today: today_scheduled,
          upcoming,
          finished
        });
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Error al cargar los partidos. Verifica que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Filtrar por competición
  const filterByCompetition = (matches: DisplayMatch[]) => {
    if (selectedCompetition === "Todos") return matches;
    return matches.filter(m => m.competition.toLowerCase().includes(selectedCompetition.toLowerCase()));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando partidos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
                          <img src={match.competitionLogo} alt="" className="w-6 h-6 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          <span className="text-gray-400 text-sm font-semibold">{match.competition}</span>
                        </div>

                        {/* Equipos y marcador */}
                        <div className="flex items-center justify-between mb-6">
                          {/* Local */}
                          <div className="flex-1 text-center">
                            <img src={match.homeLogo} alt={match.home} className="w-16 h-16 mx-auto mb-3 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                            <div className="font-bold text-xl mb-2">{match.home}</div>
                          </div>

                          {/* Marcador */}
                          <div className="mx-8">
                            <div className="bg-black/50 backdrop-blur-md rounded-2xl px-8 py-4 border-2 border-green-500/30">
                              <div className="text-5xl font-black text-center">
                                <span className="text-green-400">{match.homeScore ?? 0}</span>
                                <span className="text-gray-600 mx-3">-</span>
                                <span className="text-green-400">{match.awayScore ?? 0}</span>
                              </div>
                            </div>
                          </div>

                          {/* Visitante */}
                          <div className="flex-1 text-center">
                            <img src={match.awayLogo} alt={match.away} className="w-16 h-16 mx-auto mb-3 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                            <div className="font-bold text-xl mb-2">{match.away}</div>
                          </div>
                        </div>

                        {/* Estadio */}
                        <div className="text-center pt-4 border-t border-gray-800">
                          <span className="text-sm text-gray-400">🏟️ {match.stadium}</span>
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
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
              {filterByCompetition(matchesData.today).length > 0 ? (
                filterByCompetition(matchesData.today).map((match) => (
                  <Link href={`/partidos/${match.id}`} key={match.id}>
                    <div className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">

                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Competición y hora */}
                        <div className="flex items-center gap-4 md:w-48">
                          <img src={match.competitionLogo} alt="" className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          <div>
                            <div className="text-sm text-gray-400">{match.competition}</div>
                            <div className="text-2xl font-bold text-green-400">{match.time}</div>
                          </div>
                        </div>

                        {/* Equipos */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* Local */}
                          <div className="flex items-center gap-3 flex-1">
                            <img src={match.homeLogo} alt={match.home} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
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
                            <img src={match.awayLogo} alt={match.away} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
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
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-2xl font-bold mb-2">No hay partidos programados para hoy</h3>
                  <p className="text-gray-400">Revisa los próximos encuentros</p>
                </div>
              )}
            </div>
          )}

          {/* Próximos partidos */}
          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterByCompetition(matchesData.upcoming).length > 0 ? (
                filterByCompetition(matchesData.upcoming).map((match) => (
                  <Link href={`/partidos/${match.id}`} key={match.id}>
                    <div className="group h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">

                      {/* Header */}
                      <div className="bg-gray-800/50 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={match.competitionLogo} alt="" className="w-5 h-5 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
                            <img src={match.homeLogo} alt={match.home} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
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
                            <img src={match.awayLogo} alt={match.away} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
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
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <div className="text-6xl mb-4">⏰</div>
                  <h3 className="text-2xl font-bold mb-2">No hay próximos partidos</h3>
                  <p className="text-gray-400">Revisa más tarde para ver nuevos encuentros</p>
                </div>
              )}
            </div>
          )}

          {/* Partidos finalizados */}
          {activeTab === 'finished' && (
            <div className="space-y-4">
              {filterByCompetition(matchesData.finished).length > 0 ? (
                filterByCompetition(matchesData.finished).map((match) => (
                  <Link href={`/partidos/${match.id}`} key={match.id}>
                    <div className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300">

                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Competición */}
                        <div className="flex items-center gap-4 md:w-48">
                          <img src={match.competitionLogo} alt="" className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          <div>
                            <div className="text-sm text-gray-400">{match.competition}</div>
                            <div className="text-xs bg-gray-700 px-2 py-1 rounded">{match.date}</div>
                          </div>
                        </div>

                        {/* Equipos y resultado */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* Local */}
                          <div className="flex items-center gap-3 flex-1">
                            <img src={match.homeLogo} alt={match.home} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                            <span className="font-bold text-lg">{match.home}</span>
                          </div>

                          {/* Marcador */}
                          <div className="mx-6 bg-gray-800 rounded-lg px-6 py-3">
                            <div className="text-3xl font-black">
                              <span>{match.homeScore ?? 0}</span>
                              <span className="text-gray-600 mx-2">-</span>
                              <span>{match.awayScore ?? 0}</span>
                            </div>
                          </div>

                          {/* Visitante */}
                          <div className="flex items-center gap-3 flex-1 justify-end">
                            <span className="font-bold text-lg text-right">{match.away}</span>
                            <img src={match.awayLogo} alt={match.away} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                          </div>
                        </div>

                        {/* Flecha */}
                        <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-2xl">▶</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-2">No hay partidos finalizados</h3>
                  <p className="text-gray-400">Los resultados aparecerán aquí</p>
                </div>
              )}
            </div>
          )}

          {/* Partidos en vivo (tab) */}
          {activeTab === 'live' && (
            matchesData.live.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterByCompetition(matchesData.live).map((match) => (
                  <Link href={`/partidos/${match.id}`} key={match.id}>
                    <div className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border-2 border-red-500/50 hover:border-red-500 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                          EN VIVO
                        </span>
                        <span className="text-white font-bold">{match.time}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <img src={match.homeLogo} alt={match.home} className="w-12 h-12 mx-auto mb-2 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                          <p className="font-bold">{match.home}</p>
                        </div>

                        <div className="text-3xl font-black text-green-400 mx-4">
                          {match.homeScore ?? 0} - {match.awayScore ?? 0}
                        </div>

                        <div className="text-center flex-1">
                          <img src={match.awayLogo} alt={match.away} className="w-12 h-12 mx-auto mb-2 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} />
                          <p className="font-bold">{match.away}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚽</div>
                <h3 className="text-2xl font-bold mb-2">No hay partidos en vivo ahora</h3>
                <p className="text-gray-400">Los partidos en vivo aparecerán aquí cuando comiencen</p>
              </div>
            )
          )}

        </div>
      </section>
    </div>
  );
}

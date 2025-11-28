'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { competitionsApi } from '../../../../lib/api';

// Interfaces
interface Competition {
  id: number;
  name: string;
  logo: string;
  country: string;
  season: string;
}

interface TeamStanding {
  position: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

interface TopScorer {
  player: {
    id: number;
    name: string;
    photo: string;
    nationality: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  goals: number;
  assists: number;
  matches: number;
}

interface Match {
  id: number;
  date: string;
  timestamp: number;
  venue: {
    name: string;
    city: string;
  };
  status: {
    short: string;
    long: string;
  };
  homeTeam: {
    id: number;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

export default function CompeticionDetalle() {
  const params = useParams();
  const compId = Number(params.id);

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tabla' | 'partidos' | 'goleadores'>('tabla');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener datos de la competición
        const compData = await competitionsApi.getById(compId);
        setCompetition(compData);

        // Obtener tabla de posiciones
        const standingsData = await competitionsApi.getStandings(compId);
        setStandings(standingsData.standings || []);

        // Obtener goleadores
        try {
          const scorersData = await competitionsApi.getTopScorers(compId);
          setTopScorers(scorersData || []);
        } catch (err) {
          console.error('Error fetching top scorers:', err);
          setTopScorers([]);
        }

        // Obtener próximos partidos
        try {
          const matchesData = await competitionsApi.getUpcomingMatches(compId);
          setUpcomingMatches(matchesData || []);
        } catch (err) {
          console.error('Error fetching matches:', err);
          setUpcomingMatches([]);
        }
      } catch (err) {
        console.error('Error fetching competition data:', err);
        setError('Error al cargar los datos de la competición. Verifica que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }
    };

    if (compId) {
      fetchData();
    }
  }, [compId]);

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Función para formatear hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando competición...</p>
        </div>
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-400 mb-4">{error || 'No se encontró la competición'}</p>
          <Link
            href="/competiciones"
            className="bg-green-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors"
          >
            Volver a competiciones
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="text-green-400 font-semibold">{competition.name}</span>
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
              {competition.logo ? (
                <img src={competition.logo} alt={competition.name} className="w-24 h-24 object-contain" />
              ) : (
                <span className="text-7xl">🏆</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-500 text-black text-sm font-bold px-4 py-1.5 rounded-full">
                  {competition.season}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{competition.country}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {competition.name}
              </h1>

              {/* Stats rápidas */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                  <span className="text-gray-400 text-sm">Equipos: </span>
                  <span className="text-white font-bold">{standings.length}</span>
                </div>
                {standings.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                    <span className="text-gray-400 text-sm">Líder: </span>
                    <span className="text-white font-bold">{standings[0]?.team.name}</span>
                  </div>
                )}
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
              {standings.length > 0 ? (
                <>
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
                        {standings.map((team, index) => (
                          <tr
                            key={team.position}
                            className={`border-t border-gray-800 hover:bg-gray-800/50 transition-colors ${
                              index < 4 ? 'border-l-4 border-l-green-500' :
                              index < 6 ? 'border-l-4 border-l-blue-500' :
                              index >= standings.length - 3 ? 'border-l-4 border-l-red-500' : ''
                            }`}
                          >
                            <td className="p-4 text-center font-bold text-gray-400">{team.position}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={team.team.logo}
                                  alt={team.team.name}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text y="24" font-size="24">🏆</text></svg>';
                                  }}
                                />
                                <span className="font-bold">{team.team.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-center text-gray-400">{team.played}</td>
                            <td className="p-4 text-center text-gray-400">{team.won}</td>
                            <td className="p-4 text-center text-gray-400">{team.drawn}</td>
                            <td className="p-4 text-center text-gray-400">{team.lost}</td>
                            <td className="p-4 text-center text-gray-400">{team.goalsFor}</td>
                            <td className="p-4 text-center text-gray-400">{team.goalsAgainst}</td>
                            <td className="p-4 text-center font-bold">{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}</td>
                            <td className="p-4 text-center font-black text-green-400 text-lg">{team.points}</td>
                            <td className="p-4">
                              <div className="flex gap-1 justify-center">
                                {team.form && team.form.length > 0 ? (
                                  team.form.slice(0, 5).map((result: string, i: number) => (
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
                                  ))
                                ) : (
                                  <span className="text-gray-500 text-xs">-</span>
                                )}
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
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold mb-2">No hay datos de tabla</h3>
                  <p className="text-gray-400">La tabla de posiciones no está disponible en este momento</p>
                </div>
              )}
            </div>
          )}

          {/* PRÓXIMOS PARTIDOS */}
          {activeTab === 'partidos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingMatches.length > 0 ? (
                upcomingMatches.slice(0, 8).map((match) => (
                  <div
                    key={match.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10"
                  >
                    {/* Fecha y hora */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-400">📅</span>
                        <span className="text-gray-400">{formatDate(match.date)}</span>
                      </div>
                      <div className="bg-green-500 text-black text-sm font-bold px-4 py-1.5 rounded-full">
                        {formatTime(match.date)}
                      </div>
                    </div>

                    {/* Equipos */}
                    <div className="flex items-center justify-between mb-6">
                      {/* Local */}
                      <div className="flex-1 text-right">
                        <img
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          className="w-12 h-12 mx-auto mb-2 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><text y="36" font-size="32">🏆</text></svg>';
                          }}
                        />
                        <div className="font-bold text-lg">{match.homeTeam.name}</div>
                      </div>

                      {/* VS */}
                      <div className="mx-6">
                        <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-black text-gray-400">
                          VS
                        </div>
                      </div>

                      {/* Visitante */}
                      <div className="flex-1 text-left">
                        <img
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          className="w-12 h-12 mx-auto mb-2 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><text y="36" font-size="32">🏆</text></svg>';
                          }}
                        />
                        <div className="font-bold text-lg">{match.awayTeam.name}</div>
                      </div>
                    </div>

                    {/* Estadio */}
                    <div className="text-center pt-4 border-t border-gray-800">
                      <span className="text-sm text-gray-400">🏟️ {match.venue.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-2xl font-bold mb-2">No hay partidos programados</h3>
                  <p className="text-gray-400">Los próximos partidos aparecerán aquí</p>
                </div>
              )}
            </div>
          )}

          {/* TABLA DE GOLEADORES */}
          {activeTab === 'goleadores' && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800">
              {topScorers.length > 0 ? (
                <>
                  <div className="p-6 bg-gray-800/30 border-b border-gray-800">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <span>⚽</span>
                      Top Goleadores de la Temporada
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {topScorers.map((scorer, index) => (
                        <div
                          key={`${scorer.player.id}-${index}`}
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
                            {index + 1}
                          </div>

                          {/* Foto del jugador */}
                          <img
                            src={scorer.player.photo}
                            alt={scorer.player.name}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><text y="36" font-size="32">👤</text></svg>';
                            }}
                          />

                          {/* Logo del equipo */}
                          <img
                            src={scorer.team.logo}
                            alt={scorer.team.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><text y="30" font-size="28">🏆</text></svg>';
                            }}
                          />

                          {/* Info del jugador */}
                          <div className="flex-1">
                            <div className="font-bold text-lg">{scorer.player.name}</div>
                            <div className="text-sm text-gray-400">{scorer.team.name}</div>
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
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⚽</div>
                  <h3 className="text-2xl font-bold mb-2">No hay datos de goleadores</h3>
                  <p className="text-gray-400">Los goleadores no están disponibles en este momento</p>
                </div>
              )}
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
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { transfersApi } from '../../../lib/api';

interface Transfer {
  id: number;
  player: string;
  playerImage: string;
  position: string;
  age: number;
  fromTeam: string;
  fromLogo: string;
  toTeam: string;
  toLogo: string;
  fee: string;
  date: string;
  type: string;
  league: string;
  featured: boolean;
  stats: string;
}

const transferTypes = [
  { name: "Todos", icon: "🌍" },
  { name: "Fichaje", icon: "✍️" },
  { name: "Préstamo", icon: "🔄" },
  { name: "Libre", icon: "🆓" }
];

const leagues = [
  { name: "Todas las ligas", icon: "🌍" },
  { name: "La Liga", icon: "🇪🇸" },
  { name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Serie A", icon: "🇮🇹" },
  { name: "Bundesliga", icon: "🇩🇪" },
  { name: "Ligue 1", icon: "🇫🇷" }
];

export default function FichajesPage() {
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedLeague, setSelectedLeague] = useState("Todas las ligas");
  const [searchTerm, setSearchTerm] = useState("");
  const [allTransfersData, setAllTransfersData] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar fichajes
  useEffect(() => {
    const fetchTransfers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await transfersApi.getAll();
        const transfers = Array.isArray(response) ? response : [];

        // Transformar datos
        const transformedTransfers: Transfer[] = transfers.map((item: any) => ({
          id: item.id,
          player: item.player?.name || item.playerName || 'Jugador',
          playerImage: item.player?.photo || item.playerImage || '⚽',
          position: item.player?.position || item.position || 'Jugador',
          age: item.player?.age || item.age || 25,
          fromTeam: item.fromTeam?.name || item.fromTeam || 'Equipo origen',
          fromLogo: item.fromTeam?.logo || item.fromLogo || '🏠',
          toTeam: item.toTeam?.name || item.toTeam || 'Equipo destino',
          toLogo: item.toTeam?.logo || item.toLogo || '🏟️',
          fee: item.fee || item.amount || 'Por definir',
          date: item.date || new Date().toLocaleDateString('es-ES'),
          type: item.type || 'Fichaje',
          league: item.league || item.competition || 'Liga',
          featured: item.featured || false,
          stats: item.stats || ''
        }));

        setAllTransfersData(transformedTransfers);
      } catch (err) {
        console.error('Error fetching transfers:', err);
        setError('Error al cargar los fichajes. Verifica que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const filteredTransfers = allTransfersData.filter(transfer => {
    const matchType = selectedType === "Todos" || transfer.type === selectedType;
    const matchLeague = selectedLeague === "Todas las ligas" || transfer.league === selectedLeague;
    const matchSearch = transfer.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       transfer.fromTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       transfer.toTeam.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchLeague && matchSearch;
  });

  const featuredTransfers = allTransfersData.filter(t => t.featured).slice(0, 3);

  // Calcular estadísticas del mercado
  const totalFichajes = allTransfersData.length;
  const prestamos = allTransfersData.filter(t => t.type === 'Préstamo').length;
  const libres = allTransfersData.filter(t => t.type === 'Libre' || t.fee === 'Libre').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando fichajes...</p>
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

      {/* Breadcrumb */}
      <div className="border-b border-gray-800/50 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">Inicio</Link>
            <span className="text-gray-600">▶</span>
            <span className="text-green-400 font-semibold">Fichajes</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Mercado de Fichajes
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg ml-5">Últimas transferencias del mercado mundial de fútbol</p>
          </div>

          {/* Fichajes Destacados */}
          {featuredTransfers.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {featuredTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 transform hover:scale-[1.02]"
                >
                  {/* Background decorativo */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]"></div>

                  {/* Header */}
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {transfer.type}
                      </span>
                      <span className="text-xs text-gray-400">{transfer.date}</span>
                    </div>

                    {/* Jugador */}
                    <div className="text-center mb-6">
                      {transfer.playerImage.startsWith('http') ? (
                        <img src={transfer.playerImage} alt={transfer.player} className="w-16 h-16 mx-auto mb-3 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="text-6xl mb-3">{transfer.playerImage}</div>
                      )}
                      <h3 className="text-2xl font-black text-white group-hover:text-green-400 transition-colors mb-1">
                        {transfer.player}
                      </h3>
                      <p className="text-sm text-gray-400">{transfer.position} • {transfer.age} años</p>
                    </div>

                    {/* Transfer Flow */}
                    <div className="space-y-3">
                      {/* De */}
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">De</p>
                        <div className="flex items-center gap-2">
                          {transfer.fromLogo.startsWith('http') ? (
                            <img src={transfer.fromLogo} alt={transfer.fromTeam} className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          ) : (
                            <span className="text-2xl">{transfer.fromLogo}</span>
                          )}
                          <span className="font-bold">{transfer.fromTeam}</span>
                        </div>
                      </div>

                      {/* Flecha */}
                      <div className="flex justify-center">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                          ➜
                        </div>
                      </div>

                      {/* Hacia */}
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <p className="text-xs text-green-400 mb-1">Hacia</p>
                        <div className="flex items-center gap-2">
                          {transfer.toLogo.startsWith('http') ? (
                            <img src={transfer.toLogo} alt={transfer.toTeam} className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          ) : (
                            <span className="text-2xl">{transfer.toLogo}</span>
                          )}
                          <span className="font-bold">{transfer.toTeam}</span>
                        </div>
                      </div>
                    </div>

                    {/* Precio y Stats */}
                    <div className="mt-4 space-y-2">
                      <div className="p-2 bg-gray-800/50 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Traspaso</p>
                        <p className="text-lg font-black text-green-400">{transfer.fee}</p>
                      </div>
                      {transfer.stats && (
                        <div className="p-2 bg-gray-800/50 rounded-lg text-center text-xs">
                          <p className="text-gray-300">{transfer.stats}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Borde brillante */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/50 transition-colors duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Buscador */}
      <section className="py-6 px-4 border-y border-gray-800/50 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar jugador, equipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Filtros de Tipo */}
      <section className="sticky top-16 z-20 backdrop-blur-xl bg-black/80 border-b border-gray-800/50 shadow-lg py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {transferTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type.name
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-black shadow-lg shadow-green-500/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{type.icon}</span>
                  {type.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros de Ligas */}
      <section className="py-4 px-4 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-3 font-semibold">Filtrar por liga:</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {leagues.map((league) => (
              <button
                key={league.name}
                onClick={() => setSelectedLeague(league.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-all ${
                  selectedLeague === league.name
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{league.icon}</span>
                  {league.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Fichajes */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black">
                Todos los Fichajes
              </h2>
            </div>
            <div className="text-sm text-gray-400">
              {filteredTransfers.length} {filteredTransfers.length === 1 ? 'fichaje' : 'fichajes'}
            </div>
          </div>

          {filteredTransfers.length > 0 ? (
            <div className="space-y-4">
              {filteredTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="group bg-gradient-to-r from-gray-900 to-gray-950 rounded-xl p-5 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Izquierda - Equipo origen */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {transfer.fromLogo.startsWith('http') ? (
                        <img src={transfer.fromLogo} alt={transfer.fromTeam} className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <span className="text-3xl">{transfer.fromLogo}</span>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Desde</p>
                        <p className="font-bold text-white truncate">{transfer.fromTeam}</p>
                      </div>
                    </div>

                    {/* Centro - Jugador */}
                    <div className="flex items-center gap-2 flex-1 md:flex-none justify-center md:justify-start">
                      {transfer.playerImage.startsWith('http') ? (
                        <img src={transfer.playerImage} alt={transfer.player} className="w-8 h-8 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <span className="text-3xl">{transfer.playerImage}</span>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-white group-hover:text-green-400 transition-colors truncate">
                          {transfer.player}
                        </p>
                        <p className="text-xs text-gray-500">{transfer.position} • {transfer.age}a</p>
                      </div>
                    </div>

                    {/* Flecha */}
                    <div className="hidden md:flex justify-center">
                      <div className="text-green-400 font-bold text-xl">➜</div>
                    </div>

                    {/* Derecha - Equipo destino */}
                    <div className="flex items-center gap-3 flex-1 min-w-0 justify-end md:justify-start">
                      {transfer.toLogo.startsWith('http') ? (
                        <img src={transfer.toLogo} alt={transfer.toTeam} className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <span className="text-3xl">{transfer.toLogo}</span>
                      )}
                      <div className="min-w-0 text-right md:text-left">
                        <p className="text-xs text-green-400">Hacia</p>
                        <p className="font-bold text-white truncate">{transfer.toTeam}</p>
                      </div>
                    </div>

                    {/* Detalles */}
                    <div className="flex gap-3 flex-wrap md:flex-nowrap justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Traspaso</p>
                        <p className="font-bold text-green-400">{transfer.fee}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Tipo</p>
                        <span className={`text-sm font-bold ${
                          transfer.type === 'Fichaje' ? 'text-green-400' :
                          transfer.type === 'Préstamo' ? 'text-blue-400' : 'text-orange-400'
                        }`}>
                          {transfer.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No se encontraron fichajes</h3>
              <p className="text-gray-400">Intenta con otros filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      </section>

      {/* Estadísticas del mercado */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent to-green-500/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            Estadísticas del Mercado
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total de Fichajes", value: totalFichajes, icon: "📊" },
              { label: "Inversión Total", value: "Calculando...", icon: "💰" },
              { label: "Préstamos", value: prestamos, icon: "🔄" },
              { label: "Transferencias Libres", value: libres, icon: "🆓" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-black text-green-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botón volver */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 border border-gray-700 hover:border-green-500 text-white hover:text-black font-bold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span>◀</span>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

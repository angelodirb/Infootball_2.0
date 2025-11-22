// Frontend - components/FeaturedMatches.tsx - VERSION PARA REEMPLAZAR LA ACTUAL

'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { matchesApi } from '@/lib/api';

interface Team {
  name: string;
  logo: string;
  shortName: string;
}

interface Competition {
  name: string;
  logo: string;
  country: string;
}

interface Match {
  externalId: string;
  matchDate: string;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'halftime' | 'finished';
  venue: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: Competition;
}

// Generar fechas para navegación
const generateNavigationDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    let label;
    if (i === -1) label = 'AYER';
    else if (i === 0) label = 'HOY';
    else if (i === 1) label = 'MAÑANA';
    else {
      const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
      label = `${dayNames[date.getDay()]} ${date.getDate()}`;
    }
    
    dates.push({
      label,
      value: date.toISOString().split('T')[0],
      isToday: i === 0
    });
  }
  
  return dates;
};

export default function FeaturedMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDateIndex, setSelectedDateIndex] = useState(3); // Índice de "HOY"
  const [dates] = useState(generateNavigationDates());

  useEffect(() => {
    loadFeaturedMatches();
  }, [selectedDate]);

  const loadFeaturedMatches = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await matchesApi.getByDate(selectedDate);
      if (response.success) {
        // Tomar solo los primeros 4 partidos para la sección destacado
        const featuredMatches = response.data?.slice(0, 4) || [];
        setMatches(featuredMatches);
      } else {
        throw new Error(response.error || 'Error al cargar partidos');
      }
    } catch (error) {
      console.error('Error loading featured matches:', error);
      setError('Error al cargar partidos');
      setMatches([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDateSelect = (dateValue: string, index: number) => {
    setSelectedDate(dateValue);
    setSelectedDateIndex(index);
  };

  const handlePrevDate = () => {
    if (selectedDateIndex > 0) {
      const newIndex = selectedDateIndex - 1;
      setSelectedDateIndex(newIndex);
      setSelectedDate(dates[newIndex].value);
    }
  };

  const handleNextDate = () => {
    if (selectedDateIndex < dates.length - 1) {
      const newIndex = selectedDateIndex + 1;
      setSelectedDateIndex(newIndex);
      setSelectedDate(dates[newIndex].value);
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight text-gray-900">
          Destacado
        </h2>
        
        {/* Skeleton loader */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex gap-2 flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-5 py-3 bg-gray-200 rounded-lg animate-pulse w-20 h-12"></div>
            ))}
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-xl p-5 animate-pulse">
              <div className="h-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight text-gray-900">
          Destacado
        </h2>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">❌ {error}</p>
          <button
            onClick={loadFeaturedMatches}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight text-gray-900">
        Destacado
      </h2>

      {/* Navegación de fechas */}
      <div className="flex items-center gap-3 mb-8">
        <button 
          onClick={handlePrevDate}
          disabled={selectedDateIndex === 0}
          className={`p-3 rounded-full transition-all duration-200 ${
            selectedDateIndex === 0 
              ? 'text-gray-300 cursor-not-allowed bg-gray-100' 
              : 'hover:bg-gray-200 text-gray-700 active:scale-95'
          }`}
          aria-label="Fecha anterior"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        <div className="flex gap-2 flex-1 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(date.value, index)}
              className={`px-5 py-3 rounded-lg font-bold text-sm uppercase whitespace-nowrap transition-all duration-200 ${
                selectedDateIndex === index
                  ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                  : date.isToday
                  ? 'bg-green-100 text-green-800 border-2 border-green-500 hover:bg-green-200'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
              }`}
            >
              {date.label}
            </button>
          ))}
        </div>

        <button 
          onClick={handleNextDate}
          disabled={selectedDateIndex === dates.length - 1}
          className={`p-3 rounded-full transition-all duration-200 ${
            selectedDateIndex === dates.length - 1
              ? 'text-gray-300 cursor-not-allowed bg-gray-100' 
              : 'hover:bg-gray-200 text-gray-700 active:scale-95'
          }`}
          aria-label="Fecha siguiente"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Partidos */}
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {matches.map((match) => (
            <div
              key={match.externalId}
              className="bg-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-gray-300"
            >
              {/* Badge de competición */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs">{match.competition.logo || '⚽'}</span>
                  <span className="text-xs text-gray-600 truncate font-medium">
                    {match.competition.name}
                  </span>
                </div>
                {match.status === 'live' && (
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    LIVE
                  </div>
                )}
              </div>

              {/* Equipo Local */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 relative flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
                  <img
                    src={match.homeTeam.logo}
                    alt={`Logo de ${match.homeTeam.name}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" fill="%23e5e7eb"/><text x="50%" y="50%" font-size="20" text-anchor="middle" dy=".3em">⚽</text></svg>';
                    }}
                  />
                </div>
                <span className="font-bold text-sm text-gray-800 truncate flex-1">
                  {match.homeTeam.name}
                </span>
              </div>

              {/* Hora del partido o Resultado */}
              <div className="text-center py-4 mb-4 bg-white rounded-lg shadow-sm">
                {match.status === 'finished' && match.homeScore !== undefined && match.awayScore !== undefined ? (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-black text-gray-800">{match.homeScore}</span>
                    <span className="text-gray-400 font-bold">-</span>
                    <span className="text-2xl font-black text-gray-800">{match.awayScore}</span>
                  </div>
                ) : match.status === 'live' ? (
                  <>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-2xl font-black text-red-600">{match.homeScore ?? 0}</span>
                      <span className="text-red-400 font-bold">-</span>
                      <span className="text-2xl font-black text-red-600">{match.awayScore ?? 0}</span>
                    </div>
                    <div className="text-xs font-bold text-red-600 uppercase tracking-wide">
                      • En Vivo •
                    </div>
                  </>
                ) : (
                  <span className="text-2xl font-black text-gray-800">{formatTime(match.matchDate)}</span>
                )}
              </div>

              {/* Equipo Visitante */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 relative flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
                  <img
                    src={match.awayTeam.logo}
                    alt={`Logo de ${match.awayTeam.name}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" fill="%23e5e7eb"/><text x="50%" y="50%" font-size="20" text-anchor="middle" dy=".3em">⚽</text></svg>';
                    }}
                  />
                </div>
                <span className="font-bold text-sm text-gray-800 truncate flex-1">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-xl text-gray-600 mb-2">No hay partidos programados</p>
          <p className="text-gray-500">para esta fecha</p>
        </div>
      )}

      {/* Ver más */}
      {matches.length > 0 && (
        <div className="text-center mt-8">
          <a
            href="/partidos"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Ver todos los partidos
            <ChevronRight size={20} />
          </a>
        </div>
      )}
    </section>
  );
}
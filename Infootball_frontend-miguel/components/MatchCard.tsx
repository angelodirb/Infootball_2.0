import Image from 'next/image';
import { Match } from '@/types';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-gray-300">
      {/* Equipo Local */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 relative flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
          <Image
            src={match.homeTeam.logo}
            alt={`Logo de ${match.homeTeam.name}`}
            width={36}
            height={36}
            className="object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" fill="%23e5e7eb"/><text x="50%" y="50%" font-size="24" text-anchor="middle" dy=".3em">⚽</text></svg>';
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
            <span className="text-3xl font-black text-gray-800">{match.homeScore}</span>
            <span className="text-gray-400 font-bold">-</span>
            <span className="text-3xl font-black text-gray-800">{match.awayScore}</span>
          </div>
        ) : match.status === 'live' ? (
          <>
            <span className="text-3xl font-black text-red-600">{match.time}</span>
            <div className="text-xs font-bold text-red-600 mt-1 uppercase tracking-wide">
              • En Vivo •
            </div>
          </>
        ) : (
          <span className="text-3xl font-black text-gray-800">{match.time}</span>
        )}
      </div>

      {/* Equipo Visitante */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 relative flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
          <Image
            src={match.awayTeam.logo}
            alt={`Logo de ${match.awayTeam.name}`}
            width={36}
            height={36}
            className="object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" fill="%23e5e7eb"/><text x="50%" y="50%" font-size="24" text-anchor="middle" dy=".3em">⚽</text></svg>';
            }}
          />
        </div>
        <span className="font-bold text-sm text-gray-800 truncate flex-1">
          {match.awayTeam.name}
        </span>
      </div>

      {/* Badge de competición */}
      {match.competition && (
        <div className="mt-4 pt-3 border-t border-gray-300">
          <span className="text-xs font-semibold text-gray-600 flex items-center gap-2">
            <span className="text-base">{match.competition.logo}</span>
            <span className="truncate">{match.competition.name}</span>
          </span>
        </div>
      )}
    </div>
  );
}

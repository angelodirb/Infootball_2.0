import { Match, Team, Competition } from '@/types';

// Equipos de ejemplo
export const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Barcelona',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    country: 'España'
  },
  {
    id: 2,
    name: 'Real Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    country: 'España'
  },
  {
    id: 3,
    name: 'Manchester United',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    country: 'Inglaterra'
  },
  {
    id: 4,
    name: 'Bayern Munich',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    country: 'Alemania'
  },
  {
    id: 5,
    name: 'PSG',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    country: 'Francia'
  }
];

// Competiciones de ejemplo
export const mockCompetitions: Competition[] = [
  {
    id: 1,
    name: 'La Liga',
    logo: '🇪🇸',
    country: 'España',
    season: '2024/2025'
  },
  {
    id: 2,
    name: 'Premier League',
    logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    country: 'Inglaterra',
    season: '2024/2025'
  },
  {
    id: 3,
    name: 'Champions League',
    logo: '⭐',
    country: 'Europa',
    season: '2024/2025'
  }
];

// Partidos de ejemplo
export const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: mockTeams[0], // Barcelona
    awayTeam: mockTeams[1], // Real Madrid
    date: '2024-10-23',
    time: '10:00',
    status: 'scheduled',
    competition: mockCompetitions[0]
  },
  {
    id: 2,
    homeTeam: mockTeams[2], // Manchester United
    awayTeam: mockTeams[3], // Bayern Munich
    date: '2024-10-23',
    time: '14:30',
    status: 'scheduled',
    competition: mockCompetitions[2]
  },
  {
    id: 3,
    homeTeam: mockTeams[4], // PSG
    awayTeam: mockTeams[0], // Barcelona
    date: '2024-10-23',
    time: '18:00',
    status: 'scheduled',
    competition: mockCompetitions[2]
  },
  {
    id: 4,
    homeTeam: mockTeams[1], // Real Madrid
    awayTeam: mockTeams[2], // Manchester United
    date: '2024-10-23',
    time: '20:45',
    status: 'scheduled',
    competition: mockCompetitions[2]
  },
  {
    id: 5,
    homeTeam: mockTeams[3], // Bayern Munich
    awayTeam: mockTeams[4], // PSG
    date: '2024-10-24',
    time: '15:00',
    status: 'scheduled',
    competition: mockCompetitions[2]
  },
  {
    id: 6,
    homeTeam: mockTeams[0], // Barcelona
    awayTeam: mockTeams[3], // Bayern Munich
    date: '2024-10-24',
    time: '17:30',
    status: 'scheduled',
    competition: mockCompetitions[0]
  }
];

// Fechas de navegación
export const mockDates = [
  { label: 'Lun 21', value: '2024-10-21' },
  { label: 'Mar 22', value: '2024-10-22' },
  { label: 'Ayer', value: '2024-10-22' },
  { label: 'Hoy', value: '2024-10-23' },
  { label: 'Mañana', value: '2024-10-24' },
  { label: 'Sab 26', value: '2024-10-26' },
  { label: 'Dom 27', value: '2024-10-27' },
  { label: 'Lun 28', value: '2024-10-28' }
];

// Función helper para obtener partidos por fecha
export function getMatchesByDate(date: string): Match[] {
  return mockMatches.filter(match => match.date === date);
}

// Función helper para obtener fecha de hoy
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

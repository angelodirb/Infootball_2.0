// Types para Equipos
export interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
}

// Types para Partidos
export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  competition: Competition;
}

// Types para Competiciones
export interface Competition {
  id: number;
  name: string;
  logo: string;
  country: string;
  season: string;
}

// Types para Noticias
export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  source: string;
  date: string;
  category: string;
}

// Types para Jugadores
export interface Player {
  id: number;
  name: string;
  photo: string;
  position: string;
  nationality: string;
  age: number;
  currentTeam: Team;
  marketValue: string;
  contractUntil: string;
}

// Types para Fichajes
export interface Transfer {
  id: number;
  player: Player;
  fromTeam: Team;
  toTeam: Team;
  fee: string;
  date: string;
  season: string;
}

// Types para Tabla de Posiciones
export interface StandingEntry {
  position: number;
  team: Team;
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

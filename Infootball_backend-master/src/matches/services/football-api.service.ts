// backend/src/matches/services/football-api.service.ts - VERSION FINAL CORREGIDA
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface FootballApiMatch {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      long: string;
    };
    venue: {
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    logo: string;
    country: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
  };
}

@Injectable()
export class FootballApiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  
  // Cache simple para evitar muchas requests
  private cache = new Map();
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('FOOTBALL_API_KEY');
    this.apiUrl = this.configService.get<string>('FOOTBALL_API_URL') || 'https://v3.football.api-sports.io';
  }

  private async makeApiCall(endpoint: string): Promise<any> {
    try {
      console.log(`🚀 Calling API Football: ${this.apiUrl}${endpoint}`);
      
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'x-apisports-key': this.apiKey, // ✅ HEADER CORRECTO
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Football error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Log para debug
      console.log(`✅ API Response:`, {
        endpoint,
        results: data.results || 0,
        errors: data.errors || [],
      });

      return data.response || [];
    } catch (error) {
      console.error('❌ Error calling API Football:', error);
      throw error;
    }
  }

  private async getCachedData(key: string, fetchFn: () => Promise<any>): Promise<any> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log(`💾 Using cached data for: ${key}`);
      return cached.data;
    }
    
    const data = await fetchFn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  // Obtener partidos en vivo
  async getLiveMatches(): Promise<FootballApiMatch[]> {
    return await this.getCachedData('live-matches', () => 
      this.makeApiCall('/fixtures?live=all')
    );
  }

  // Obtener partidos por fecha
  async getMatchesByDate(date: string): Promise<FootballApiMatch[]> {
    return await this.getCachedData(`matches-${date}`, () =>
      this.makeApiCall(`/fixtures?date=${date}`)
    );
  }

  // Obtener partidos de hoy
  async getTodayMatches(): Promise<FootballApiMatch[]> {
    const today = new Date().toISOString().split('T')[0];
    return await this.getMatchesByDate(today);
  }

  // Obtener partidos por rango de fechas
  async getMatchesByDateRange(from: string, to: string): Promise<FootballApiMatch[]> {
    return await this.getCachedData(`matches-range-${from}-${to}`, () =>
      this.makeApiCall(`/fixtures?from=${from}&to=${to}`)
    );
  }

  // Obtener partidos de ligas específicas
  async getMatchesByLeagues(leagues: number[] = [39, 140, 135, 61, 78], date?: string): Promise<FootballApiMatch[]> {
    const leagueParam = leagues.join('-');
    const dateParam = date ? `&date=${date}` : '';
    const cacheKey = `matches-leagues-${leagueParam}${date ? `-${date}` : ''}`;
    
    return await this.getCachedData(cacheKey, () =>
      this.makeApiCall(`/fixtures?league=${leagueParam}${dateParam}`)
    );
  }

  // Obtener partidos destacados (las 5 grandes ligas)
  async getFeaturedMatches(): Promise<FootballApiMatch[]> {
    const today = new Date().toISOString().split('T')[0];
    return await this.getMatchesByLeagues([39, 140, 135, 61, 78], today);
  }

  // Test de conexión
  async testConnection(): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/status`, {
        method: 'GET',
        headers: {
          'x-apisports-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('🔍 API Football Status:', data);
      return data;
    } catch (error) {
      console.error('❌ API Football connection test failed:', error);
      throw error;
    }
  }

  // Convertir estado de API Football a nuestro formato
  mapMatchStatus(status: string): 'scheduled' | 'live' | 'halftime' | 'finished' {
    switch (status) {
      case 'NS': return 'scheduled';
      case '1H':
      case '2H': return 'live';
      case 'HT': return 'halftime';
      case 'FT':
      case 'AET':
      case 'PEN': return 'finished';
      default: return 'scheduled';
    }
  }

  // Convertir partido de API Football a nuestro formato
  transformMatch(apiMatch: FootballApiMatch) {
    return {
      externalId: apiMatch.fixture.id.toString(),
      matchDate: new Date(apiMatch.fixture.date),
      homeScore: apiMatch.goals.home,
      awayScore: apiMatch.goals.away,
      status: this.mapMatchStatus(apiMatch.fixture.status.short),
      venue: apiMatch.fixture.venue?.name || 'TBD',
      round: null,
      homeTeam: {
        externalId: apiMatch.teams.home.id.toString(),
        name: apiMatch.teams.home.name,
        logo: apiMatch.teams.home.logo,
        shortName: apiMatch.teams.home.name.substring(0, 3).toUpperCase(),
      },
      awayTeam: {
        externalId: apiMatch.teams.away.id.toString(),
        name: apiMatch.teams.away.name,
        logo: apiMatch.teams.away.logo,
        shortName: apiMatch.teams.away.name.substring(0, 3).toUpperCase(),
      },
      competition: {
        externalId: apiMatch.league.id.toString(),
        name: apiMatch.league.name,
        logo: apiMatch.league.logo,
        country: apiMatch.league.country,
      },
    };
  }
}
// Backend - src/common/services/football-api.service.ts - CONFIGURACIÓN ACTUALIZADA

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FootballApiService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    // API-Football v3 oficial via API-Sports (no RapidAPI)
    this.apiUrl = 'https://v3.football.api-sports.io';
    this.apiKey = this.configService.get<string>('FOOTBALL_API_KEY') || 'cd7a7fe458580ba9113efd21e987f783';
  }

  /**
   * Headers para API-Sports directo (NO RapidAPI)
   */
  private getHeaders() {
    return {
      'x-apisports-key': this.apiKey,
    };
  }

  /**
   * Test de conexión con API-Football
   */
  async testConnection(): Promise<any> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          message: 'API Key not configured',
          data: null,
        };
      }

      console.log('🧪 Testing API connection with key:', this.apiKey.substring(0, 8) + '...');

      const response = await fetch(`${this.apiUrl}/status`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();
      console.log('🧪 API response status:', response.status);
      console.log('🧪 API response data:', data);

      return {
        success: response.ok,
        message: response.ok ? 'API Football connection successful' : 'API connection failed',
        data: data.response || data,
        status: response.status,
      };
    } catch (error) {
      console.error('❌ API connection error:', error);
      return {
        success: false,
        message: 'Error connecting to API Football',
        data: { error: error.message },
      };
    }
  }

  /**
   * Obtener TODOS los partidos en vivo
   */
  async getLiveMatches(): Promise<any> {
    try {
      if (!this.apiKey) {
        throw new Error('API Key not configured');
      }

      console.log('🔴 Fetching live matches...');
      
      const response = await fetch(`${this.apiUrl}/fixtures?live=all`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      console.log('🔴 Live matches response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔴 Live matches error response:', errorText);
        throw new Error(`API responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('🔴 Live matches found:', data.results || 0);
      console.log('🔴 Live matches data structure:', JSON.stringify(data, null, 2));

      return data.response || [];
    } catch (error) {
      console.error('❌ Error fetching live matches:', error);
      return [];
    }
  }

  /**
   * Obtener partidos por fecha específica
   */
  async getMatchesByDate(date: string): Promise<any> {
    try {
      if (!this.apiKey) {
        throw new Error('API Key not configured');
      }

      console.log('📅 Fetching matches for date:', date);

      const response = await fetch(`${this.apiUrl}/fixtures?date=${date}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      console.log('📅 Matches by date response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('📅 Matches by date error response:', errorText);
        throw new Error(`API responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('📅 Matches found for', date, ':', data.results || 0);

      return data.response || [];
    } catch (error) {
      console.error('❌ Error fetching matches by date:', error);
      return [];
    }
  }

  /**
   * Obtener partidos destacados de ligas principales
   */
  async getFeaturedMatches(): Promise<any> {
    try {
      if (!this.apiKey) {
        throw new Error('API Key not configured');
      }

      console.log('⭐ Fetching featured matches...');

      // Buscar partidos de hoy y próximos 3 días
      const dates = [];
      for (let i = 0; i < 4; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }

      // IDs de las ligas principales europeas según documentación API-Football
      const mainLeagues = [39, 140, 135, 78, 61]; // Premier, La Liga, Serie A, Bundesliga, Ligue 1

      // Buscar partidos en los próximos días
      for (const date of dates) {
        console.log('⭐ Checking date:', date);
        
        // Probar primero sin filtro de liga
        const response = await fetch(`${this.apiUrl}/fixtures?date=${date}&limit=10`, {
          method: 'GET',
          headers: this.getHeaders(),
        });

        console.log('⭐ Featured response status for', date, ':', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('⭐ Featured error for', date, ':', errorText);
          continue;
        }

        const data = await response.json();
        console.log('⭐ Matches found for', date, ':', data.results || 0);
        
        if (data.response && data.response.length > 0) {
          // Filtrar por ligas principales si hay datos
          const filteredMatches = data.response.filter((match: any) => 
            mainLeagues.includes(match.league.id)
          );
          
          if (filteredMatches.length > 0) {
            console.log('⭐ Featured matches from main leagues:', filteredMatches.length);
            return filteredMatches.slice(0, 6);
          } else {
            // Si no hay de ligas principales, devolver algunos de cualquier liga
            console.log('⭐ No main league matches, returning any matches:', data.response.length);
            return data.response.slice(0, 6);
          }
        }
      }

      console.log('⭐ No featured matches found in next 4 days');
      return [];
    } catch (error) {
      console.error('❌ Error fetching featured matches:', error);
      return [];
    }
  }

  /**
   * Obtener información de una liga específica
   */
  async getLeagueInfo(leagueId: number): Promise<any> {
    try {
      if (!this.apiKey) {
        throw new Error('API Key not configured');
      }

      const response = await fetch(`${this.apiUrl}/leagues?id=${leagueId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch league info: ${response.status}`);
      }

      const data = await response.json();
      return data.response || [];
    } catch (error) {
      console.error('❌ Error fetching league info:', error);
      return [];
    }
  }

  /**
   * Obtener todas las ligas disponibles (para debugging)
   */
  async getAvailableLeagues(): Promise<any> {
    try {
      if (!this.apiKey) {
        throw new Error('API Key not configured');
      }

      console.log('🔍 Fetching available leagues...');
      
      const response = await fetch(`${this.apiUrl}/leagues?season=2024`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      console.log('🔍 Leagues response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔍 Leagues error response:', errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log('🔍 Available leagues found:', data.results || 0);
      return data.response || [];
    } catch (error) {
      console.error('❌ Error fetching available leagues:', error);
      return [];
    }
  }
}
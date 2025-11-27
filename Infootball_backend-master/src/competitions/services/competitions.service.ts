import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompetitionsService {
  private readonly apiUrl = 'https://v3.football.api-sports.io';

  constructor(private configService: ConfigService) {}

  private getApiKey(): string {
    const key = this.configService.get<string>('API_FOOTBALL_KEY') || '';
    return key;
  }

  private async fetchFromApi(endpoint: string, params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.apiUrl}${endpoint}${queryString ? '?' + queryString : ''}`;
    const apiKey = this.getApiKey();

    console.log('API Key length:', apiKey.length);
    console.log('API Key first 4 chars:', apiKey.substring(0, 4));
    console.log('Fetching URL:', url);

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': apiKey,
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      console.log('Error response:', errorBody);
      throw new HttpException('Error al obtener datos de API-FOOTBALL', HttpStatus.BAD_GATEWAY);
    }

    const data = await response.json();
    return data.response;
  }

  async findAllFromApi(country?: string) {
    const params: Record<string, string> = {
      current: 'true',
      type: 'league',
    };
    
    if (country) {
      params.country = country;
    }

    const leagues = await this.fetchFromApi('/leagues', params);
    
    return leagues.map((item: any) => ({
      id: item.league.id,
      name: item.league.name,
      logo: item.league.logo,
      country: item.country.name,
      countryFlag: item.country.flag,
      type: item.league.type,
      season: item.seasons?.[0]?.year?.toString() || '2024',
      isActive: item.seasons?.[0]?.current || false,
    }));
  }

  async findOneFromApi(id: string) {
    const leagues = await this.fetchFromApi('/leagues', { id });
    
    if (!leagues || leagues.length === 0) {
      throw new HttpException('Competición no encontrada', HttpStatus.NOT_FOUND);
    }

    const item = leagues[0];
    return {
      id: item.league.id,
      name: item.league.name,
      logo: item.league.logo,
      country: item.country.name,
      countryFlag: item.country.flag,
      type: item.league.type,
      season: item.seasons?.[0]?.year?.toString() || '2024',
      isActive: item.seasons?.[0]?.current || false,
    };
  }

  async getStandings(id: string, season?: string) {
    // Si no se proporciona temporada, obtener la más reciente disponible para esta liga
    let currentSeason = season;

    if (!currentSeason) {
      const leagueInfo = await this.findOneFromApi(id);
      currentSeason = leagueInfo.season;
    }

    const standings = await this.fetchFromApi('/standings', {
      league: id,
      season: currentSeason,
    });

    if (!standings || standings.length === 0) {
      return { standings: [] };
    }

    const leagueData = standings[0].league;
    
    return {
      competition: {
        id: leagueData.id,
        name: leagueData.name,
        logo: leagueData.logo,
        country: leagueData.country,
        season: leagueData.season,
      },
      standings: leagueData.standings[0].map((team: any) => ({
        position: team.rank,
        team: {
          id: team.team.id,
          name: team.team.name,
          logo: team.team.logo,
        },
        played: team.all.played,
        won: team.all.win,
        drawn: team.all.draw,
        lost: team.all.lose,
        goalsFor: team.all.goals.for,
        goalsAgainst: team.all.goals.against,
        goalDifference: team.goalsDiff,
        points: team.points,
        form: team.form?.split('') || [],
      })),
    };
  }

  async getTopScorers(id: string, season?: string) {
    // Si no se proporciona temporada, obtener la más reciente disponible para esta liga
    let currentSeason = season;

    if (!currentSeason) {
      const leagueInfo = await this.findOneFromApi(id);
      currentSeason = leagueInfo.season;
    }

    const scorers = await this.fetchFromApi('/players/topscorers', {
      league: id,
      season: currentSeason,
    });

    return scorers.slice(0, 10).map((item: any) => ({
      player: {
        id: item.player.id,
        name: item.player.name,
        photo: item.player.photo,
        nationality: item.player.nationality,
      },
      team: {
        id: item.statistics[0].team.id,
        name: item.statistics[0].team.name,
        logo: item.statistics[0].team.logo,
      },
      goals: item.statistics[0].goals.total,
      assists: item.statistics[0].goals.assists || 0,
      matches: item.statistics[0].games.appearences,
    }));
  }

  async getUpcomingMatches(id: string, season?: string) {
    // Si no se proporciona temporada, obtener la más reciente disponible para esta liga
    let currentSeason = season;

    if (!currentSeason) {
      const leagueInfo = await this.findOneFromApi(id);
      currentSeason = leagueInfo.season;
    }

    const fixtures = await this.fetchFromApi('/fixtures', {
      league: id,
      season: currentSeason,
      next: '10', // Obtener los próximos 10 partidos
    });

    return fixtures.map((item: any) => ({
      id: item.fixture.id,
      date: item.fixture.date,
      timestamp: item.fixture.timestamp,
      venue: {
        name: item.fixture.venue?.name || 'Por definir',
        city: item.fixture.venue?.city || '',
      },
      status: {
        short: item.fixture.status.short,
        long: item.fixture.status.long,
      },
      homeTeam: {
        id: item.teams.home.id,
        name: item.teams.home.name,
        logo: item.teams.home.logo,
      },
      awayTeam: {
        id: item.teams.away.id,
        name: item.teams.away.name,
        logo: item.teams.away.logo,
      },
      goals: {
        home: item.goals.home,
        away: item.goals.away,
      },
    }));
  }
}
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CompetitionsService {
  private readonly apiUrl = 'https://v3.football.api-sports.io';
  private readonly apiKey = process.env.API_FOOTBALL_KEY;

  private async fetchFromApi(endpoint: string, params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.apiUrl}${endpoint}${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': this.apiKey,
      },
    });

    if (!response.ok) {
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
    const currentSeason = season || new Date().getFullYear().toString();
    
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
    const currentSeason = season || new Date().getFullYear().toString();
    
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
}
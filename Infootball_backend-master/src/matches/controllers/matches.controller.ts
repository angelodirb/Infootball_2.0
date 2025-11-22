// Backend - src/matches/controllers/matches.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MatchesService } from '../services/matches.service';
import { FootballApiService } from '../../common/services/football-api.service';
import { Match } from '../entities/match.entity';

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly footballApiService: FootballApiService,
  ) {}

  @Post()
  create(@Body() createMatchDto: Partial<Match>): Promise<Match> {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  async findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

@Get('live')
async findLive(): Promise<any> {
  const apiMatches = await this.footballApiService.getLiveMatches();
  return this.transformApiMatches(apiMatches);
}

  @Get('featured')
  async getFeatured(): Promise<any> {
    const apiMatches = await this.footballApiService.getFeaturedMatches();
    return this.transformApiMatches(apiMatches);
  }

  @Get('test-api')
  async testApi(): Promise<any> {
    return this.footballApiService.testConnection();
  }

  @Get('date')
  async findByDate(
    @Query('date') date?: string,
    @Query('start') startDate?: string,
    @Query('end') endDate?: string,
  ): Promise<any> {
    // Si se proporciona una fecha específica, usar API externa
    if (date) {
      const apiMatches = await this.footballApiService.getMatchesByDate(date);
      return this.transformApiMatches(apiMatches);
    }

    // Si se proporcionan fechas de rango, obtener partidos de la API externa
    if (startDate && endDate) {
      // Obtener partidos para cada día del rango (limitado a 7 días para no exceder límites de API)
      const start = new Date(startDate);
      const end = new Date(endDate);
      const allMatches = [];

      // Limitar a 7 días para no hacer demasiadas peticiones
      const maxDays = 7;
      let currentDate = new Date(start);
      let daysProcessed = 0;

      while (currentDate <= end && daysProcessed < maxDays) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayMatches = await this.footballApiService.getMatchesByDate(dateStr);
        allMatches.push(...dayMatches);
        currentDate.setDate(currentDate.getDate() + 1);
        daysProcessed++;
      }

      return this.transformApiMatches(allMatches);
    }

    // Por defecto, obtener partidos de hoy de la API externa
    const today = new Date().toISOString().split('T')[0];
    const apiMatches = await this.footballApiService.getMatchesByDate(today);
    return this.transformApiMatches(apiMatches);
  }

  // Transformar partidos de API externa al formato del frontend
  private transformApiMatches(apiMatches: any[]): any[] {
    return apiMatches.map((match: any) => ({
      id: match.fixture.id,
      homeTeam: {
        id: match.teams.home.id,
        name: match.teams.home.name,
        logo: match.teams.home.logo,
        country: match.league.country,
      },
      awayTeam: {
        id: match.teams.away.id,
        name: match.teams.away.name,
        logo: match.teams.away.logo,
        country: match.league.country,
      },
      date: match.fixture.date.split('T')[0],
      time: new Date(match.fixture.date).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: this.mapStatus(match.fixture.status.short),
      homeScore: match.goals.home,
      awayScore: match.goals.away,
      competition: {
        id: match.league.id,
        name: match.league.name,
        logo: match.league.logo,
        country: match.league.country,
        season: match.league.season?.toString() || '2024',
      },
    }));
  }

  private mapStatus(status: string): 'scheduled' | 'live' | 'finished' {
    switch (status) {
      case 'NS':
      case 'TBD':
      case 'PST':
        return 'scheduled';
      case '1H':
      case '2H':
      case 'HT':
      case 'ET':
      case 'BT':
      case 'P':
        return 'live';
      case 'FT':
      case 'AET':
      case 'PEN':
        return 'finished';
      default:
        return 'scheduled';
    }
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string): Promise<Match[]> {
    return this.matchesService.findByTeam(teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Match> {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchDto: Partial<Match>,
  ): Promise<Match> {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(id);
  }
}
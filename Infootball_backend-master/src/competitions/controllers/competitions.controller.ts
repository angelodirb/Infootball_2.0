// Controller/competitions.Controller.ts
import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CompetitionsService } from '../services/competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  findAll(@Query('country') country?: string) {
    return this.competitionsService.findAllFromApi(country);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionsService.findOneFromApi(id);
  }

  @Get(':id/standings')
  getStandings(@Param('id') id: string, @Query('season') season?: string) {
    return this.competitionsService.getStandings(id, season);
  }

  @Get(':id/scorers')
  getTopScorers(@Param('id') id: string, @Query('season') season?: string) {
    return this.competitionsService.getTopScorers(id, season);
  }
}
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
import { TeamsService } from '../services/teams.service';
import { Team } from '../entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: Partial<Team>): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string): Promise<Team[]> {
    return this.teamsService.search(query);
  }

  @Get('competition/:competitionId')
  findByCompetition(
    @Param('competitionId') competitionId: string,
  ): Promise<Team[]> {
    return this.teamsService.findByCompetition(competitionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: Partial<Team>,
  ): Promise<Team> {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(id);
  }
}

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
import { PlayersService } from '../services/players.service';
import { Player } from '../entities/player.entity';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: Partial<Player>): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string): Promise<Player[]> {
    return this.playersService.search(query);
  }

  @Get('top-value')
  findTopValuePlayers(@Query('limit') limit?: number): Promise<Player[]> {
    return this.playersService.findTopValuePlayers(limit);
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string): Promise<Player[]> {
    return this.playersService.findByTeam(teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: Partial<Player>,
  ): Promise<Player> {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.playersService.remove(id);
  }
}

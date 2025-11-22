// Backend - src/matches/matches.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesService } from './services/matches.service';
import { MatchesController } from './controllers/matches.controller';
import { Match } from './entities/match.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    CommonModule, // Importar CommonModule para acceder a FootballApiService
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
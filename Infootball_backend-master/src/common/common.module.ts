// Backend - src/common/common.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FootballApiService } from './services/football-api.service';

@Module({
  imports: [ConfigModule],
  providers: [FootballApiService],
  exports: [FootballApiService],
})
export class CommonModule {}
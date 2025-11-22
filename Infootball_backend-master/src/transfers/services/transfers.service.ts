import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Transfer } from '../entities/transfer.entity';

@Injectable()
export class TransfersService {
  private readonly apiUrl = 'https://v3.football.api-sports.io';

  // Popular team IDs from API-Football
  private readonly popularTeams = [
    541, // Real Madrid
    529, // Barcelona
    530, // Atletico Madrid
    50,  // Manchester City
    33,  // Manchester United
    40,  // Liverpool
    42,  // Arsenal
    47,  // Tottenham
    489, // AC Milan
    492, // Napoli
    496, // Juventus
    157, // Bayern Munich
    165, // Borussia Dortmund
    85,  // PSG
  ];

  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    private configService: ConfigService,
  ) {}

  private getApiKey(): string {
    return this.configService.get<string>('API_FOOTBALL_KEY') || process.env.API_FOOTBALL_KEY || '';
  }

  private async fetchFromApi(endpoint: string, params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.apiUrl}${endpoint}${queryString ? '?' + queryString : ''}`;
    const apiKey = this.getApiKey();

    console.log('Transfers API Key length:', apiKey.length);

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new HttpException('Error al obtener datos de API-FOOTBALL', HttpStatus.BAD_GATEWAY);
    }

    const data = await response.json();
    return data.response;
  }

  async findAllFromApi(): Promise<any[]> {
    try {
      // Fetch transfers from multiple popular teams
      const transferPromises = this.popularTeams.slice(0, 5).map(teamId =>
        this.fetchFromApi('/transfers', { team: teamId.toString() })
          .catch(() => []) // Return empty array if one team fails
      );

      const results = await Promise.all(transferPromises);

      // Flatten and transform the results
      const allTransfers: any[] = [];

      for (const teamTransfers of results) {
        for (const playerData of teamTransfers) {
          for (const transfer of playerData.transfers || []) {
            allTransfers.push({
              id: `${playerData.player.id}-${transfer.date}`,
              playerName: playerData.player.name,
              playerPhoto: playerData.player.photo,
              fromTeam: transfer.teams.out.name,
              fromTeamLogo: transfer.teams.out.logo,
              toTeam: transfer.teams.in.name,
              toTeamLogo: transfer.teams.in.logo,
              transferDate: transfer.date,
              transferType: transfer.type || 'Fichaje',
              fee: transfer.type === 'Free' ? 'Libre' : transfer.type === 'Loan' ? 'Préstamo' : 'N/A',
            });
          }
        }
      }

      // Sort by date (most recent first) and limit
      return allTransfers
        .sort((a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime())
        .slice(0, 50);
    } catch (error) {
      console.error('Error fetching transfers from API:', error);
      return [];
    }
  }

  async create(transferData: Partial<Transfer>): Promise<Transfer> {
    const transfer = this.transfersRepository.create(transferData);
    return await this.transfersRepository.save(transfer);
  }

  async findAll(): Promise<Transfer[]> {
    return await this.transfersRepository.find({
      relations: ['player', 'fromTeam', 'toTeam'],
      order: { transferDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Transfer> {
    const transfer = await this.transfersRepository.findOne({
      where: { id },
      relations: ['player', 'fromTeam', 'toTeam'],
    });

    if (!transfer) {
      throw new NotFoundException(`Fichaje con ID ${id} no encontrado`);
    }

    return transfer;
  }

  async findByPlayer(playerId: string): Promise<Transfer[]> {
    return await this.transfersRepository.find({
      where: { player: { id: playerId } },
      relations: ['player', 'fromTeam', 'toTeam'],
      order: { transferDate: 'DESC' },
    });
  }

  async findBySeason(season: string): Promise<Transfer[]> {
    return await this.transfersRepository.find({
      where: { season },
      relations: ['player', 'fromTeam', 'toTeam'],
      order: { transferFee: 'DESC' },
    });
  }

  async findTopTransfers(limit: number = 10): Promise<Transfer[]> {
    return await this.transfersRepository.find({
      relations: ['player', 'fromTeam', 'toTeam'],
      order: { transferFee: 'DESC' },
      take: limit,
    });
  }

  async update(id: string, transferData: Partial<Transfer>): Promise<Transfer> {
    await this.transfersRepository.update(id, transferData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.transfersRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Fichaje con ID ${id} no encontrado`);
    }
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Match } from '../entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
  ) {}

  async create(matchData: Partial<Match>): Promise<Match> {
    const match = this.matchesRepository.create(matchData);
    return await this.matchesRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return await this.matchesRepository.find({
      relations: ['homeTeam', 'awayTeam', 'competition'],
      order: { matchDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchesRepository.findOne({
      where: { id },
      relations: ['homeTeam', 'awayTeam', 'competition'],
    });

    if (!match) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`);
    }

    return match;
  }

  async findByDate(startDate: Date, endDate: Date): Promise<Match[]> {
    return await this.matchesRepository.find({
      where: {
        matchDate: Between(startDate, endDate),
      },
      relations: ['homeTeam', 'awayTeam', 'competition'],
      order: { matchDate: 'ASC' },
    });
  }

  async findByTeam(teamId: string): Promise<Match[]> {
    return await this.matchesRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .leftJoinAndSelect('match.competition', 'competition')
      .where('homeTeam.id = :teamId', { teamId })
      .orWhere('awayTeam.id = :teamId', { teamId })
      .orderBy('match.matchDate', 'DESC')
      .getMany();
  }

  async findLive(): Promise<Match[]> {
    return await this.matchesRepository.find({
      where: [{ status: 'live' }, { status: 'halftime' }],
      relations: ['homeTeam', 'awayTeam', 'competition'],
    });
  }

  async update(id: string, matchData: Partial<Match>): Promise<Match> {
    await this.matchesRepository.update(id, matchData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchesRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async create(playerData: Partial<Player>): Promise<Player> {
    const player = this.playersRepository.create(playerData);
    return await this.playersRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return await this.playersRepository.find({
      relations: ['team', 'transfers'],
    });
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id },
      relations: ['team', 'transfers'],
    });

    if (!player) {
      throw new NotFoundException(`Jugador con ID ${id} no encontrado`);
    }

    return player;
  }

  async findByTeam(teamId: string): Promise<Player[]> {
    return await this.playersRepository.find({
      where: { team: { id: teamId } },
      relations: ['team'],
    });
  }

  async search(query: string): Promise<Player[]> {
    return await this.playersRepository
      .createQueryBuilder('player')
      .where('player.name ILIKE :query', { query: `%${query}%` })
      .orWhere('player.firstName ILIKE :query', { query: `%${query}%` })
      .orWhere('player.lastName ILIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('player.team', 'team')
      .getMany();
  }

  async findTopValuePlayers(limit: number = 10): Promise<Player[]> {
    return await this.playersRepository.find({
      order: { marketValue: 'DESC' },
      take: limit,
      relations: ['team'],
    });
  }

  async update(id: string, playerData: Partial<Player>): Promise<Player> {
    await this.playersRepository.update(id, playerData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.playersRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Jugador con ID ${id} no encontrado`);
    }
  }
}

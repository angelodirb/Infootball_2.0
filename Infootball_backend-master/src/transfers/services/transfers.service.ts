import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../entities/transfer.entity';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
  ) {}

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

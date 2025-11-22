import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  transferDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  transferFee: number;

  @Column({
    type: 'enum',
    enum: ['permanent', 'loan', 'free'],
    default: 'permanent',
  })
  transferType: string;

  @Column({ nullable: true })
  season: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Jugador transferido
  @ManyToOne(() => Player, (player) => player.transfers)
  player: Player;

  // Equipo de origen
  @ManyToOne(() => Team)
  fromTeam: Team;

  // Equipo de destino
  @ManyToOne(() => Team)
  toTeam: Team;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

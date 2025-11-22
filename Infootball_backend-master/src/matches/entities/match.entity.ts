import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Competition } from '../../competitions/entities/competition.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  matchDate: Date;

  @Column({ type: 'int', nullable: true })
  homeScore: number;

  @Column({ type: 'int', nullable: true })
  awayScore: number;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'live', 'halftime', 'finished', 'postponed', 'cancelled'],
    default: 'scheduled',
  })
  status: string;

  @Column({ type: 'int', nullable: true })
  round: number;

  @Column({ nullable: true })
  venue: string;

  // Relación con equipo local
  @ManyToOne(() => Team, (team) => team.homeMatches)
  homeTeam: Team;

  // Relación con equipo visitante
  @ManyToOne(() => Team, (team) => team.awayMatches)
  awayTeam: Team;

  // Relación con competición
  @ManyToOne(() => Competition, (competition) => competition.matches)
  competition: Competition;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

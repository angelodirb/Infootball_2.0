import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Competition } from '../../competitions/entities/competition.entity';
import { Player } from '../../players/entities/player.entity';
import { Match } from '../../matches/entities/match.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  shortName: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  stadium: string;

  @Column({ type: 'int', nullable: true })
  founded: number;

  @Column({ nullable: true })
  primaryColor: string;

  @Column({ nullable: true })
  secondaryColor: string;

  // Relación con competición
  @ManyToOne(() => Competition, (competition) => competition.teams, {
    nullable: true,
  })
  competition: Competition;

  // Jugadores del equipo
  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  // Partidos como local
  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches: Match[];

  // Partidos como visitante
  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches: Match[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

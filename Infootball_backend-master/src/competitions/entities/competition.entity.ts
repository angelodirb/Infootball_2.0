//competición.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Match } from '../../matches/entities/match.entity';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  country: string;

  @Column({
    type: 'enum',
    enum: ['league', 'cup', 'international'],
    default: 'league',
  })
  type: string;

  @Column({ nullable: true })
  season: string;

  @Column({ default: false })
  isActive: boolean;

  // Equipos en esta competición
  @OneToMany(() => Team, (team) => team.competition)
  teams: Team[];

  // Partidos de esta competición
  @OneToMany(() => Match, (match) => match.competition)
  matches: Match[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

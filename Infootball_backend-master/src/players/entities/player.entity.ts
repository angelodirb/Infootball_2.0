import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Transfer } from '../../transfers/entities/transfer.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  position: string;

  @Column({ type: 'int', nullable: true })
  number: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  marketValue: number;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ type: 'int', nullable: true })
  weight: number;

  @Column({
    type: 'enum',
    enum: ['right', 'left', 'both'],
    nullable: true,
  })
  preferredFoot: string;

  // Relación con equipo actual
  @ManyToOne(() => Team, (team) => team.players)
  team: Team;

  // Historial de transferencias
  @OneToMany(() => Transfer, (transfer) => transfer.player)
  transfers: Transfer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

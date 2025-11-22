import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({
    type: 'enum',
    enum: ['transfer', 'match', 'player', 'team', 'general'],
    default: 'general',
  })
  category: string;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  // Autor de la noticia
  @ManyToOne(() => User, { nullable: true })
  author: User;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

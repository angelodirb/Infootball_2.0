import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(newsData: Partial<News>): Promise<News> {
    // Generar slug automáticamente si no se proporciona
    if (!newsData.slug && newsData.title) {
      newsData.slug = this.generateSlug(newsData.title);
    }

    const news = this.newsRepository.create(newsData);
    return await this.newsRepository.save(news);
  }

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find({
      where: { isPublished: true },
      relations: ['author'],
      order: { publishedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!news) {
      throw new NotFoundException(`Noticia con ID ${id} no encontrada`);
    }

    // Incrementar vistas
    news.views += 1;
    await this.newsRepository.save(news);

    return news;
  }

  async findBySlug(slug: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { slug },
      relations: ['author'],
    });

    if (!news) {
      throw new NotFoundException(`Noticia con slug ${slug} no encontrada`);
    }

    // Incrementar vistas
    news.views += 1;
    await this.newsRepository.save(news);

    return news;
  }

  async findByCategory(category: string): Promise<News[]> {
    return await this.newsRepository.find({
      where: { category, isPublished: true },
      relations: ['author'],
      order: { publishedAt: 'DESC' },
    });
  }

  async search(query: string): Promise<News[]> {
    return await this.newsRepository
      .createQueryBuilder('news')
      .where('news.title ILIKE :query', { query: `%${query}%` })
      .orWhere('news.content ILIKE :query', { query: `%${query}%` })
      .andWhere('news.isPublished = :published', { published: true })
      .orderBy('news.publishedAt', 'DESC')
      .getMany();
  }

  async update(id: string, newsData: Partial<News>): Promise<News> {
    await this.newsRepository.update(id, newsData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.newsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Noticia con ID ${id} no encontrada`);
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

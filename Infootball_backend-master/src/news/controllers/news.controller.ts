import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { News } from '../entities/news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: Partial<News>): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string): Promise<News[]> {
    return this.newsService.search(query);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): Promise<News[]> {
    return this.newsService.findByCategory(category);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<News> {
    return this.newsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: Partial<News>,
  ): Promise<News> {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.newsService.remove(id);
  }
}

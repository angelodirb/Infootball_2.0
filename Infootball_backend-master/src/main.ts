//main.ts
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env from project root
const result = config({ path: resolve(process.cwd(), '.env') });
console.log('dotenv loaded:', result.error ? 'ERROR' : 'OK');
console.log('API_FOOTBALL_KEY loaded:', process.env.API_FOOTBALL_KEY ? 'YES (length: ' + process.env.API_FOOTBALL_KEY.length + ')' : 'NO');

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Habilitar validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 InFootball Backend running on: http://localhost:${port}`);
  console.log(`📚 API docs: http://localhost:${port}/api/v1`);
}

bootstrap();
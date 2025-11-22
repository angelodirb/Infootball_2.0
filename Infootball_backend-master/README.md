# InFootball Backend API 🚀⚽

Backend API para la plataforma InFootball, construida con NestJS, TypeORM y PostgreSQL.

## 📋 Características

- **Autenticación JWT** - Sistema de registro y login seguro
- **Base de datos PostgreSQL** - Con TypeORM para gestión de datos
- **Módulos completos**:
  - 👤 Usuarios
  - ⚽ Equipos
  - 🏆 Competiciones
  - 📅 Partidos
  - 🎯 Jugadores
  - 💰 Fichajes/Transferencias
  - 📰 Noticias
- **API RESTful** - Endpoints bien organizados y documentados
- **Validación de datos** - Con class-validator
- **CORS habilitado** - Para conectar con el frontend

## 🛠️ Tecnologías

- **NestJS** - Framework backend progresivo de Node.js
- **TypeScript** - Tipado estático
- **TypeORM** - ORM para gestión de base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación segura
- **bcrypt** - Hash de contraseñas

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=infootball_db

# JWT
JWT_SECRET=tu_secret_key_muy_segura
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Crear base de datos

Asegúrate de tener PostgreSQL instalado y crea la base de datos:

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE infootball_db;

# Salir
\q
```

### 4. Ejecutar el servidor

**Modo desarrollo** (con hot-reload):
```bash
npm run start:dev
```

**Modo producción**:
```bash
npm run build
npm run start:prod
```

El servidor estará corriendo en: `http://localhost:3001`

## 🔗 Endpoints de la API

Todos los endpoints tienen el prefijo: `/api/v1`

### Autenticación

- `POST /api/v1/auth/register` - Registrar nuevo usuario
- `POST /api/v1/auth/login` - Iniciar sesión

### Usuarios

- `GET /api/v1/users` - Obtener todos los usuarios
- `GET /api/v1/users/:id` - Obtener usuario por ID
- `PATCH /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario
- `POST /api/v1/users/:id/favorite-teams/:teamId` - Agregar equipo favorito

### Equipos

- `GET /api/v1/teams` - Obtener todos los equipos
- `GET /api/v1/teams/:id` - Obtener equipo por ID
- `GET /api/v1/teams/search?q=query` - Buscar equipos
- `GET /api/v1/teams/competition/:competitionId` - Equipos por competición
- `POST /api/v1/teams` - Crear equipo
- `PATCH /api/v1/teams/:id` - Actualizar equipo
- `DELETE /api/v1/teams/:id` - Eliminar equipo

### Competiciones

- `GET /api/v1/competitions` - Obtener todas las competiciones
- `GET /api/v1/competitions/active` - Obtener competiciones activas
- `GET /api/v1/competitions/:id` - Obtener competición por ID
- `GET /api/v1/competitions/slug/:slug` - Obtener competición por slug
- `POST /api/v1/competitions` - Crear competición
- `PATCH /api/v1/competitions/:id` - Actualizar competición
- `DELETE /api/v1/competitions/:id` - Eliminar competición

### Partidos

- `GET /api/v1/matches` - Obtener todos los partidos
- `GET /api/v1/matches/live` - Obtener partidos en vivo
- `GET /api/v1/matches/:id` - Obtener partido por ID
- `GET /api/v1/matches/date?start=YYYY-MM-DD&end=YYYY-MM-DD` - Partidos por fecha
- `GET /api/v1/matches/team/:teamId` - Partidos de un equipo
- `POST /api/v1/matches` - Crear partido
- `PATCH /api/v1/matches/:id` - Actualizar partido
- `DELETE /api/v1/matches/:id` - Eliminar partido

### Jugadores

- `GET /api/v1/players` - Obtener todos los jugadores
- `GET /api/v1/players/:id` - Obtener jugador por ID
- `GET /api/v1/players/search?q=query` - Buscar jugadores
- `GET /api/v1/players/top-value?limit=10` - Top jugadores por valor
- `GET /api/v1/players/team/:teamId` - Jugadores de un equipo
- `POST /api/v1/players` - Crear jugador
- `PATCH /api/v1/players/:id` - Actualizar jugador
- `DELETE /api/v1/players/:id` - Eliminar jugador

### Fichajes/Transferencias

- `GET /api/v1/transfers` - Obtener todos los fichajes
- `GET /api/v1/transfers/top?limit=10` - Top fichajes por valor
- `GET /api/v1/transfers/:id` - Obtener fichaje por ID
- `GET /api/v1/transfers/season/:season` - Fichajes por temporada
- `GET /api/v1/transfers/player/:playerId` - Fichajes de un jugador
- `POST /api/v1/transfers` - Crear fichaje
- `PATCH /api/v1/transfers/:id` - Actualizar fichaje
- `DELETE /api/v1/transfers/:id` - Eliminar fichaje

### Noticias

- `GET /api/v1/news` - Obtener todas las noticias
- `GET /api/v1/news/:id` - Obtener noticia por ID
- `GET /api/v1/news/slug/:slug` - Obtener noticia por slug
- `GET /api/v1/news/search?q=query` - Buscar noticias
- `GET /api/v1/news/category/:category` - Noticias por categoría
- `POST /api/v1/news` - Crear noticia
- `PATCH /api/v1/news/:id` - Actualizar noticia
- `DELETE /api/v1/news/:id` - Eliminar noticia

## 📊 Estructura de la Base de Datos

```
users
  - id (UUID)
  - email (unique)
  - password (hashed)
  - username
  - avatar
  - role (user/admin)
  - favoriteTeams (relación many-to-many con teams)

teams
  - id (UUID)
  - name
  - shortName
  - logo
  - country
  - city
  - stadium
  - founded
  - primaryColor
  - secondaryColor
  - competition (relación con competitions)

competitions
  - id (UUID)
  - name
  - slug
  - logo
  - country
  - type (league/cup/international)
  - season
  - isActive

matches
  - id (UUID)
  - matchDate
  - homeScore
  - awayScore
  - status (scheduled/live/halftime/finished/postponed/cancelled)
  - round
  - venue
  - homeTeam (relación con teams)
  - awayTeam (relación con teams)
  - competition (relación con competitions)

players
  - id (UUID)
  - name
  - firstName
  - lastName
  - photo
  - dateOfBirth
  - nationality
  - position
  - number
  - marketValue
  - height
  - weight
  - preferredFoot
  - team (relación con teams)

transfers
  - id (UUID)
  - transferDate
  - transferFee
  - transferType (permanent/loan/free)
  - season
  - notes
  - player (relación con players)
  - fromTeam (relación con teams)
  - toTeam (relación con teams)

news
  - id (UUID)
  - title
  - slug
  - content
  - summary
  - coverImage
  - category (transfer/match/player/team/general)
  - isPublished
  - views
  - tags
  - author (relación con users)
  - publishedAt
```

## 🔐 Autenticación

Para endpoints protegidos, incluye el token JWT en el header:

```
Authorization: Bearer <tu_token_jwt>
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Ejemplos de Uso

### Registrar un usuario

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123",
    "username": "usuario123"
  }'
```

### Crear un equipo

```bash
curl -X POST http://localhost:3001/api/v1/teams \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "FC Barcelona",
    "shortName": "BAR",
    "country": "España",
    "city": "Barcelona",
    "stadium": "Camp Nou",
    "founded": 1899
  }'
```

## 🚀 Próximos pasos

1. Conectar con el frontend Next.js
2. Implementar WebSockets para partidos en vivo
3. Agregar paginación a los endpoints
4. Implementar caché con Redis
5. Agregar documentación con Swagger
6. Implementar rate limiting
7. Agregar tests automatizados

## 📄 Licencia

Este proyecto es privado y está en desarrollo.

---

**Desarrollado para InFootball** ⚽💚

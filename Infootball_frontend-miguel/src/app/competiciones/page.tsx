'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Competition {
  id: number;
  name: string;
  country: string;
  type: string;
  logo: string;
  logoImage: string;
  backgroundImage: string;
  season: string;
  teams: number;
  matchesPlayed: number;
  matchesRemaining: number;
  leader: string;
  topScorer: string;
  featured: boolean;
  color: string;
}

interface CompetitionLogoProps {
  logoImage: string;
  fallbackLogo: string;
  name: string;
  size?: "small" | "medium" | "large";
}

// Datos de ejemplo de competiciones con imágenes reales Y de fondo
const competitionsData: Competition[] = [
  {
    id: 1,
    name: "Premier League",
    country: "Inglaterra",
    type: "Liga",
    logo: "",
    logoImage: "/images/competiciones/PremierLeague.png",
    backgroundImage: "/images/competiciones/Inglaterra.png",
    season: "2024/25",
    teams: 20,
    matchesPlayed: 285,
    matchesRemaining: 95,
    leader: "Arsenal",
    topScorer: "Erling Haaland (24 goles)",
    featured: true,
    color: "from-purple-600 to-purple-800"
  },
  {
    id: 2,
    name: "La Liga",
    country: "España",
    type: "Liga",
    logo: "",
    logoImage: "/images/competiciones/LaLiga.png",
    backgroundImage: "/images/competiciones/Espana.png",
    season: "2024/25",
    teams: 20,
    matchesPlayed: 278,
    matchesRemaining: 102,
    leader: "Real Madrid",
    topScorer: "Robert Lewandowski (21 goles)",
    featured: true,
    color: "from-red-600 to-orange-600"
  },
  {
    id: 3,
    name: "Serie A",
    country: "Italia",
    type: "Liga",
    logo: "",
    logoImage: "/images/competiciones/SERIE_A.png",
    backgroundImage: "/images/competiciones/Italia.png",
    season: "2024/25",
    teams: 20,
    matchesPlayed: 270,
    matchesRemaining: 110,
    leader: "Inter de Milán",
    topScorer: "Victor Osimhen (19 goles)",
    featured: true,
    color: "from-blue-600 to-blue-800"
  },
  {
    id: 4,
    name: "Bundesliga",
    country: "Alemania",
    type: "Liga",
    logo: "🇩🇪",
    logoImage: "/images/competiciones/Bundesliga.png",
    backgroundImage: "/images/competiciones/Alemania.png",
    season: "2024/25",
    teams: 18,
    matchesPlayed: 245,
    matchesRemaining: 61,
    leader: "Bayern Múnich",
    topScorer: "Harry Kane (23 goles)",
    featured: false,
    color: "from-red-600 to-red-800"
  },
  {
    id: 5,
    name: "Ligue 1",
    country: "Francia",
    type: "Liga",
    logo: "🇫🇷",
    logoImage: "/images/competiciones/Ligue1.png",
    backgroundImage: "/images/competiciones/Francia.png",
    season: "2024/25",
    teams: 18,
    matchesPlayed: 240,
    matchesRemaining: 66,
    leader: "PSG",
    topScorer: "Kylian Mbappé (20 goles)",
    featured: false,
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 6,
    name: "UEFA Champions League",
    country: "Europa",
    type: "Copa",
    logo: "",
    logoImage: "/images/competiciones/CH-logo.jpg",
    backgroundImage: "/images/competiciones/uefa-champions.avif",
    season: "2024/25",
    teams: 32,
    matchesPlayed: 89,
    matchesRemaining: 36,
    leader: "Fase de Octavos",
    topScorer: "Erling Haaland (8 goles)",
    featured: true,
    color: "from-blue-800 to-indigo-900"
  },
  {
    id: 7,
    name: "Copa Libertadores",
    country: "Sudamérica",
    type: "Copa",
    logo: "",
    logoImage: "/images/competiciones/Copa_Libertadores.png",
    backgroundImage: "/images/competiciones/FondoLibertadores.avif",
    season: "2025",
    teams: 32,
    matchesPlayed: 45,
    matchesRemaining: 38,
    leader: "Fase de Grupos",
    topScorer: "Germán Cano (5 goles)",
    featured: false,
    color: "from-green-600 to-green-800"
  },
  {
    id: 8,
    name: "Copa América",
    country: "Sudamérica",
    type: "Selecciones",
    logo: "",
    logoImage: "/images/competiciones/confederacion-sudamerican.png",
    backgroundImage: "/images/competiciones/FondoCopaAmerica.jpeg",
    season: "2025",
    teams: 16,
    matchesPlayed: 0,
    matchesRemaining: 26,
    leader: "Próximamente",
    topScorer: "-",
    featured: false,
    color: "from-yellow-600 to-yellow-800"
  },
  {
    id: 9,
    name: "MLS",
    country: "Estados Unidos",
    type: "Liga",
    logo: "🇺🇸",
    logoImage: "/images/competiciones/MLS.png",
    backgroundImage: "/images/competiciones/descarga.png",
    season: "2025",
    teams: 29,
    matchesPlayed: 156,
    matchesRemaining: 341,
    leader: "Inter Miami",
    topScorer: "Lionel Messi (15 goles)",
    featured: false,
    color: "from-red-500 to-blue-600"
  }
];

interface CompetitionType {
  name: string;
  icon: string;
}

const competitionTypes: CompetitionType[] = [
  { name: "Todas", icon: "🌍" },
  { name: "Liga", icon: "🏆" },
  { name: "Copa", icon: "🏅" },
  { name: "Selecciones", icon: "🌎" }
];

// Componente para mostrar el logo (imagen o emoji fallback)
function CompetitionLogo({ 
  logoImage, 
  fallbackLogo, 
  name, 
  size = "medium" 
}: CompetitionLogoProps) {
  const sizeClasses: Record<string, string> = {
    small: "w-12 h-12",
    medium: "w-24 h-24",
    large: "w-32 h-32"
  };

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      <Image
        src={logoImage}
        alt={name}
        fill
        className="object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* Fallback emoji si la imagen no carga */}
      <div className={`${sizeClasses[size]} flex items-center justify-center text-center`}>
        <span className={`${size === 'large' ? 'text-7xl' : size === 'medium' ? 'text-5xl' : 'text-3xl'}`}>
          {fallbackLogo}
        </span>
      </div>
    </div>
  );
}

export default function CompeticionesPage() {
  const [selectedType, setSelectedType] = React.useState("Todas");
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const filteredCompetitions = selectedType === "Todas"
    ? competitionsData
    : competitionsData.filter(comp => comp.type === selectedType);

  const featuredCompetitions = competitionsData.filter(comp => comp.featured);
  const regularCompetitions = filteredCompetitions.filter(comp => !comp.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      
      {/* Hero Section - Competiciones Destacadas */}
      <section className="relative pt-8 pb-12 px-4 overflow-hidden">
        {/* Efecto de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Competiciones
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg ml-5">Las principales ligas y torneos del mundo</p>
          </div>
          
          {/* Competiciones Destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompetitions.map((comp) => (
              <Link href={`/competiciones/${comp.id}`} key={comp.id}>
                <div 
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredCard(comp.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Container */}
                  <div className="relative h-[350px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl">
                    {/* Background decorativo con imagen + gradiente */}
                    <div className="absolute inset-0">
                      <div 
                        className={`w-full h-full bg-gradient-to-br ${comp.color} bg-cover bg-center`}
                        style={{
                          backgroundImage: `url(${comp.backgroundImage})`,
                          backgroundBlendMode: 'overlay',
                          opacity: 0.4
                        } as React.CSSProperties}
                      ></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                    </div>
                    
                    {/* Logo grande de la competición */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <div className="text-[15rem] transform group-hover:scale-110 transition-transform duration-500">
                        {comp.logo}
                      </div>
                    </div>
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex items-center gap-2 bg-green-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-green-500/50 transform transition-transform group-hover:scale-110">
                        <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                        {comp.type}
                      </span>
                    </div>

                    {/* Badge de temporada */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-gray-700">
                        {comp.season}
                      </span>
                    </div>
                    
                    {/* Contenido */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      {/* Logo y país */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-gray-800/50 rounded-lg flex items-center justify-center">
                          <CompetitionLogo 
                            logoImage={comp.logoImage}
                            fallbackLogo={comp.logo}
                            name={comp.name}
                            size="small"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-black leading-tight transform transition-all duration-300 group-hover:text-green-400">
                            {comp.name}
                          </h2>
                          <p className="text-gray-400 text-sm">{comp.country}</p>
                        </div>
                      </div>
                      
                      {/* Estadísticas rápidas */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                          <p className="text-gray-400 text-xs mb-1">Líder</p>
                          <p className="text-white font-bold text-sm">{comp.leader}</p>
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                          <p className="text-gray-400 text-xs mb-1">Equipos</p>
                          <p className="text-white font-bold text-sm">{comp.teams} clubes</p>
                        </div>
                      </div>

                      {/* Ver más */}
                      <div className="flex items-center gap-2 text-green-400 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                        <span>Ver tabla y estadísticas</span>
                        <span className={`text-lg transform transition-transform duration-300 ${hoveredCard === comp.id ? 'translate-x-2' : ''}`}>
                          ➜
                        </span>
                      </div>
                    </div>

                    {/* Borde brillante */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/50 transition-colors duration-300"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros de Tipo */}
      <section className="sticky top-0 z-20 backdrop-blur-xl bg-black/80 border-y border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {competitionTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`group relative px-6 py-3 rounded-xl whitespace-nowrap font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type.name
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-black shadow-lg shadow-green-500/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{type.icon}</span>
                  {type.name}
                </span>
                {selectedType === type.name && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Competiciones */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header de sección */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black">
                {selectedType === "Todas" ? "Todas las Competiciones" : `Competiciones - ${selectedType}`}
              </h2>
            </div>
            <div className="text-sm text-gray-400">
              {regularCompetitions.length} {regularCompetitions.length === 1 ? 'competición' : 'competiciones'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCompetitions.map((comp) => (
              <Link href={`/competiciones/${comp.id}`} key={comp.id}>
                <div className="group h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10">
                  
                  {/* Header con logo */}
                  <div className="relative h-40 overflow-hidden">
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${comp.color} bg-cover bg-center`}
                      style={{
                        backgroundImage: `url(${comp.backgroundImage})`,
                        backgroundBlendMode: 'overlay',
                        opacity: 0.4
                      } as React.CSSProperties}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    {/* Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CompetitionLogo 
                        logoImage={comp.logoImage}
                        fallbackLogo={comp.logo}
                        name={comp.name}
                        size="medium"
                      />
                    </div>
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {comp.type}
                      </span>
                    </div>

                    {/* Temporada */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {comp.season}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-5">
                    {/* Nombre y país */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-green-400 transition-colors">
                        {comp.name}
                      </h3>
                      <p className="text-sm text-gray-400">{comp.country}</p>
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">Líder actual</p>
                        <p className="text-white font-semibold text-sm truncate">{comp.leader}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">Partidos</p>
                        <p className="text-white font-semibold text-sm">{comp.matchesPlayed} / {comp.matchesPlayed + comp.matchesRemaining}</p>
                      </div>
                    </div>

                    {/* Goleador */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                      <p className="text-green-400 text-xs mb-1">⚽ Máximo goleador</p>
                      <p className="text-white font-semibold text-sm">{comp.topScorer}</p>
                    </div>

                    {/* Ver competición */}
                    <div className="flex items-center gap-2 text-green-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Ver tabla completa</span>
                      <span className="text-base">▶</span>
                    </div>
                  </div>

                  {/* Borde inferior */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
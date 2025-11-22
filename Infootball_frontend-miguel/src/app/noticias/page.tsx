'use client';

import React from 'react';
import Link from 'next/link';

// Datos de ejemplo (después vendrán del backend)
const newsData = [
  {
    id: 1,
    title: "LIONEL MESSI VOLVIÓ A INTER MIAMI CON DOBLETE Y CLASIFICACIÓN A LA FINAL DE LEAGUES CUP",
    category: "Transferencias",
    source: "Vermouth Deportivo",
    date: "27 de octubre de 2025",
    image: "/images/messi-news.jpg",
    excerpt: "El astro argentino brilló una vez más con dos goles que llevaron al Inter Miami a la final de la Leagues Cup...",
    featured: true,
    readTime: "5 min"
  },
  {
    id: 2,
    title: "CHAMPIONS LEAGUE, A PUNTO: LOS CRUCES DEFINIDOS PARA OCTAVOS DE FINAL",
    category: "Competiciones",
    source: "OneFootball",
    date: "27 de octubre de 2025",
    image: "/images/champions-news.jpg",
    excerpt: "Se conocieron los emparejamientos de octavos de final de la Champions League con varios duelos de alto voltaje...",
    featured: true,
    readTime: "4 min"
  },
  {
    id: 3,
    title: "REAL MADRID PREPARA OFERTA RÉCORD POR MBAPPÉ",
    category: "Fichajes",
    source: "Marca",
    date: "26 de octubre de 2025",
    image: "/images/mbappe-news.jpg",
    excerpt: "El conjunto merengue estaría preparando una oferta histórica para hacerse con los servicios del delantero francés...",
    featured: false,
    readTime: "3 min"
  },
  {
    id: 4,
    title: "BARCELONA GOLEA Y SE ACERCA AL TÍTULO DE LA LIGA",
    category: "Resultados",
    source: "Sport",
    date: "26 de octubre de 2025",
    image: "/images/barca-news.jpg",
    excerpt: "Con un contundente 4-0, el Barcelona sigue firme en la cima de la clasificación de La Liga...",
    featured: false,
    readTime: "4 min"
  },
  {
    id: 5,
    title: "GUARDIOLA RENUEVA CON EL MANCHESTER CITY HASTA 2027",
    category: "Noticias",
    source: "BBC Sport",
    date: "25 de octubre de 2025",
    image: "/images/guardiola-news.jpg",
    excerpt: "El técnico español extendió su contrato con los citizens por dos temporadas más...",
    featured: false,
    readTime: "3 min"
  },
  {
    id: 6,
    title: "HAALAND ALCANZA 50 GOLES EN LA PREMIER LEAGUE",
    category: "Estadísticas",
    source: "Sky Sports",
    date: "25 de octubre de 2025",
    image: "/images/haaland-news.jpg",
    excerpt: "El noruego logró su gol número 50 en tiempo récord en la Premier League inglesa...",
    featured: false,
    readTime: "2 min"
  },
  {
    id: 7,
    title: "PSG CONFIRMA LA LLEGADA DE NUEVO DIRECTOR DEPORTIVO",
    category: "Noticias",
    source: "L'Équipe",
    date: "24 de octubre de 2025",
    image: "/images/psg-news.jpg",
    excerpt: "El club parisino anunció oficialmente el fichaje de su nuevo director deportivo para la próxima temporada...",
    featured: false,
    readTime: "3 min"
  },
  {
    id: 8,
    title: "LEWANDOWSKI SUPERA LA MARCA DE 400 GOLES EN SU CARRERA",
    category: "Estadísticas",
    source: "Goal",
    date: "24 de octubre de 2025",
    image: "/images/lewandowski-news.jpg",
    excerpt: "El delantero polaco alcanzó la increíble cifra de 400 goles en partidos oficiales...",
    featured: false,
    readTime: "2 min"
  }
];

const categories = [
  { name: "Todas", icon: "🏆" },
  { name: "Transferencias", icon: "🔄" },
  { name: "Competiciones", icon: "🏆" },
  { name: "Resultados", icon: "⚽" },
  { name: "Fichajes", icon: "✍️" },
  { name: "Estadísticas", icon: "📊" },
  { name: "Noticias", icon: "📰" }
];

export default function NoticiasPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("Todas");
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const filteredNews = selectedCategory === "Todas" 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const featuredNews = newsData.filter(news => news.featured);
  const regularNews = filteredNews.filter(news => !news.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      
      {/* Hero Section - Noticias Destacadas */}
      <section className="relative pt-8 pb-12 px-4 overflow-hidden">
        {/* Efecto de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header con animación */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Top News
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg ml-5">Las noticias más importantes del fútbol mundial</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNews.map((news, index) => (
              <Link href={`/noticias/${news.id}`} key={news.id}>
                <div 
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredCard(news.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Container */}
                  <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl">
                    {/* Imagen de fondo con overlay */}
                    <div className="absolute inset-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]"></div>
                        <span className="text-gray-700 text-6xl">⚽</span>
                      </div>
                      {/* Overlay gradiente mejorado */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Badge flotante animado */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex items-center gap-2 bg-green-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-green-500/50 transform transition-transform group-hover:scale-110">
                        <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                        {news.category}
                      </span>
                    </div>

                    {/* Badge de tiempo de lectura */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-gray-700">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {news.readTime}
                      </span>
                    </div>
                    
                    {/* Contenido */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                      {/* Source badge mejorado */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-green-500/20 rounded-full px-4 py-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/50">
                            <span className="text-xs font-bold text-black">
                              {news.source.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-white font-semibold">{news.source}</span>
                            <span className="text-xs text-gray-400">{news.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Título con efecto de brillo */}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 leading-tight transform transition-all duration-300 group-hover:text-green-400">
                        {news.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-4">
                        {news.excerpt}
                      </p>

                      {/* Read more con animación */}
                      <div className="flex items-center gap-2 text-green-400 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                        <span>Leer más</span>
                        <svg 
                          className={`w-5 h-5 transform transition-transform duration-300 ${hoveredCard === news.id ? 'translate-x-2' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>

                    {/* Borde brillante en hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/50 transition-colors duration-300"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros de Categorías - Mejorados */}
      <section className="sticky top-0 z-20 backdrop-blur-xl bg-black/80 border-y border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`group relative px-6 py-3 rounded-xl whitespace-nowrap font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-black shadow-lg shadow-green-500/50'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                </span>
                {selectedCategory === category.name && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Noticias - Mejorado */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header de sección */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black">
                {selectedCategory === "Todas" ? "Todas las Noticias" : selectedCategory}
              </h2>
            </div>
            <div className="text-sm text-gray-400">
              {regularNews.length} {regularNews.length === 1 ? 'noticia' : 'noticias'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((news) => (
              <Link href={`/noticias/${news.id}`} key={news.id}>
                <div className="group h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10">
                  
                  {/* Imagen */}
                  <div className="relative h-52 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent)]"></div>
                      <span className="text-gray-700 text-5xl">⚽</span>
                    </div>
                    
                    {/* Overlay en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Badge de categoría */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {news.category}
                      </span>
                    </div>

                    {/* Tiempo de lectura */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {news.readTime}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-5">
                    {/* Metadata */}
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                      <span className="font-medium text-gray-300">{news.source}</span>
                      <span className="text-gray-600">•</span>
                      <span>{news.date}</span>
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-green-400 transition-colors leading-snug">
                      {news.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {news.excerpt}
                    </p>

                    {/* Read more link */}
                    <div className="flex items-center gap-2 text-green-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Leer artículo</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Borde inferior decorativo */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Botón Cargar Más - Mejorado */}
          <div className="flex justify-center mt-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 border border-gray-700 hover:border-green-500">
              <span className="flex items-center gap-3">
                <span>Cargar más noticias</span>
                <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
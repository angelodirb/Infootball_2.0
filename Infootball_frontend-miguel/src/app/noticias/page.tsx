'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { newsApi } from '../../../lib/api';

interface NewsArticle {
  id: number;
  title: string;
  category: string;
  source: string;
  date: string;
  image: string;
  excerpt: string;
  featured: boolean;
  readTime: string;
}

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
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar noticias
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await newsApi.getAll();
        const news = Array.isArray(response) ? response : [];

        // Transformar datos si es necesario
        const transformedNews: NewsArticle[] = news.map((item: any) => ({
          id: item.id,
          title: item.title || 'Sin título',
          category: item.category || 'Noticias',
          source: item.source || 'InFootball',
          date: item.date || item.createdAt || new Date().toLocaleDateString('es-ES'),
          image: item.image || '/images/default-news.jpg',
          excerpt: item.excerpt || item.content?.substring(0, 150) + '...' || '',
          featured: item.featured || false,
          readTime: item.readTime || '3 min'
        }));

        setNewsData(transformedNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error al cargar las noticias. Verifica que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = selectedCategory === "Todas"
    ? newsData
    : newsData.filter(news => news.category === selectedCategory);

  const featuredNews = newsData.filter(news => news.featured).slice(0, 2);
  const regularNews = filteredNews.filter(news => !news.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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

          {featuredNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.map((news) => (
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
                          {news.image && news.image !== '/images/default-news.jpg' ? (
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]"></div>
                              <span className="text-gray-700 text-6xl">⚽</span>
                            </>
                          )}
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
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold mb-2">No hay noticias destacadas</h3>
              <p className="text-gray-400">Las noticias destacadas aparecerán aquí</p>
            </div>
          )}
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

          {regularNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((news) => (
                <Link href={`/noticias/${news.id}`} key={news.id}>
                  <div className="group h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10">

                    {/* Imagen */}
                    <div className="relative h-52 overflow-hidden">
                      {news.image && news.image !== '/images/default-news.jpg' ? (
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent)]"></div>
                          <span className="text-gray-700 text-5xl">⚽</span>
                        </div>
                      )}

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
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold mb-2">No hay noticias</h3>
              <p className="text-gray-400">No se encontraron noticias en esta categoría</p>
            </div>
          )}

          {/* Botón Cargar Más - Mejorado */}
          {regularNews.length > 0 && (
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
          )}
        </div>
      </section>
    </div>
  );
}

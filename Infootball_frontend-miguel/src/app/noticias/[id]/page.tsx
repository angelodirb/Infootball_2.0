'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Datos de ejemplo ampliados
const newsDetails: Record<number, any> = {
  1: {
    id: 1,
    title: "LIONEL MESSI VOLVIÓ A INTER MIAMI CON DOBLETE Y CLASIFICACIÓN A LA FINAL DE LEAGUES CUP",
    category: "Transferencias",
    source: "Vermouth Deportivo",
    date: "27 de octubre de 2025",
    author: "Juan Pérez",
    readTime: "5 min lectura",
    image: "/images/messi-news.jpg",
    content: `
      <p class="mb-6 text-lg leading-relaxed">Lionel Messi volvió a demostrar su clase con un doblete memorable que llevó al Inter Miami a la final de la Leagues Cup 2025. El astro argentino, que había estado ausente en los últimos partidos por molestias físicas, regresó por todo lo alto en el momento más crucial de la temporada.</p>
      
      <p class="mb-6 leading-relaxed">El primer gol llegó al minuto 23, cuando Messi recibió un pase filtrado de Sergio Busquets y definió con su característica precisión ante la salida del portero. El estadio explotó en una ovación que duró varios minutos.</p>
      
      <h2 class="text-3xl font-bold mb-4 mt-8">El segundo tanto y la clasificación</h2>
      
      <p class="mb-6 leading-relaxed">El segundo gol fue aún más espectacular. A falta de 15 minutos para el final, con el marcador 1-1, Messi recibió el balón a 25 metros del arco y sin pensarlo dos veces soltó un zurdazo imparable que se clavó en el ángulo superior.</p>
      
      <p class="mb-6 leading-relaxed">Con este resultado, el Inter Miami se clasifica para disputar su primera final de Leagues Cup, un logro histórico para la franquicia de la MLS.</p>
      
      <h2 class="text-3xl font-bold mb-4 mt-8">Declaraciones post-partido</h2>
      
      <p class="mb-6 leading-relaxed">"Estoy muy feliz de poder ayudar al equipo en un momento tan importante", declaró Messi tras el encuentro. "El grupo trabajó muy duro durante mi ausencia y merecemos estar en esta final."</p>
      
      <p class="mb-6 leading-relaxed">El técnico Gerardo Martino también se mostró eufórico: "Tener a Leo es una bendición. Su calidad marca la diferencia en los partidos importantes."</p>
      
      <h2 class="text-3xl font-bold mb-4 mt-8">Próximo rival</h2>
      
      <p class="mb-6 leading-relaxed">El Inter Miami conocerá a su rival en la final después del partido entre LAFC y Nashville SC que se disputará mañana por la noche.</p>
    `,
    tags: ["Messi", "Inter Miami", "Leagues Cup", "MLS"],
    relatedNews: [2, 3, 5]
  },
  2: {
    id: 2,
    title: "CHAMPIONS LEAGUE, A PUNTO: LOS CRUCES DEFINIDOS PARA OCTAVOS DE FINAL",
    category: "Competiciones",
    source: "OneFootball",
    date: "27 de octubre de 2025",
    author: "María González",
    readTime: "4 min lectura",
    content: `
      <p class="mb-6 text-lg leading-relaxed">El sorteo de octavos de final de la UEFA Champions League nos dejó emparejamientos de alto voltaje que prometen emociones fuertes en la fase eliminatoria del torneo más importante de clubes.</p>
      
      <h2 class="text-3xl font-bold mb-4 mt-8">Los cruces más destacados</h2>
      
      <p class="mb-6 leading-relaxed">Real Madrid vs Manchester City es sin duda el plato fuerte de esta ronda. Los dos últimos campeones se enfrentarán en lo que promete ser una eliminatoria épica.</p>
      
      <p class="mb-6 leading-relaxed">Barcelona se medirá ante el PSG en una revancha de encuentros históricos, mientras que Bayern Múnich enfrentará al Inter de Milán en un duelo germano-italiano de alto nivel.</p>
    `,
    tags: ["Champions League", "UEFA", "Sorteo", "Octavos"],
    relatedNews: [1, 4, 6]
  }
};

export default function NoticiaDetalle() {
  const params = useParams();
  const newsId = Number(params.id);
  const news = newsDetails[newsId];

  if (!news) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <span className="text-8xl">❌</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Noticia no encontrada</h1>
          <p className="text-gray-400 mb-6">Lo sentimos, la noticia que buscas no existe.</p>
          <Link href="/noticias" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a noticias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      
      {/* Breadcrumb mejorado */}
      <div className="border-b border-gray-800/50 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">Inicio</Link>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/noticias" className="text-gray-400 hover:text-green-400 transition-colors">Noticias</Link>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-green-400 font-semibold">{news.category}</span>
          </div>
        </div>
      </div>

      {/* Artículo Principal */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Categoría Badge con animación */}
        <div className="mb-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-black text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-green-500/50">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            {news.category}
          </span>
        </div>

        {/* Título impactante */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in">
          {news.title}
        </h1>

        {/* Metadata mejorada */}
        <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-4">
            {/* Avatar del autor */}
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                <span className="text-lg font-bold text-black">
                  {news.author.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div>
              <p className="font-bold text-lg">{news.author}</p>
              <p className="text-sm text-gray-400">{news.source}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{news.date}</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{news.readTime}</span>
            </div>
          </div>
        </div>

        {/* Imagen destacada mejorada */}
        <div className="relative h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl group">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.2),transparent)]"></div>
            <span className="text-gray-700 text-8xl group-hover:scale-110 transition-transform duration-500">⚽</span>
          </div>
          {/* Borde decorativo */}
          <div className="absolute inset-0 border-4 border-green-500/20 rounded-2xl group-hover:border-green-500/40 transition-colors duration-300"></div>
        </div>

        {/* Contenido del artículo con mejor tipografía */}
        <div 
          className="prose prose-invert prose-lg max-w-none mb-12"
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.875rem'
          }}
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* Tags mejorados */}
        <div className="flex flex-wrap gap-3 mb-12 pb-10 border-b border-gray-800">
          {news.tags.map((tag: string) => (
            <button 
              key={tag}
              className="group bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 border border-gray-700 hover:border-green-500 text-gray-300 hover:text-black text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Compartir mejorado */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            Compartir esta noticia
          </h3>
          <div className="flex gap-4">
            {[
              { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: 'from-blue-600 to-blue-700' },
              { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: 'from-sky-500 to-sky-600' },
              { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: 'from-blue-700 to-blue-800' },
              { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z', color: 'from-green-500 to-green-600' }
            ].map((social) => (
              <button 
                key={social.name}
                className={`group relative p-4 bg-gray-800/50 hover:bg-gradient-to-br ${social.color} rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-gray-700 hover:border-transparent`}
                title={`Compartir en ${social.name}`}
              >
                <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon}/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Noticias relacionadas mejoradas */}
        <div>
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="w-1 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            Noticias relacionadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link href={`/noticias/${i}`} key={i}>
                <div className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/10">
                  <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent)]"></div>
                    <span className="text-gray-700 text-4xl">⚽</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-base line-clamp-2 group-hover:text-green-400 transition-colors">
                      Título de noticia relacionada {i}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">Hace 2 horas</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Botón volver mejorado */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Link 
          href="/noticias"
          className="inline-flex items-center gap-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 border border-gray-700 hover:border-green-500 text-white hover:text-black font-bold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a todas las noticias
        </Link>
      </div>
    </div>
  );
}
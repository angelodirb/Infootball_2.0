/*FeaturedTransfers */
'use client';

import Link from 'next/link';

// Datos de ejemplo de fichajes
const transfersData = [
  {
    id: 1,
    player: "Kylian Mbappé",
    playerImage: "⚡",
    fromTeam: "PSG",
    fromLogo: "🔴🔵",
    toTeam: "Real Madrid",
    toLogo: "⚪",
    fee: "€180M",
    date: "Hace 3 días",
    type: "Fichaje",
    featured: true
  },
  {
    id: 2,
    player: "Erling Haaland",
    playerImage: "⚽",
    fromTeam: "Borussia Dortmund",
    fromLogo: "🟡⚫",
    toTeam: "Manchester City",
    toLogo: "🔵",
    fee: "€60M",
    date: "Hace 1 semana",
    type: "Fichaje",
    featured: true
  },
  {
    id: 3,
    player: "Vinícius Jr",
    playerImage: "🌟",
    fromTeam: "Flamengo",
    fromLogo: "🔴⚫",
    toTeam: "Real Madrid",
    toLogo: "⚪",
    fee: "€45M",
    date: "Hace 5 días",
    type: "Fichaje",
    featured: true
  },
  {
    id: 4,
    player: "Jude Bellingham",
    playerImage: "👑",
    fromTeam: "Borussia Dortmund",
    fromLogo: "🟡⚫",
    toTeam: "Real Madrid",
    toLogo: "⚪",
    fee: "€103M",
    date: "Hace 2 semanas",
    type: "Fichaje",
    featured: false
  },
  {
    id: 5,
    player: "Luis Díaz",
    playerImage: "🔥",
    fromTeam: "Porto",
    fromLogo: "🔵⚪",
    toTeam: "Liverpool",
    toLogo: "🔴",
    fee: "€50M",
    date: "Hace 1 semana",
    type: "Fichaje",
    featured: false
  },
  {
    id: 6,
    player: "Alexis Sánchez",
    playerImage: "🎯",
    fromTeam: "Barcelona",
    fromLogo: "🔴🔵",
    toTeam: "Udinese",
    toLogo: "🤍🖤",
    fee: "Libre",
    date: "Hace 3 días",
    type: "Fichaje",
    featured: false
  }
];

export default function FeaturedTransfers() {
  const featuredTransfers = transfersData.filter(t => t.featured);
  const regularTransfers = transfersData.filter(t => !t.featured);

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-black">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Últimos Fichajes
            </span>
          </h2>
        </div>
        <p className="text-gray-400 ml-5">Las transferencias más importantes del mercado</p>
      </div>

      {/* Fichajes Destacados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {featuredTransfers.map((transfer) => (
          <div
            key={transfer.id}
            className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 transform hover:scale-[1.02]"
          >
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]"></div>

            {/* Header con badges */}
            <div className="relative p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Fichaje
                </span>
                <span className="text-xs text-gray-400">{transfer.date}</span>
              </div>

              {/* Jugador - Foto grande */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{transfer.playerImage}</div>
                <h3 className="text-2xl font-black text-white group-hover:text-green-400 transition-colors">
                  {transfer.player}
                </h3>
              </div>

              {/* Transfer Flow */}
              <div className="space-y-4">
                {/* Equipo Anterior */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-2">De</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{transfer.fromLogo}</span>
                    <span className="font-bold text-white">{transfer.fromTeam}</span>
                  </div>
                </div>

                {/* Flecha de transferencia */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                    ➜
                  </div>
                </div>

                {/* Equipo Nuevo */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs text-green-400 mb-2">Hacia</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{transfer.toLogo}</span>
                    <span className="font-bold text-white">{transfer.toTeam}</span>
                  </div>
                </div>
              </div>

              {/* Precio */}
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg text-center">
                <p className="text-xs text-gray-400 mb-1">Traspaso</p>
                <p className="text-xl font-black text-green-400">{transfer.fee}</p>
              </div>
            </div>

            {/* Borde brillante en hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/50 transition-colors duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Otros Fichajes */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
          Más Fichajes
        </h3>

        <div className="space-y-3">
          {regularTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className="group bg-gradient-to-r from-gray-900 to-gray-950 rounded-xl p-4 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="flex items-center justify-between">
                {/* Izquierda - Equipo anterior */}
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">{transfer.fromLogo}</span>
                  <div>
                    <p className="text-xs text-gray-400">Desde</p>
                    <p className="font-bold text-white">{transfer.fromTeam}</p>
                  </div>
                </div>

                {/* Centro - Jugador */}
                <div className="flex-1 text-center">
                  <p className="flex items-center justify-center gap-1">
                    <span className="text-2xl">{transfer.playerImage}</span>
                    <span className="font-bold text-white group-hover:text-green-400 transition-colors">
                      {transfer.player}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{transfer.date}</p>
                </div>

                {/* Derecha - Equipo nuevo */}
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="text-right">
                    <p className="text-xs text-green-400">Hacia</p>
                    <p className="font-bold text-white">{transfer.toTeam}</p>
                  </div>
                  <span className="text-3xl">{transfer.toLogo}</span>
                </div>

                {/* Fee */}
                <div className="ml-4 text-right min-w-20">
                  <p className="font-bold text-green-400">{transfer.fee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón Ver Más */}
      <div className="flex justify-center mt-8">
        <Link
          href="/fichajes"
          className="group inline-flex items-center gap-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 border border-gray-700 hover:border-green-500 text-white hover:text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span>Ver todos los fichajes</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

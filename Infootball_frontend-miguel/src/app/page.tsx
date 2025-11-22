import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import FeaturedMatches from '@/components/FeaturedMatches';
import FeaturedTransfers from '@/components/FeaturedTransfers'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InFootball - Tu Portal de Fútbol',
  description: 'Noticias, partidos en vivo y competiciones de fútbol',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Sección de Partidos Destacados */}
        <FeaturedMatches />
      </main>

      {/* Footer opcional */}
      <footer className="mt-16 py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 InFootball - Tu portal de fútbol
          </p>
        </div>
      </footer>
    </div>
  );
}

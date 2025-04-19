
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseQuery } from '@/hooks/useSupabase';
import { Button } from '@/components/ui/button';

interface Banner {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}

const AdBanner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const { authState } = useAuth();
  const { user } = authState;
  const isAdmin = user?.role === 'admin';

  // Fetch banners from Supabase
  const { data: banners, isLoading, error } = useSupabaseQuery<Banner[]>(
    'ad_banners',
    ['ad_banners'],
    {
      filter: [{ column: 'is_active', value: true }],
      orderBy: { column: 'created_at', ascending: false },
    }
  );

  // Handle banner navigation
  const nextBanner = () => {
    if (banners && banners.length > 0) {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }
  };

  const prevBanner = () => {
    if (banners && banners.length > 0) {
      setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners]);

  // If there are no active banners and user is not admin, don't render anything
  if (!isLoading && (!banners || banners.length === 0) && !isAdmin) {
    return null;
  }

  // Show placeholder for admin when no banners exist
  if (!isLoading && (!banners || banners.length === 0) && isAdmin) {
    return (
      <div className="w-full bg-gray-100 py-4 mt-2">
        <div className="container mx-auto px-4">
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Área de Banner de Anúncios</h3>
            <p className="text-gray-500 mb-4">Não há banners ativos no momento. Adicione banners no painel de administração.</p>
            <Button 
              variant="default" 
              className="bg-arariboia-brown hover:bg-arariboia-brown/90"
              onClick={() => window.location.href = '/admin/banners'}
            >
              Gerenciar Banners
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse rounded-lg bg-gray-200 h-56"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return isAdmin ? (
      <div className="w-full bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
            <p className="text-red-500">Erro ao carregar banners: {error.message}</p>
          </div>
        </div>
      </div>
    ) : null;
  }

  // If we have banners to display or we want to show a demo banner when Supabase is not connected
  const currentBanner = banners && banners[currentBannerIndex];
  
  // If no banners from database but need to show a demo banner
  if (!currentBanner) {
    // Demo banner for showcase purposes
    const demoBanner = {
      id: 0,
      title: "Promoção Especial de Lançamento",
      description: "50% de desconto em todos os produtos nas lojas participantes. Aproveite esta oferta por tempo limitado!",
      image_url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      link_url: "/promocoes",
      is_active: true,
      created_at: new Date().toISOString(),
      expires_at: null
    };
    
    return (
      <div className="w-full bg-gray-100 py-4 relative">
        <div className="container mx-auto px-4">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            {/* Banner image */}
            <div className="relative h-56 md:h-64 lg:h-72 bg-arariboia-green/10">
              <a 
                href={demoBanner.link_url} 
                className="block w-full h-full"
              >
                <img 
                  src={demoBanner.image_url} 
                  alt={demoBanner.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                  <div className="text-white p-6 md:p-8 lg:p-10 max-w-lg">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{demoBanner.title}</h2>
                    <p className="text-sm md:text-base mb-4 text-white/90">{demoBanner.description}</p>
                    <Button className="bg-white text-arariboia-green hover:bg-white/90 flex items-center gap-2">
                      Saiba mais
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Admin edit badge */}
            {isAdmin && (
              <div className="absolute top-2 right-2 bg-arariboia-brown text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <span>Apenas admin</span>
                <a 
                  href="/admin/banners" 
                  className="underline flex items-center hover:text-white/90"
                >
                  Editar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-gray-100 py-4 relative">
      <div className="container mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden shadow-md">
          {/* Banner image */}
          <div className="relative h-56 md:h-64 lg:h-72 bg-arariboia-green/10">
            <a 
              href={currentBanner.link_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img 
                src={currentBanner.image_url} 
                alt={currentBanner.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                <div className="text-white p-6 md:p-8 lg:p-10 max-w-lg">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{currentBanner.title}</h2>
                  <p className="text-sm md:text-base mb-4 text-white/90">{currentBanner.description}</p>
                  <Button className="bg-white text-arariboia-green hover:bg-white/90 flex items-center gap-2">
                    Saiba mais
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </a>
          </div>
          
          {/* Navigation arrows - only show if there's more than one banner */}
          {banners && banners.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                onClick={prevBanner}
                aria-label="Banner anterior"
              >
                <ChevronLeft className="h-5 w-5 text-arariboia-dark" />
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                onClick={nextBanner}
                aria-label="Próximo banner"
              >
                <ChevronRight className="h-5 w-5 text-arariboia-dark" />
              </button>
            </>
          )}
          
          {/* Banner indicators */}
          {banners && banners.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentBannerIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentBannerIndex(index)}
                  aria-label={`Ir para banner ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Admin edit badge */}
          {isAdmin && (
            <div className="absolute top-2 right-2 bg-arariboia-brown text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <span>Apenas admin</span>
              <a 
                href="/admin/banners" 
                className="underline flex items-center hover:text-white/90"
              >
                Editar
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;

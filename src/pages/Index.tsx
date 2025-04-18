
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import FeatureBanner from '@/components/FeatureBanner';
import FeaturedStores from '@/components/FeaturedStores';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <main className="flex-grow">
        <FeatureBanner />
        <FeaturedStores />
        <FeaturedProducts />
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-arariboia-brown/10 rounded-lg p-6 md:p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-arariboia-brown">
                  Quer impulsionar seu negócio local?
                </h2>
                <p className="text-gray-700 mb-6">
                  Junte-se a milhares de comerciantes que estão expandindo seus negócios 
                  com o AquiTemArariboia. Crie sua loja virtual, configure seus produtos 
                  e comece a vender em minutos!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    variant="default"
                    className="bg-arariboia-brown hover:bg-arariboia-brown/90"
                    onClick={() => navigate('/dashboard')}
                  >
                    Criar minha loja
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-arariboia-brown text-arariboia-brown hover:bg-arariboia-brown/10"
                    onClick={() => navigate('/dashboard')}
                  >
                    Saiba mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

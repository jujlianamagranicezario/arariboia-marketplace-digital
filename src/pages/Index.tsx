
import React from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import FeatureBanner from '@/components/FeatureBanner';
import FeaturedStores from '@/components/FeaturedStores';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

const Index = () => {
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
                  <button className="bg-arariboia-brown hover:bg-arariboia-brown/90 text-white py-3 px-6 rounded-md font-medium">
                    Criar minha loja
                  </button>
                  <button className="bg-transparent hover:bg-arariboia-brown/10 text-arariboia-brown py-3 px-6 rounded-md font-medium border border-arariboia-brown">
                    Saiba mais
                  </button>
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

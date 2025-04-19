
import { useParams } from 'react-router-dom';
import { useSupabaseQuery } from '@/hooks/useSupabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

// Define the Store type
interface Store {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  category: string;
}

// Sample stores data
const sampleStores: Record<string, Store[]> = {
  restaurantes: [
    {
      id: "1",
      name: "Sabor da Serra",
      description: "Comida caseira tradicional com sabor único. Especialidades em feijoada, marmita fitness e prato executivo.",
      image_url: null,
      category: "restaurantes"
    }
  ],
  farmacia: [
    {
      id: "2",
      name: "FarmaVida",
      description: "Farmácia completa com medicamentos, produtos de higiene e beleza.",
      image_url: null,
      category: "farmacia"
    }
  ],
  mercado: [
    {
      id: "3",
      name: "Mercado Bom Preço",
      description: "Supermercado completo com os melhores preços da região.",
      image_url: null,
      category: "mercado"
    }
  ],
  pet: [
    {
      id: "4",
      name: "Pet Shop Amigo Fiel",
      description: "Tudo para seu pet com muito amor e carinho.",
      image_url: null,
      category: "pet"
    }
  ],
  padaria: [
    {
      id: "5",
      name: "Padaria Sabor do Pão",
      description: "Pães fresquinhos e confeitaria artesanal.",
      image_url: null,
      category: "padaria"
    }
  ],
  bebidas: [
    {
      id: "6",
      name: "Adega do Vinho",
      description: "As melhores bebidas nacionais e importadas.",
      image_url: null,
      category: "bebidas"
    }
  ],
  conveniencia: [
    {
      id: "7",
      name: "24h Conveniência",
      description: "Sua loja de conveniência 24 horas.",
      image_url: null,
      category: "conveniencia"
    }
  ],
  express: [
    {
      id: "8",
      name: "Express Delivery",
      description: "Entregas rápidas para toda cidade.",
      image_url: null,
      category: "express"
    }
  ],
  roupas: [
    {
      id: "9",
      name: "Moda Elegante",
      description: "As últimas tendências da moda.",
      image_url: null,
      category: "roupas"
    }
  ],
  eletronicos: [
    {
      id: "10",
      name: "TechStore",
      description: "Os melhores produtos de tecnologia.",
      image_url: null,
      category: "eletronicos"
    }
  ],
  servicos: [
    {
      id: "11",
      name: "MultiServiços",
      description: "Diversos serviços para sua comodidade.",
      image_url: null,
      category: "servicos"
    }
  ]
};

const StoreList = () => {
  const { category } = useParams();
  const categoryTitle = category?.charAt(0).toUpperCase() + category?.slice(1);

  // Use sample data for now
  const stores = category ? sampleStores[category] : [];
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-arariboia-brown mb-6">{categoryTitle}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores && stores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <CardHeader className="relative">
              {store.image_url ? (
                <img 
                  src={store.image_url} 
                  alt={store.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-lg" />
              )}
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{store.name}</CardTitle>
              <p className="text-gray-600 mb-4">{store.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span>1.2 km</span>
                </div>
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-arariboia-brown hover:bg-arariboia-brown/90"
                  onClick={() => window.location.href = `/store/${store.id}`}
                >
                  <span>Ver loja</span>
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!stores || stores.length === 0) && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Nenhuma loja encontrada nesta categoria
          </h2>
          <p className="text-gray-600">
            Em breve novas lojas estarão disponíveis aqui.
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreList;


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

const StoreList = () => {
  const { category } = useParams();
  const categoryTitle = category?.charAt(0).toUpperCase() + category?.slice(1);

  // Fetch stores filtered by category
  const { data: stores, isLoading } = useSupabaseQuery<Store[]>(
    'stores',
    ['stores', category],
    {
      filter: [{ column: 'category', value: category }],
      orderBy: { column: 'name', ascending: true },
    }
  );

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


import { StarIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const stores = [
  {
    id: 1,
    name: "Sabor da Serra Restaurante",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "restaurantes",
    rating: 4.8,
    deliveryTime: "30-45",
    deliveryFee: "R$ 5,99",
    featured: true,
  },
  {
    id: 2,
    name: "Mercado Bom Preço Tradicional",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "mercado",
    rating: 4.5,
    deliveryTime: "45-60",
    deliveryFee: "R$ 7,99",
    featured: false,
  },
  {
    id: 3,
    name: "Padaria Sabor do Pão",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "padaria",
    rating: 4.7,
    deliveryTime: "25-40",
    deliveryFee: "R$ 4,99",
    featured: true,
  },
  {
    id: 4,
    name: "FarmaVida Completa",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "farmacia",
    rating: 4.6,
    deliveryTime: "15-30",
    deliveryFee: "R$ 3,99",
    featured: false,
  },
];

const FeaturedStores = () => {
  const navigate = useNavigate();

  const handleStoreClick = (categoryName: string) => {
    navigate(`/${categoryName}`);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-arariboia-dark">Lojas em Destaque</h2>
          <a href="#" className="text-arariboia-green text-sm font-medium hover:underline">
            Ver todas
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <Card 
              key={store.id} 
              className="h-full product-card cursor-pointer" 
              onClick={() => handleStoreClick(store.category)}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {store.featured && (
                  <Badge className="absolute top-2 left-2 bg-arariboia-green">
                    Destaque
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-arariboia-dark truncate">{store.name}</h3>
                <p className="text-sm text-gray-500">{store.category}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <StarIcon size={16} className="fill-yellow-400 stroke-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{store.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{store.deliveryTime} min</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 border-t border-gray-100 mt-2">
                <div className="text-sm text-gray-700">
                  <span>{store.deliveryFee}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-arariboia-green">Aberto</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStores;

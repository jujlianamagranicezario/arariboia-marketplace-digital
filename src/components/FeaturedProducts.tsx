
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Hambúrguer Artesanal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Hamburgueria do Zé",
    price: 29.9,
    discountPrice: 24.9,
    hasDiscount: true,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Pizzaria Napolitana",
    price: 45.0,
    discountPrice: null,
    hasDiscount: false,
  },
  {
    id: 3,
    name: "Açaí 500ml",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Açaí do Brasil",
    price: 18.0,
    discountPrice: 15.0,
    hasDiscount: true,
  },
  {
    id: 4,
    name: "Bolo de Chocolate",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Confeitaria Doce Sabor",
    price: 32.0,
    discountPrice: null,
    hasDiscount: false,
  },
  {
    id: 5,
    name: "Sushi Combo",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Sushi Express",
    price: 65.0,
    discountPrice: 54.9,
    hasDiscount: true,
  },
  {
    id: 6,
    name: "Salada Premium",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Vida Saudável",
    price: 27.5,
    discountPrice: null,
    hasDiscount: false,
  },
];

const FeaturedProducts = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-arariboia-dark">Produtos em Destaque</h2>
          <a href="#" className="text-arariboia-green text-sm font-medium hover:underline">
            Ver mais
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="h-full product-card">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {product.hasDiscount && (
                  <Badge className="absolute top-2 right-2 bg-arariboia-green">
                    Oferta
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-3">
                <h3 className="font-medium text-arariboia-dark text-sm truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{product.store}</p>
                
                <div className="mt-2 flex items-center">
                  {product.hasDiscount ? (
                    <>
                      <span className="text-arariboia-green font-bold">
                        R$ {product.discountPrice?.toFixed(2)}
                      </span>
                      <span className="ml-2 text-gray-400 text-xs line-through">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-arariboia-dark font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-3 pt-0">
                <Button 
                  size="sm" 
                  className="w-full bg-arariboia-green hover:bg-arariboia-green/90 text-white"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Adicionar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

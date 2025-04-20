
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample products from our sample stores
const products = [
  {
    id: 1,
    name: "Hambúrguer Artesanal Premium",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Sabor da Serra Restaurante",
    price: 29.9,
    discountPrice: 24.9,
    hasDiscount: true,
    category: "restaurantes"
  },
  {
    id: 2,
    name: "Pizza Margherita Especial",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Sabor da Serra Restaurante",
    price: 45.0,
    discountPrice: null,
    hasDiscount: false,
    category: "restaurantes"
  },
  {
    id: 3,
    name: "Açaí 500ml Completo",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Cantinho Mineiro",
    price: 18.0,
    discountPrice: 15.0,
    hasDiscount: true,
    category: "restaurantes"
  },
  {
    id: 4,
    name: "Bolo de Chocolate Premium",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Padaria Sabor do Pão",
    price: 32.0,
    discountPrice: null,
    hasDiscount: false,
    category: "padaria"
  },
  {
    id: 5,
    name: "Sushi Combo Deluxe",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Sabor da Serra Restaurante",
    price: 65.0,
    discountPrice: 54.9,
    hasDiscount: true,
    category: "restaurantes"
  },
  {
    id: 6,
    name: "Salada Premium Fitness",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Cantinho Mineiro",
    price: 27.5,
    discountPrice: null,
    hasDiscount: false,
    category: "restaurantes"
  },
  {
    id: 7,
    name: "Vinho Tinto Premium",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Adega do Vinho Premium",
    price: 89.9,
    discountPrice: 75.5,
    hasDiscount: true,
    category: "bebidas"
  },
  {
    id: 8,
    name: "Pão Artesanal Italiano",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Padaria Sabor do Pão",
    price: 12.9,
    discountPrice: null,
    hasDiscount: false,
    category: "padaria"
  },
  {
    id: 9,
    name: "Smartphone Ultimate Pro",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "TechStore Premium",
    price: 2499.0,
    discountPrice: 2199.0,
    hasDiscount: true,
    category: "eletronicos"
  },
  {
    id: 10,
    name: "Ração Premium para Cães",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Pet Shop Amigo Fiel",
    price: 119.9,
    discountPrice: 99.9,
    hasDiscount: true,
    category: "pet"
  },
  {
    id: 11,
    name: "Remédio Anti-alérgico",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "FarmaVida Completa",
    price: 35.9,
    discountPrice: null,
    hasDiscount: false,
    category: "farmacia"
  },
  {
    id: 12,
    name: "Cesta de Frutas Orgânicas",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    store: "Mercado Bom Preço Tradicional",
    price: 59.9,
    discountPrice: 49.9,
    hasDiscount: true,
    category: "mercado"
  }
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
